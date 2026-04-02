import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";

export const theme = createTheme({
  typography,
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
        },
      },
    },
  },
});
