import { Box, Stack, Typography } from "@mui/material";

import Checkbox from "@/shared/ui/Checkbox";
import Radio from "@/shared/ui/Radio";
import Snackbar from "@/shared/ui/Snackbar";
import Toggle from "@/shared/ui/Toggle";

export default function ComponentsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={4}>
        <Typography variant="h1">Components</Typography>
        <Toggle />
        <Checkbox />
        <Radio />
        <Snackbar
          open={true}
          message="Snackbar message"
          actionLabel="이동하기"
        />
      </Stack>
    </Box>
  );
}
