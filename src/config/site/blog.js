export default {
  isEnabled: true,
  postsPerPage: 5,
  post: {
    isEnabled: true,
    permalink: '/%slug%', // Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
    robots: {
      index: true,
    }
  },
  list: {
    isEnabled: true,
    pathname: 'posts',
    robots: {
      index: true,
    }
  },
  category: {
    isEnabled: true,
    pathname: 'category',
    robots: {
      index: true,
    }
  },
  tag: {
    isEnabled: true,
    pathname: 'tag',
    robots: {
      index: false,
    }
  },
};