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

export async function getShopConfig() {
  const query = `
   query {
    shopConfigCollection {
      items {
        disclaimer
        disclaimerDateFrom
        disclaimerDateTo
        shippingCostCdDe
        shippingCostCdEu
        shippingCostCdUk
        shippingCostCdWorld
        shippingCostVinylDe
        shippingCostVinylEu
        shippingCostVinylUk
        shippingCostVinylWorld
        maxCDsPerPackage
        maxCDsPerPackageWithVinyl
        maxVinylsPerPackage
        promoCodesCollection {
          items {
            code
            discountPercentage
            validFrom
            validUntil
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

  return (
    response.data.shopConfigCollection.items?.map((item: ShopConfigAPI) => ({
      ...item,
      promoCodes: item.promoCodesCollection.items?.map((item: PromoCode) => ({
        ...item,
        validFrom: new Date(item.validFrom),
        validUntil: new Date(item.validUntil),
      })),
      disclaimerDateFrom: item.disclaimerDateFrom
        ? new Date(item.disclaimerDateFrom)
        : undefined,
      disclaimerDateTo: item.disclaimerDateTo
        ? new Date(item.disclaimerDateTo)
        : undefined,
    })) as ShopConfig[]
  )?.[0];
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

export const getLinkLists = async (): Promise<LinkList> => {
  const query = `
  query {
    linkTreeCollection {
      items {
        name
        description
        path
        image {
          url
        }
        linksCollection {
          items {
            name
            description
            url
            icon
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

  return response.data.linkTreeCollection.items.map((item: LinkTreeAPI) => ({
    ...item,
    imageUrl: item?.image?.url,
    links: item?.linksCollection.items.map((link: LinkTreeLink) => ({
      ...link,
    })),
  })) as LinkList;
};

export const getAutoLinkTrees = async (): Promise<AutoLinkTreeList> => {
  const query = `
  query {
    autoLinkTreeCollection {
      items {
        title
        artist
        slug
        sourceUrl
        isActive
        coverImage {
          url
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

  return response.data.autoLinkTreeCollection.items
    .filter((item: AutoLinkTreeAPI) => item.isActive !== false)
    .map((item: AutoLinkTreeAPI) => ({
      ...item,
      coverImageUrl: item.coverImage?.url,
    })) as AutoLinkTreeList;
};

export const getAutoLinkTreeBySlug = async (
  slug: string
): Promise<AutoLinkTree | undefined> => {
  const query = `
  query GetAutoLinkTreeBySlug($slug: String!) {
    autoLinkTreeCollection(where: { slug: $slug }, limit: 1) {
      items {
        slug
        sourceUrl
        isActive
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
      variables: { slug },
    }),
  };

  const response = await fetch(fetchUrl, fetchOptions)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return response.data.autoLinkTreeCollection.items[0];
};
