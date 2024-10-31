interface News {
  title: string;
  date: string; // format: 2023-11-01T00:00:00.000Z
  media: Media;
  mediaContent: string;
  newsText: string;
  link: string;
  linkText: string;
}

interface Media {
  title?: string;
  description?: string;
  url: string;
}

interface ShopItem {
  title: string;
  shortDescription?: string;
  image: Media;
  price: number;
  type: "CD" | "vinyl";
  isActive: boolean;
  id: number;
}
