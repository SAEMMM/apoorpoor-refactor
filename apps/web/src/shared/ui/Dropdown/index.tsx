"use client";

import { Box, BoxProps, Popover, Stack, Typography } from "@mui/material";
import React, { ReactElement, ReactNode, useMemo, useState } from "react";

import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { colors } from "@/styles/theme/tokens/color";

export type DropdownProps = {
  placeholder?: string;
  valueLabel?: string;
  children?: ReactNode;
  includeAllOption?: boolean;
  allOptionLabel?: string;
  onAllOptionClick?: () => void;
  defaultOpen?: boolean;
  disabled?: boolean;
  containerProps?: BoxProps;
};

type DropdownItemProps = {
  children: ReactNode;
  onClick?: () => void;
  divider?: boolean;
};

export function DropdownItem({
  children,
  onClick,
  divider = false,
}: DropdownItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        height: "48px",
        px: "8px",
        display: "flex",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
        borderRadius: "4px",
        borderBottom: divider ? `1px solid ${colors.gray[150]}` : "none",
        boxSizing: "border-box",
        fontSize: "14px",
        fontWeight: 400,
        color: colors.black,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        "&:hover": {
          backgroundColor: onClick ? colors.gray[150] : "transparent",
        },
      }}
    >
      {children}
    </Box>
  );
}

export default function Dropdown({
  placeholder = "dropdown",
  valueLabel,
  children,
  includeAllOption = false,
  allOptionLabel = "전체",
  onAllOptionClick,
  defaultOpen = false,
  disabled = false,
  containerProps,
}: DropdownProps) {
  const [openAnchor, setOpenAnchor] = useState<HTMLElement | null>(
    defaultOpen ? document.body : null,
  );

  const displayLabel = useMemo(() => {
    return valueLabel || placeholder;
  }, [placeholder, valueLabel]);

  const hasValue = Boolean(valueLabel);
  const open = Boolean(openAnchor);

  const triggerBorderColor = disabled
    ? colors.gray[250]
    : open
      ? colors.secondary.main
      : colors.gray[300];

  const triggerTextColor = disabled
    ? colors.gray[250]
    : hasValue
      ? colors.black
      : colors.gray[500];

  const iconColor = disabled ? colors.gray[150] : colors.gray[500];

  const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (open) {
      setOpenAnchor(null);
      return;
    }

    setOpenAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setOpenAnchor(null);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const element = child as ReactElement<{ onClick?: () => void }>;
    const originalOnClick = element.props.onClick;

    return React.cloneElement(element, {
      onClick: () => {
        originalOnClick?.();
        handleClose();
      },
    });
  });

  return (
    <Stack spacing={1.5} sx={{ width: "100%", ...containerProps?.sx }}>
      <Box
        onClick={handleToggle}
        sx={{
          width: "100%",
          height: 48,
          px: "16px",
          pl: "18px",
          borderRadius: "12px",
          border: `2px solid ${triggerBorderColor}`,
          backgroundColor: colors.white,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.4,
            color: triggerTextColor,
          }}
        >
          {displayLabel}
        </Typography>

        <KeyboardArrowDownRoundedIcon
          sx={{
            fontSize: 28,
            color: iconColor,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </Box>

      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={openAnchor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        transitionDuration={0}
        slotProps={{
          paper: {
            sx: {
              width: openAnchor?.clientWidth ?? undefined,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: "8px",
            boxSizing: "border-box",
            backgroundColor: colors.white,
          }}
        >
          {includeAllOption ? (
            <DropdownItem
              divider={Boolean(children)}
              onClick={() => {
                onAllOptionClick?.();
                handleClose();
              }}
            >
              {allOptionLabel}
            </DropdownItem>
          ) : null}

          {enhancedChildren}
        </Box>
      </Popover>
    </Stack>
  );
}
