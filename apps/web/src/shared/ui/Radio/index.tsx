"use client";

import { Box, Radio as MuiRadio, RadioProps, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

const BaseCircle = styled(Box)(() => ({
  width: 20,
  height: 20,
  borderRadius: "50%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function Radio(props: RadioProps) {
  return (
    <MuiRadio
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
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
      icon={
        <BaseCircle
          sx={{
            border: `1px solid ${colors.gray[300]}`,
            backgroundColor: colors.white,
          }}
        />
      }
      checkedIcon={
        <BaseCircle
          sx={{
            border: `2px solid ${colors.secondary.main}`,
            backgroundColor: colors.white,
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: colors.secondary.main,
            }}
          />
        </BaseCircle>
      }
      {...props}
    />
  );
}

export default Radio;
