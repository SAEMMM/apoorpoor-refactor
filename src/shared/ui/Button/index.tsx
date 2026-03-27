"use client";

import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

import { colors } from "@/styles/theme/tokens/color";

export type ButtonColorVariant = "primary" | "gray";

export type ButtonProps = Omit<MuiButtonProps, "color"> & {
  colorVariant?: ButtonColorVariant;
};

const buttonStyles = {
  primary: {
    backgroundColor: colors.primary.main,
    color: colors.white,
    "&:disabled": {
      backgroundColor: colors.primary.l[600],
      color: colors.white,
    },
  },
  gray: {
    backgroundColor: colors.gray[150],
    color: colors.gray[350],
    "&:disabled": {
      backgroundColor: colors.gray[150],
      color: colors.gray[350],
    },
  },
} as const;

export default function Button({
  children,
  colorVariant = "primary",
  variant = "contained",
  sx,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      disableElevation
      fullWidth
      sx={{
        width: "100%",
        minHeight: 56,
        height: "56px",
        borderRadius: "12px",
        boxSizing: "border-box",
        textTransform: "none",
        fontSize: "20px",
        fontWeight: 700,
        boxShadow: "none",
        ...buttonStyles[colorVariant],
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
