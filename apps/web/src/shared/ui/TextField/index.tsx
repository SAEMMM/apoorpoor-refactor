"use client";

import {
  Box,
  IconButton,
  InputBase,
  InputBaseProps,
  Stack,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { colors } from "@/styles/theme/tokens/color";
import { useState } from "react";

export type AppTextFieldProps = InputBaseProps & {
  errorMessage?: string;
  showClearButton?: boolean;
  onClear?: () => void;
};

export default function TextField({
  value,
  placeholder,
  error = false,
  errorMessage,
  showClearButton = true,
  onClear,
  onFocus,
  onBlur,
  type,
  sx,
  ...props
}: AppTextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const hasValue =
    value !== undefined && value !== null && String(value).length > 0;

  const borderColor = error
    ? colors.system.error
    : focused
      ? colors.primary.main
      : colors.gray[350];

  const textColor = error
    ? colors.system.error
    : hasValue
      ? colors.black
      : colors.gray[250];

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "48px",
          paddingLeft: "12px",
          borderBottom: `1px solid ${borderColor}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ width: "100%" }}
        >
          <InputBase
            value={value}
            placeholder={placeholder}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            sx={{
              flex: 1,
              minWidth: 0,
              color: textColor,
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.4,
              "& input": {
                p: 0,
                height: "auto",
                caretColor: error ? colors.system.error : colors.primary.main,
              },
              "& input::placeholder": {
                color: colors.gray[250],
                opacity: 1,
              },
              ...sx,
            }}
            {...props}
            type={inputType}
          />

          {isPassword && (
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              disableRipple
              sx={{
                p: 0,
                ml: 1,
                color: colors.gray[350],
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              {showPassword ? (
                <VisibilityIcon sx={{ fontSize: 20 }} />
              ) : (
                <VisibilityOffIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          )}

          {showClearButton ? (
            <IconButton
              onClick={onClear}
              disableRipple
              sx={{
                p: 0,
                ml: 1,
                color: colors.gray[350],
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          ) : null}
        </Stack>
      </Box>

      {error && errorMessage ? (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ErrorIcon
            sx={{
              fontSize: 18,
              color: colors.system.error,
            }}
          />
          <Typography
            sx={{
              color: colors.system.error,
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {errorMessage}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
}
