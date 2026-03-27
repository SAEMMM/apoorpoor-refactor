"use client";

import { Divider, Stack, Typography } from "@mui/material";
import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";

import Button from "@/shared/ui/Button";
import Checkbox from "@/shared/ui/Checkbox";
import PageContainer from "@/shared/ui/layout/PageContainer";
import Radio from "@/shared/ui/Radio";
import Snackbar from "@/shared/ui/Snackbar";
import TextField from "@/shared/ui/TextField";
import Toggle from "@/shared/ui/Toggle";
import { useState } from "react";

export default function ComponentsPage() {
  const [textValue, setTextValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("전체");

  return (
    <PageContainer>
      <Stack
        spacing={4}
        sx={{
          width: "100%",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "black",
            wordBreak: "break-word",
          }}
        >
          Components
        </Typography>

        <Stack spacing={2}>
          <Typography variant="body2">Toggle</Typography>
          <Toggle />
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="body2">Checkbox</Typography>
          <Checkbox />
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="body2">Radio</Typography>
          <Radio />
        </Stack>

        <Divider />

        <Snackbar
          open
          message="Snackbar message"
          actionLabel="이동하기"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />

        <Stack spacing={2}>
          <Typography variant="body2">Buttons</Typography>
          <Stack spacing={1.5} sx={{ width: "100%", minWidth: 0 }}>
            <Button>Button</Button>
            <Button disabled>Button</Button>
            <Button colorVariant="gray" disabled>
              Button
            </Button>
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="body2">Text Fields</Typography>
          <Stack spacing={2} sx={{ width: "100%", minWidth: 0 }}>
            <TextField
              placeholder="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              onClear={() => setTextValue("")}
            />
            <TextField error errorMessage="Error message" />
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Typography variant="body2">Dropdown</Typography>
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
        </Stack>
      </Stack>
    </PageContainer>
  );
}
