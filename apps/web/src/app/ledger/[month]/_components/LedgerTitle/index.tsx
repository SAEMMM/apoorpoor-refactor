"use client";

import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Drawer } from "@/shared/ui/Drawer";
import TextField from "@/shared/ui/TextField";
import Button from "@/shared/ui/Button";
import { TitleWrapper } from "../../styles";
import { colors } from "@/styles/theme/tokens/color";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";
import { updateLedgerNameAction } from "@/features/ledger/actions/ledgerSettings";

interface LedgerTitleProps {
  initialName: string;
}

export const LedgerTitle = ({ initialName }: LedgerTitleProps) => {
  const { showSnackbar } = useSnackbar();
  const [name, setName] = useState(initialName);
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setDraft(name);
    setOpen(true);
  };

  const handleSave = async () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const result = await updateLedgerNameAction(trimmed);

    if (result) {
      setName(result.name);
      setOpen(false);
      showSnackbar({ message: "저장이 완료되었습니다.", variant: "success" });
    } else {
      showSnackbar({ message: "저장에 실패했습니다.", variant: "error" });
    }
  };

  return (
    <>
      <TitleWrapper>
        <Typography variant="body2" color={colors.gray[500]}>
          {name}
        </Typography>
        <IconButton size="small" onClick={handleOpen}>
          <EditIcon sx={{ fontSize: 18, color: colors.gray[350] }} />
        </IconButton>
      </TitleWrapper>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={
          <Typography variant="h2" color={colors.primary.main}>
            가계부 이름 수정
          </Typography>
        }
      >
        <TextField
          value={draft}
          placeholder="가계부 이름을 입력해주세요"
          onChange={(e) => setDraft(e.target.value)}
          onClear={() => setDraft("")}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          inputProps={{ maxLength: 20 }}
        />
        <Button
          onClick={handleSave}
          disabled={!draft.trim()}
        >
          저장
        </Button>
      </Drawer>
    </>
  );
};
