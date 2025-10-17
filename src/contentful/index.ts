export async function getNews() {
  const query = `
    query {
    newsCollection(limit: 3, order: date_DESC) {
      items {
        title
        date
        media {
          url
          title
          description
        }
        newsText
        link
        mediaContent
        linkText
      }
    }
  }
  `;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE_ID
  }`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.newsCollection.items;
}

export async function getShopItems() {
  const query = `
   query {
    shopItemCollection {
      items {
        title
        shortDescription
        price
        image {
          url
        }
        isActive
        id
        type
        releaseDate
      }
    }
  }
  `;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE_ID
  }`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.shopItemCollection.items;
}

export async function getAbout() {
  const query = `
   query {
    aboutCollection {
      items {
       name
       email
       phone
       bio {
       json
        }
        picturesCollection {
          items {
            url
            description
            title
          }
        }
      }
    }
  }
  `;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE_ID
  }`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.aboutCollection.items;
}

export async function getProjects() {
  const query = `
  query {
    projectCollection {
      items {
        name
        description {
          json
        }
        image {
          url
        }
        link
        id
      }
    }
  }
  `;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE_ID
  }`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.projectCollection.items;
}

export async function getBlogPosts() {
  const query = `
  query {
    blogPostCollection {
      items {
        title
        date
        article {
          json
        }
        author
      }
    }
  }
  `;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${
    import.meta.env.VITE_CONTENTFUL_SPACE_ID
  }`;
  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.blogPostCollection.items;
}
