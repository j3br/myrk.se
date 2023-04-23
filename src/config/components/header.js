import { getHomePermalink, getPermalink } from "~/utils/permalinks";

const headerData = {
  links: [
    {
      text: "kjvg",
      links: [
        {
          text: "dff",
          href: "#",
        }
      ]
    },
    {
      text: "foo",
      href: getPermalink("/foo"),
    },
    {
      text: "bar",
      href: getPermalink("/bar"),
    },
    {
      text: "baz",
      href: getPermalink("/baz"),
    },
    {
      text: "GitHub",
      href: "https://github.com/j3br",
      icon: "tabler:brand-github",
      target: "_blank",
    },
  ],
};

export default headerData;
