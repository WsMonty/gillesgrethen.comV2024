export async function getNews() {
  const query = `
    query {
    newsCollection {
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
