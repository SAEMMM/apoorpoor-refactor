"use client";

import { ImageArea, ImageWrapper, ItemName } from "../ItemGroup/styles";
import { ItemInfoRow, ItemInfoWrapper, Wrapper } from "./styles";

import Button from "@/shared/ui/Button";
import { Drawer } from "@/shared/ui/Drawer";
import Image from "next/image";
import { PoorItemView } from "@repo/shared";
import { Typography } from "@mui/material";
import { colors } from "@/styles/theme/tokens/color";
import { purchasePoorItemAction } from "@/features/poor/actions/purchasePoorItem";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";
import { useState } from "react";

interface PurchaseDrawerProps {
  open: boolean;
  onClose: () => void;
  openItem: PoorItemView;
  availablePoints: number;
}

export const PurchaseDrawer = (props: PurchaseDrawerProps) => {
  const { open, onClose, openItem, availablePoints } = props;
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { name, imgUrl, price } = openItem;

  const handlePurchase = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const result = await purchasePoorItemAction(openItem.id);

      if (!result.success) {
        showSnackbar({ message: result.error, variant: "error" });
        return;
      }

      onClose();
      router.refresh();
      showSnackbar({
        message: `구매 완료! 잔여포인트는 ${result.data.user.points}P입니다.`,
        variant: "success",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <Wrapper>
        <ImageWrapper width={"132px !important"}>
          <ImageArea>
            <Image
              src={imgUrl as string}
              alt={name}
              width={88}
              height={88}
              style={{
                objectFit: "contain",
                width: "auto",
                maxWidth: "100%",
                maxHeight: "88px",
              }}
            />
          </ImageArea>
          <ItemName>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{
                textAlign: "center",
                wordBreak: "keep-all",
                overflowWrap: "normal",
                color: colors.black,
              }}
            >
              {name}
            </Typography>
          </ItemName>
        </ImageWrapper>

        <ItemInfoWrapper>
          <ItemInfoRow>
            <Typography variant="body2" color={colors.gray[500]}>
              아이템명
            </Typography>
            <Typography variant="body2">{name}</Typography>
          </ItemInfoRow>

          <ItemInfoRow>
            <Typography variant="body2" color={colors.gray[500]}>
              잔여 포인트
            </Typography>
            <Typography variant="body2" color={colors.primary.main}>
              {availablePoints}P
            </Typography>
          </ItemInfoRow>

          <ItemInfoRow>
            <Typography variant="body2" color={colors.gray[500]}>
              아이템 가격
            </Typography>
            <Typography
              variant="body2"
              color={colors.primary.main}
              fontWeight={700}
            >
              {price}P
            </Typography>
          </ItemInfoRow>
        </ItemInfoWrapper>

        <Button onClick={handlePurchase} disabled={isSubmitting}>
          포인트 사용
        </Button>
      </Wrapper>
    </Drawer>
  );
};
