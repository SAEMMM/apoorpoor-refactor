export type PoorItemCategory =
  | "face"
  | "hair"
  | "clothes"
  | "pants"
  | "accessory"
  | "shoes"
  | "setup";

export type PoorUserSummary = {
  id: string;
  poorName: string;
  level: number;
  points: number;
};

export type PoorItemView = {
  id: string;
  code: string;
  name: string;
  category: PoorItemCategory;
  price: number;
  requiredLevel: number;
  imgUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  isOwned: boolean;
  isEquipped: boolean;
  canPurchase: boolean;
};

export type PoorOverviewResponse = {
  user: PoorUserSummary;
  items: PoorItemView[];
  ownedItems: PoorItemView[];
  equippedItems: PoorItemView[];
  purchasableItems: PoorItemView[];
};

export type PurchasePoorItemResponse = {
  user: PoorUserSummary;
  item: PoorItemView;
  purchasedAt: string;
};

export type SetPoorItemEquippedRequest = {
  equipped: boolean;
};

export type SetPoorItemEquippedResponse = {
  item: PoorItemView;
  equippedItems: PoorItemView[];
};
