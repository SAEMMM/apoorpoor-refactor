"use client";

import { Box, Link, Stack, Typography } from "@mui/material";
import MuiSnackbar, {
  SnackbarProps as MuiSnackbarProps,
} from "@mui/material/Snackbar";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { colors } from "@/styles/theme/tokens/color";

export type AppSnackbarVariant = "default" | "error" | "success";

export type SnackbarProps = Omit<MuiSnackbarProps, "message" | "children"> & {
  message: string;
  variant?: AppSnackbarVariant;
  actionLabel?: string;
  onActionClick?: () => void;
};

type SnackbarContentProps = {
  message: string;
  variant?: AppSnackbarVariant;
  actionLabel?: string;
  onActionClick?: () => void;
};

function SnackbarContent({
  message,
  variant = "default",
  actionLabel,
  onActionClick,
}: SnackbarContentProps) {
  const iconMap = {
    error: (
      <ErrorOutlineIcon sx={{ fontSize: 28, color: colors.primary.l[300] }} />
    ),
    success: (
      <CheckCircleOutlineIcon
        sx={{ fontSize: 28, color: colors.primary.l[300] }}
      />
    ),
  };

  const hasIcon = variant !== "default";

  return (
    <Box
      sx={{
        width: 320,
        maxWidth: 320,
        height: 46,
        minHeight: 46,
        padding: "12px 16px",
        borderRadius: "12px",
        backgroundColor: colors.primary.d[500],
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ minWidth: 0, flex: 1 }}
        >
          {hasIcon
            ? iconMap[variant as Exclude<AppSnackbarVariant, "default">]
            : null}

          <Typography
            variant="body2"
            sx={{
              color: colors.white,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {message}
          </Typography>
        </Stack>

        {actionLabel ? (
          <Link
            component="button"
            type="button"
            underline="always"
            onClick={onActionClick}
            sx={{
              color: colors.primary.l[300],
              fontSize: "12px",
              fontWeight: 400,
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {actionLabel}
          </Link>
        ) : null}
      </Stack>
    </Box>
  );
}

export default function Snackbar({
  open,
  onClose,
  message,
  variant = "default",
  actionLabel,
  onActionClick,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
  autoHideDuration = 3000,
  ...props
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      {...props}
    >
      <div>
        <SnackbarContent
          message={message}
          variant={variant}
          actionLabel={actionLabel}
          onActionClick={onActionClick}
        />
      </div>
    </MuiSnackbar>
  );
}
