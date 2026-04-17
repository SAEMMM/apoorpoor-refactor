"use client";

import { Box, Typography } from "@mui/material";
import {
  CATEGORY_TABS,
  ItemsClientProps,
  getStatusBackgroundColor,
  getStatusCursor,
  getStatusText,
  getStatusTextColor,
} from "./types";
import {
  ImageArea,
  ImageWrapper,
  ItemName,
  ItemWrapper,
  LockedImageWrapper,
  RequiredLevelChip,
  StatusChip,
  Tab,
  TabsWrapper,
  Wrapper,
} from "./styles";

import Image from "next/image";
import type { PoorItemCategory } from "@repo/shared";
import { PurchaseDrawer } from "../PurchaseDrawer";
import { colors } from "@/styles/theme/tokens/color";
import { setPoorItemEquippedAction } from "@/features/poor/actions/setPoorItemEquipped";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";

export const ItemsGroup = (props: ItemsClientProps) => {
  const { items, poorLevel, availablePoints } = props;
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [selectedCategory, setSelectedCategory] =
    useState<PoorItemCategory>("clothes");

  const [openItemId, setOpenItemId] = useState("");
  const [pendingItemId, setPendingItemId] = useState("");

  const filteredItems = items
    .filter((item) => item.category === selectedCategory)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const openItem = items.find((item) => item.id === openItemId);

  const handleStatusClick = async (
    event: React.MouseEvent<HTMLDivElement>,
    item: ItemsClientProps["items"][number],
    isLocked: boolean,
  ) => {
    event.stopPropagation();

    if (isLocked || pendingItemId === item.id) return;

    if (!item.isOwned && !item.isEquipped) {
      setOpenItemId(item.id);
      return;
    }

    try {
      setPendingItemId(item.id);

      const result = await setPoorItemEquippedAction(item.id, !item.isEquipped);

      if (!result.success) {
        showSnackbar({ message: result.error, variant: "error" });
        return;
      }

      router.refresh();
      showSnackbar({
        message: item.isEquipped
          ? "착용이 해제되었습니다."
          : "아이템을 착용했습니다.",
        variant: "success",
      });
    } finally {
      setPendingItemId("");
    }
  };

  return (
    <Wrapper>
      <TabsWrapper>
        {CATEGORY_TABS.map((tab) => {
          const isSelected = tab.value === selectedCategory;

          return (
            <Tab
              key={tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              isSelected={isSelected}
            >
              <Typography
                variant="body2"
                fontWeight={isSelected ? 700 : 400}
                color={isSelected ? colors.primary.main : "#949494"}
              >
                {tab.label}
              </Typography>
            </Tab>
          );
        })}
      </TabsWrapper>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
      >
        {filteredItems.map((item) => {
          const isLocked = item.requiredLevel > poorLevel;

          return (
            <ItemWrapper
              key={item.id}
              onClick={() => {
                if (isLocked) return;
                setOpenItemId(item.id);
              }}
            >
              <ImageWrapper>
                {isLocked && (
                  <LockedImageWrapper>
                    <RequiredLevelChip>
                      <Typography
                        variant="body2"
                        color={colors.primary.l[700]}
                        fontWeight={700}
                        textAlign={"center"}
                      >
                        Lv. {item.requiredLevel}
                        <br />
                        개방
                      </Typography>
                    </RequiredLevelChip>
                  </LockedImageWrapper>
                )}
                <ImageArea
                  sx={{
                    filter: isLocked ? "blur(4px)" : "none",
                    opacity: isLocked ? 0.45 : 1,
                    transition: "filter 0.2s ease, opacity 0.2s ease",
                  }}
                >
                  {item.imgUrl ? (
                    <Image
                      src={item.imgUrl}
                      alt={item.name}
                      width={88}
                      height={88}
                      style={{
                        objectFit: "contain",
                        width: "auto",
                        maxWidth: "100%",
                        maxHeight: "88px",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color={colors.gray[400]}>
                      이미지 없음
                    </Typography>
                  )}
                </ImageArea>

                <ItemName>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{
                      textAlign: "center",
                      wordBreak: "keep-all",
                      overflowWrap: "normal",
                      color: isLocked ? colors.white : colors.black,
                      opacity: isLocked ? 0.96 : 1,
                      textShadow: isLocked
                        ? "0px 4px 14px rgba(20, 48, 92, 0.45)"
                        : "none",
                      filter: isLocked ? "blur(0.4px)" : "none",
                    }}
                  >
                    {item.name}
                  </Typography>
                </ItemName>
              </ImageWrapper>

              <StatusChip
                onClick={(event) => handleStatusClick(event, item, isLocked)}
                sx={{
                  backgroundColor: getStatusBackgroundColor(item, isLocked),
                  cursor: getStatusCursor(item, isLocked),
                  opacity: pendingItemId === item.id ? 0.6 : 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: getStatusTextColor(item, isLocked),
                    fontWeight: 700,
                  }}
                >
                  {getStatusText(item)}
                </Typography>
              </StatusChip>
            </ItemWrapper>
          );
        })}
      </Box>

      {filteredItems.length === 0 ? (
        <Typography
          variant="body2"
          color={colors.gray[400]}
          sx={{ textAlign: "center", py: "24px" }}
        >
          아직 등록된 아이템이 없어요.
        </Typography>
      ) : null}

      {openItem && (
        <PurchaseDrawer
          open={true}
          openItem={openItem}
          onClose={() => setOpenItemId("")}
          availablePoints={availablePoints}
        />
      )}
    </Wrapper>
  );
};
