"use client";

import {
  AddItemButton,
  Circle,
  ColWrapper,
  Item,
  ItemsWrapper,
  RowWrapper,
} from "./styles";
import { IconButton, Popover, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";

export const DailyDrawer = () => {
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
        <Item>
          <ColWrapper>
            <Typography variant="body1">프랭크 버거</Typography>
            <Typography variant="caption" color={colors.gray[400]}>
              {`가계부 이름 > 식비`}
            </Typography>
          </ColWrapper>

          <RowWrapper>
            <Typography variant="body1" fontWeight={700}>
              -25,000원
            </Typography>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
            </IconButton>
          </RowWrapper>
        </Item>

        <Item>
          <ColWrapper>
            <Typography variant="body1">프랭크 버거</Typography>
            <Typography variant="caption" color={colors.gray[400]}>
              {`가계부 이름 > 식비`}
            </Typography>
          </ColWrapper>

          <RowWrapper>
            <Typography variant="body1" fontWeight={700}>
              -25,000원
            </Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
            </IconButton>
          </RowWrapper>
        </Item>

        <Item>
          <ColWrapper>
            <Typography variant="body1">프랭크 버거</Typography>
            <Typography variant="caption" color={colors.gray[400]}>
              {`가계부 이름 > 식비`}
            </Typography>
          </ColWrapper>

          <RowWrapper>
            <Typography variant="body1" fontWeight={700}>
              -25,000원
            </Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
            </IconButton>
          </RowWrapper>
        </Item>

        <Item>
          <ColWrapper>
            <Typography variant="body1">프랭크 버거</Typography>
            <Typography variant="caption" color={colors.gray[400]}>
              {`가계부 이름 > 식비`}
            </Typography>
          </ColWrapper>

          <RowWrapper>
            <Typography variant="body1" fontWeight={700}>
              -25,000원
            </Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
            </IconButton>
          </RowWrapper>
        </Item>

        <Item>
          <ColWrapper>
            <Typography variant="body1">프랭크 버거</Typography>
            <Typography variant="caption" color={colors.gray[400]}>
              {`가계부 이름 > 식비`}
            </Typography>
          </ColWrapper>

          <RowWrapper>
            <Typography variant="body1" fontWeight={700}>
              -25,000원
            </Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" sx={{ color: "#D9D9D9" }} />
            </IconButton>
          </RowWrapper>
        </Item>
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
      >
        <div>삭제</div>
      </Popover>
    </>
  );
};
