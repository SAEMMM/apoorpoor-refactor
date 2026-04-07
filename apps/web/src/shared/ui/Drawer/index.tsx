"use client";

import { Header, MuiDrawer, Wrapper } from "./styles";

import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import React from "react";
import { colors } from "@/styles/theme/tokens/color";

interface DrawerProps {
  title?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export const Drawer = (props: DrawerProps) => {
  const { title, onClose, open, children } = props;

  return (
    <MuiDrawer anchor="bottom" open={open} onClose={onClose}>
      <Wrapper>
        <Header>
          {title && title}

          {onClose && (
            <IconButton size="small" sx={{ ml: "auto" }} onClick={onClose}>
              <ClearIcon fontSize="large" sx={{ color: colors.gray[400] }} />
            </IconButton>
          )}
        </Header>
        {children}
      </Wrapper>
    </MuiDrawer>
  );
};
