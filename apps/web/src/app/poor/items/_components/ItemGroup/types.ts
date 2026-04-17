import { PoorItemCategory, PoorItemView } from "@repo/shared";

import { colors } from "@/styles/theme/tokens/color";

export type ItemsClientProps = {
  items: PoorItemView[];
  poorLevel: number;
  availablePoints: number;
};

export const CATEGORY_TABS: Array<{ value: PoorItemCategory; label: string }> =
  [
    { value: "clothes", label: "상의" },
    { value: "pants", label: "하의" },
    { value: "shoes", label: "신발" },
    { value: "accessory", label: "액세서리" },
    { value: "setup", label: "코스튬" },
  ];

export const getStatusText = (item: PoorItemView) => {
  if (item.isEquipped) return "해제하기";
  if (item.isOwned) return "착용하기";
  return item.price + "P";
};

export const getStatusTextColor = (item: PoorItemView, isLocked: boolean) => {
  if (isLocked) return colors.white;
  if (item.isEquipped) return colors.gray[350];
  if (item.isOwned) return colors.white;
  if (item.canPurchase) return colors.white;
  return colors.gray[400];
};

export const getStatusBackgroundColor = (
  item: PoorItemView,
  isLocked: boolean,
) => {
  if (isLocked) return colors.secondary.l[500];
  if (item.isEquipped) return colors.gray[150];
  if (item.isOwned) return colors.gray[500];
  if (item.canPurchase) return colors.secondary.main;
  return "transparent";
};

export const getStatusCursor = (item: PoorItemView, isLocked: boolean) => {
  if (isLocked) return "default";
  if (item.isEquipped || item.isOwned || item.canPurchase) return "pointer";
  return "default";
};

export const getStatusColor = (item: PoorItemView) => {
  if (item.isEquipped) return colors.primary.main;
  if (item.isOwned) return "#2E7D32";
  if (item.canPurchase) return "#C58A00";
  return colors.gray[400];
};
