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
  releaseDate: string;
}

interface PromoCode {
  code: string;
  discountPercentage: number;
  validUntil: Date;
  validFrom: Date;
}

interface ShopConfig {
  disclaimer?: string;
  disclaimerDateFrom?: Date | undefined;
  disclaimerDateTo?: Date | undefined;
  shippingCostCdDe: number;
  shippingCostCdEu: number;
  shippingCostCdUk: number;
  shippingCostCdWorld: number;
  shippingCostVinylDe: number;
  shippingCostVinylEu: number;
  shippingCostVinylUk: number;
  shippingCostVinylWorld: number;
  maxCDsPerPackage: number;
  maxCDsPerPackageWithVinyl: number;
  maxVinylsPerPackage: number;
  promoCodes: PromoCode[];
}

interface ShopConfigAPI {
  disclaimer?: string;
  disclaimerDateFrom?: string;
  disclaimerDateTo?: string;
  shippingCostCdDe: number;
  shippingCostCdEu: number;
  shippingCostCdUk: number;
  shippingCostCdWorld: number;
  shippingCostVinylDe: number;
  shippingCostVinylEu: number;
  shippingCostVinylUk: number;
  shippingCostVinylWorld: number;
  maxCDsPerPackage: number;
  maxCDsPerPackageWithVinyl: number;
  maxVinylsPerPackage: number;
  promoCodesCollection: {
    items: PromoCode[];
  };
}

interface Gigs {
  kind: string;
  etag: string;
  summary: string;
  description: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: [];
  nextSyncToken: string;
  items: GigInfo[];
}

interface GigInfo {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string; // could be a html string
  location: string; // Format: Name, Street and number, Zipcode and City, Country
  creator: {
    email: string;
  };
  organizer: {
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  eventType: string;
}
