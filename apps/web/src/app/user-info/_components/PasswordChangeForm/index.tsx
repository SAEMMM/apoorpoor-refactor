"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Typography } from "@mui/material";

import Button from "@/shared/ui/Button";
import TextField from "@/shared/ui/TextField";
import { changePasswordAction } from "@/features/auth/actions/changePassword";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";

export const PasswordChangeForm = () => {
  const { showSnackbar } = useSnackbar();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    newPassword === confirmPassword;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await changePasswordAction({ currentPassword, newPassword });

      if (result.error) {
        setError(result.error);
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        showSnackbar({ message: "비밀번호가 변경되었습니다.", variant: "success" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Typography variant="caption">현재 비밀번호</Typography>
        <TextField
          value={currentPassword}
          placeholder="현재 비밀번호"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCurrentPassword(e.target.value);
            setError("");
          }}
          onClear={() => setCurrentPassword("")}
          error={Boolean(error)}
          inputProps={{ autoComplete: "current-password" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Typography variant="caption">새 비밀번호</Typography>
        <TextField
          value={newPassword}
          placeholder="8자 이상 영문+숫자"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          onClear={() => setNewPassword("")}
          inputProps={{ autoComplete: "new-password" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <Typography variant="caption">새 비밀번호 확인</Typography>
        <TextField
          value={confirmPassword}
          placeholder="새 비밀번호 확인"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          onClear={() => setConfirmPassword("")}
          error={Boolean(error)}
          errorMessage={error}
          inputProps={{ autoComplete: "new-password" }}
        />
      </div>

      <Button type="submit" disabled={!isValid || isSubmitting}>
        비밀번호 변경
      </Button>
    </form>
  );
};
