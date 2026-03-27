"use client";

import { Box, Checkbox, CheckboxProps, styled } from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import { colors } from "@/styles/theme/tokens/color";

const BaseBox = styled(Box)(() => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
}));

function AppCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      sx={{
        p: 0,
        width: 20,
        height: 20,
        minWidth: 20,
        minHeight: 20,
        display: "inline-flex",
        flex: "0 0 auto",
        alignSelf: "flex-start",
        "& .MuiTouchRipple-root": {
          display: "none",
        },
        "& input": {
          width: 20,
          height: 20,
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      icon={
        <BaseBox
          sx={{
            backgroundColor: colors.gray[200],
          }}
        >
          <CheckIcon
            sx={{
              fontSize: 20,
              color: colors.white,
            }}
          />
        </BaseBox>
      }
      checkedIcon={
        <BaseBox
          sx={{
            backgroundColor: colors.secondary.main,
          }}
        >
          <CheckIcon
            sx={{
              fontSize: 20,
              color: colors.white,
            }}
          />
        </BaseBox>
      }
      {...props}
    />
  );
}

export default AppCheckbox;
