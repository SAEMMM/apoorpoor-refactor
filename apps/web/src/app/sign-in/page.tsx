"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  FieldWrapper,
  FieldsWrapper,
  Form,
  SubmitButtonWrapper,
  TypoWrapper,
  Wrapper,
} from "./styles";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";

import Button from "@/shared/ui/Button";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import TextField from "@/shared/ui/TextField";
import { colors } from "@/styles/theme/tokens/color";
import { signInAction } from "@/features/auth/actions/signIn";

const SAVED_EMAIL_KEY = "saved-email";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveEmail, setSaveEmail] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(SAVED_EMAIL_KEY);
    if (saved) {
      setEmail(saved);
      setSaveEmail(true);
    }
  }, []);

  const isFormValid = useMemo(() => {
    return email.trim().length > 0 && password.length > 0;
  }, [email, password]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (saveEmail) {
      localStorage.setItem(SAVED_EMAIL_KEY, email.trim());
    } else {
      localStorage.removeItem(SAVED_EMAIL_KEY);
    }

    try {
      setIsSubmitting(true);

      const result = await signInAction({
        email: email.trim(),
        password,
      });

      if (result?.error) {
        setError(result.error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit} noValidate>
        <Wrapper>
          <TypoWrapper>
            <Typography variant="h1">안녕하세요!</Typography>
            <Typography variant="h1">로그인해주세요.</Typography>
          </TypoWrapper>

          <FieldsWrapper>
            <FieldWrapper>
              <Typography variant="body2">이메일</Typography>
              <TextField
                value={email}
                placeholder="이메일을 입력해주세요"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onClear={() => setEmail("")}
                error={Boolean(error)}
                type="email"
                inputProps={{
                  inputMode: "email",
                  autoComplete: "email",
                  autoCapitalize: "none",
                  enterKeyHint: "next",
                }}
              />
            </FieldWrapper>

            <FieldWrapper>
              <Typography variant="body2">비밀번호</Typography>
              <TextField
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onClear={() => setPassword("")}
                error={Boolean(error)}
                errorMessage={error}
                type="password"
                inputProps={{
                  autoComplete: "current-password",
                  enterKeyHint: "done",
                }}
              />
            </FieldWrapper>

            <FormControlLabel
              control={
                <Checkbox
                  checked={saveEmail}
                  onChange={(e) => setSaveEmail(e.target.checked)}
                  size="small"
                  sx={{
                    color: colors.gray[300],
                    "&.Mui-checked": { color: colors.primary.main },
                  }}
                />
              }
              label={
                <Typography variant="body2" color={colors.gray[500]}>
                  아이디 저장
                </Typography>
              }
            />
          </FieldsWrapper>
        </Wrapper>

        <SubmitButtonWrapper>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            로그인
          </Button>

          <Link
            href="/sign-up"
            style={{
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            <Typography variant="body2" color={colors.gray[500]}>
              계정이 없으신가요?{" "}
              <span style={{ color: colors.primary.main, fontWeight: 700 }}>
                회원가입
              </span>
            </Typography>
          </Link>
        </SubmitButtonWrapper>
      </Form>
    </PageContainer>
  );
}
