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
import type { LedgerItem } from "@repo/shared";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";

interface DailyDrawerProps {
  items: LedgerItem[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(value));
};

export const DailyDrawer = ({ items }: DailyDrawerProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
              </IconButton>
            </RowWrapper>
          </Item>
        ))}
      </ItemsWrapper>

      <AddItemButton>
        <Circle>
          <AddIcon fontSize="small" sx={{ color: colors.gray[400] }} />
        </Circle>

        <Typography variant="body1" color={colors.gray[450]}>
          내역 추가
        </Typography>
      </AddItemButton>

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
          <FunctionWrapper>
            <Typography variant="caption" color={colors.system.error}>
              삭제
            </Typography>
          </FunctionWrapper>

          <FunctionWrapper>
            <Typography variant="caption">수정</Typography>
          </FunctionWrapper>
        </MoreFunctions>
      </Popover>
    </>
  );
};
