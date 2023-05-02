import { getHomePermalink, getPermalink } from "~/utils/permalinks";

const headerData = {
  links: [
    {
      text: "Kjvg",
      links: [
        {
          text: "Dff",
          href: "#",
        }
      ]
    },
    {
      text: "Foo",
      href: getPermalink("/foo"),
    },
    {
      text: "About",
      href: getPermalink("/about"),
    },
    {
      text: "Baz",
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
