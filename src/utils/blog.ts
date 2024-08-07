import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { Post } from "~/types";
import BLOG from "~/config/site/blog";
import {
  cleanSlug,
  trimSlash,
  BLOG_BASE,
  POST_PERMALINK_PATTERN,
  CATEGORY_BASE,
  TAG_BASE,
} from "./permalinks";

const generatePermalink = async ({ id, slug, publishDate, category }) => {
  const year = String(publishDate.getFullYear()).padStart(4, "0");
  const month = String(publishDate.getMonth() + 1).padStart(2, "0");
  const day = String(publishDate.getDate()).padStart(2, "0");
  const hour = String(publishDate.getHours()).padStart(2, "0");
  const minute = String(publishDate.getMinutes()).padStart(2, "0");
  const second = String(publishDate.getSeconds()).padStart(2, "0");

  const permalink = POST_PERMALINK_PATTERN.replace("%slug%", slug)
    .replace("%id%", id)
    .replace("%category%", category || "")
    .replace("%year%", year)
    .replace("%month%", month)
    .replace("%day%", day)
    .replace("%hour%", hour)
    .replace("%minute%", minute)
    .replace("%second%", second);

  return permalink
    .split("/")
    .flatMap((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
};

const getNormalizedPost = async (
  post: CollectionEntry<"post">,
): Promise<Post> => {
  const { id, slug: rawSlug = "", data } = post;
  const { Content, remarkPluginFrontmatter } = await post.render();

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
  } = data;

  const slug = cleanSlug(rawSlug.split("/").pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;
  const category = rawCategory ? cleanSlug(rawCategory) : undefined;
  const tags = rawTags.flatMap((tag: string) => cleanSlug(tag));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    Content: Content,

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection("post");
  const normalizedPosts = posts.flatMap(
    async (post) => await getNormalizedPost(post),
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

export const isBlogEnabled = BLOG?.post?.isEnabled;
export const isBlogListRouteEnabled = BLOG?.list?.isEnabled;
export const isBlogPostRouteEnabled = BLOG?.post?.isEnabled;
export const isBlogCategoryRouteEnabled = BLOG?.category?.isEnabled;
export const isBlogTagRouteEnabled = BLOG?.tag?.isEnabled;

export const blogListRobots = BLOG?.list?.robots || { index: true };
export const blogPostRobots = BLOG?.post?.robots || { index: true };
export const blogCategoryRobots = BLOG?.category?.robots || { index: true };
export const blogTagRobots = BLOG?.tag?.robots || { index: false };
export const blogPostsPerPage = BLOG?.postsPerPage || 6;

export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

export const findPostsBySlugs = async (
  slugs: Array<string>,
): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

export const findPostsByIds = async (
  ids: Array<string>,
): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

export const findLatestPosts = async ({
  count,
}: {
  count?: number;
}): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

export const getStaticPathsBlogList = async ({ paginate }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

export const getStaticPathsBlogCategory = async ({ paginate }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = new Set();
  posts.flatMap((post) => {
    typeof post.category === "string" &&
      categories.add(post.category.toLowerCase());
  });

  return Array.from(categories).flatMap((category: string) =>
    paginate(
      posts.filter(
        (post) =>
          typeof post.category === "string" &&
          category === post.category.toLowerCase(),
      ),
      {
        params: { category: category, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category },
      },
    ),
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = new Set();
  posts.flatMap((post) => {
    Array.isArray(post.tags) &&
      post.tags.flatMap((tag) => tags.add(tag.toLowerCase()));
  });

  return Array.from(tags).flatMap((tag: string) =>
    paginate(
      posts.filter(
        (post) =>
          Array.isArray(post.tags) &&
          post.tags.find((elem) => elem.toLowerCase() === tag),
      ),
      {
        params: { tag: tag, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag },
      },
    ),
  );
};
