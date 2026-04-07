"use client";

import {
  AddItemButton,
  Circle,
  ColWrapper,
  FunctionWrapper,
  Item,
  ItemsWrapper,
  MoreFunctions,
  RowWrapper,
} from "./styles";
import { IconButton, Popover, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { CATEGORY_LABEL_MAP } from "@/features/ledger/constants/category";
import Link from "next/link";
import type { LedgerItem } from "@repo/shared";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";
import { deleteLedgerItemAction } from "@/features/ledger/actions/ledgerItem";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";

interface DailyDrawerProps {
  month: string;
  date: string;
  items: LedgerItem[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(value));
};

export const DailyDrawer = ({ month, date, items }: DailyDrawerProps) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [menuItemId, setMenuItemId] = React.useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, itemId: string) => {
    setAnchorEl(event.currentTarget);
    setMenuItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuItemId(null);
  };

  return (
    <>
      <ItemsWrapper>
        {items.map((item) => (
          <Item key={item.id}>
            <ColWrapper>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="caption" color={colors.gray[400]}>
                {`가계부 이름 > ${CATEGORY_LABEL_MAP[item.category]}`}
              </Typography>
            </ColWrapper>

            <RowWrapper>
              <Typography variant="body1" fontWeight={700}>
                {item.type === "expense"
                  ? `-${formatCurrency(item.amount)}원`
                  : `+${formatCurrency(item.amount)}원`}
              </Typography>
              <IconButton size="small" onClick={(e) => handleMenuOpen(e, item.id)}>
                <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
              </IconButton>
            </RowWrapper>
          </Item>
        ))}
      </ItemsWrapper>

      <Link href={`/ledger/${month}/create?date=${date}`} style={{ textDecoration: "none" }}>
        <AddItemButton>
          <Circle>
            <AddIcon fontSize="small" sx={{ color: colors.gray[400] }} />
          </Circle>

          <Typography variant="body1" color={colors.gray[450]}>
            내역 추가
          </Typography>
        </AddItemButton>
      </Link>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            elevation: 0,
          },
        }}
      >
        <MoreFunctions>
          <FunctionWrapper
            onClick={async () => {
              if (!menuItemId) return;
              handleMenuClose();
              const success = await deleteLedgerItemAction(menuItemId);
              if (success) {
                showSnackbar({ message: "삭제되었습니다.", variant: "success" });
                router.refresh();
              } else {
                showSnackbar({ message: "삭제에 실패했습니다.", variant: "error" });
              }
            }}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="caption" color={colors.system.error}>
              삭제
            </Typography>
          </FunctionWrapper>

          <Link
            href={`/ledger/${month}/${menuItemId}/edit`}
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={handleMenuClose}
          >
            <FunctionWrapper>
              <Typography variant="caption">수정</Typography>
            </FunctionWrapper>
          </Link>
        </MoreFunctions>
      </Popover>
    </>
  );
};
