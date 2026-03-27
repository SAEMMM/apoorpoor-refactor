"use client";

import { Box, Stack, Typography } from "@mui/material";
import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";

import Button from "@/shared/ui/Button";
import Checkbox from "@/shared/ui/Checkbox";
import Radio from "@/shared/ui/Radio";
import Snackbar from "@/shared/ui/Snackbar";
import TextField from "@/shared/ui/TextField";
import Toggle from "@/shared/ui/Toggle";
import { useState } from "react";

export default function ComponentsPage() {
  const [textValue, setTextValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("전체");

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
        <Box sx={{ width: "320px", display: "flex", gap: "8px" }}>
          <Button>Button</Button>
          <Button disabled>Button</Button>
          <Button colorVariant="gray" disabled>
            Button
          </Button>
        </Box>
        <Box sx={{ width: "420px", display: "flex", gap: "8px" }}>
          <TextField
            placeholder="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onClear={() => setTextValue("")}
          />
          <TextField error={true} errorMessage="Error message" />
        </Box>
        <Box sx={{ width: "420px", display: "flex", gap: "8px" }}>
          <Dropdown
            placeholder="dropdown"
            valueLabel={dropdownValue}
            includeAllOption
            onAllOptionClick={() => {
              setDropdownValue("전체");
            }}
          >
            <DropdownItem divider onClick={() => setDropdownValue("Item 1")}>
              Item 1
            </DropdownItem>
            <DropdownItem onClick={() => setDropdownValue("Item 2")}>
              Item 2
            </DropdownItem>
          </Dropdown>
        </Box>
        <Button colorVariant="gray" disabled>
          Button
        </Button>
      </Stack>
    </Box>
  );
}
