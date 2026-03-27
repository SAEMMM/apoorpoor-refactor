"use client";

import { Switch, SwitchProps, styled } from "@mui/material";

import { colors } from "@/styles/theme/tokens/color";

const Toggle = styled((props: SwitchProps) => (
  <Switch disableRipple {...props} />
))(({ theme }) => ({
  width: 51,
  height: 31,
  padding: 0,
  display: "inline-flex",
  overflow: "visible",

  "& .MuiSwitch-switchBase": {
    padding: 2,
    margin: 0,
    transitionDuration: "200ms",

    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: colors.white,

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: colors.secondary.main,
      },

      "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      },
    },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
  },

  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 27,
    height: 27,
    backgroundColor: colors.white,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.18)",
  },

  "& .MuiSwitch-track": {
    width: 51,
    height: 31,
    borderRadius: 999,
    opacity: 1,
    backgroundColor: colors.gray[200],
    boxSizing: "border-box",
    transition: theme.transitions.create(["background-color"], {
      duration: 200,
    }),
  },

  "& .MuiSwitch-input": {
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

export default Toggle;
