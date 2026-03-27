"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  FieldWrapper,
  FieldsWrapper,
  Form,
  SubmitButtonWrapper,
  TypoWrapper,
  Wrapper,
} from "./styles";

import Button from "@/shared/ui/Button";
import PageContainer from "@/shared/ui/layout/PageContainer";
import TextField from "@/shared/ui/TextField";
import { Typography } from "@mui/material";

type SignupFormValues = {
  email: string;
  password: string;
  poorName: string;
};

type SignupFormErrors = Partial<Record<keyof SignupFormValues, string>>;

const INITIAL_VALUES: SignupFormValues = {
  email: "",
  password: "",
  poorName: "",
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function validateEmail(value: string) {
  if (!value.trim()) return "이메일을 입력해주세요.";
  if (!emailRegex.test(value.trim()))
    return "올바른 이메일 형식을 입력해주세요.";
  return "";
}

function validatePassword(value: string) {
  if (!value) return "비밀번호를 입력해주세요.";
  if (value.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    return "영문과 숫자를 모두 포함해주세요.";
  }
  return "";
}

function validatePoorName(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "푸어 이름을 입력해주세요.";

  // 한글만 허용 (완성형 + 자모까지 포함)
  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
  if (!koreanRegex.test(trimmed)) {
    return "한글만 입력 가능합니다.";
  }

  if (trimmed.length > 8) {
    return "푸어 이름은 최대 8자까지 가능합니다.";
  }

  return "";
}
function validateForm(values: SignupFormValues): SignupFormErrors {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    poorName: validatePoorName(values.poorName),
  };
}

export default function SignupPage() {
  const [values, setValues] = useState<SignupFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<
    Record<keyof SignupFormValues, boolean>
  >({
    email: false,
    password: false,
    poorName: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = useMemo(() => {
    const nextErrors = validateForm(values);
    return Object.values(nextErrors).every((error) => !error);
  }, [values]);

  const handleChange =
    (field: keyof SignupFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let nextValue = event.target.value;

      // 🔥 푸어 이름 입력 제한
      if (field === "poorName") {
        // 한글만 남기기
        nextValue = nextValue.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");

        // 8자 제한
        if (nextValue.length > 8) {
          nextValue = nextValue.slice(0, 8);
        }
      }

      setValues((prev) => ({
        ...prev,
        [field]: nextValue,
      }));

      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]:
            field === "email"
              ? validateEmail(nextValue)
              : field === "password"
                ? validatePassword(nextValue)
                : validatePoorName(nextValue),
        }));
      }
    };

  const handleBlur = (field: keyof SignupFormValues) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "email"
          ? validateEmail(values.email)
          : field === "password"
            ? validatePassword(values.password)
            : validatePoorName(values.poorName),
    }));
  };

  const handleClear = (field: keyof SignupFormValues) => () => {
    setValues((prev) => ({
      ...prev,
      [field]: "",
    }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]:
          field === "email"
            ? validateEmail("")
            : field === "password"
              ? validatePassword("")
              : validatePoorName(""),
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);

    setTouched({
      email: true,
      password: true,
      poorName: true,
    });
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    try {
      setIsSubmitting(true);

      // TODO: 실제 회원가입 API 연결
      // await signup(values);

      console.log("회원가입 요청", {
        email: values.email.trim(),
        password: values.password,
        poorName: values.poorName.trim(),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Form onSubmit={handleSubmit} noValidate>
        <Wrapper>
          <TypoWrapper>
            <Typography variant="h1">환영해요!</Typography>
            <Typography variant="h1">
              가입에 필요한 정보를 입력해주세요.
            </Typography>
          </TypoWrapper>

          <FieldsWrapper>
            <FieldWrapper>
              <Typography variant="body2">이메일</Typography>
              <TextField
                value={values.email}
                placeholder="이메일을 입력해주세요"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                onClear={handleClear("email")}
                error={Boolean(touched.email && errors.email)}
                errorMessage={touched.email ? errors.email : ""}
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
                value={values.password}
                placeholder="비밀번호를 입력해주세요"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                onClear={handleClear("password")}
                error={Boolean(touched.password && errors.password)}
                errorMessage={touched.password ? errors.password : ""}
                type="password"
                inputProps={{
                  autoComplete: "new-password",
                  enterKeyHint: "next",
                }}
              />
            </FieldWrapper>

            <FieldWrapper>
              <Typography variant="body2">푸어 이름</Typography>
              <TextField
                value={values.poorName}
                placeholder="푸어 이름을 입력해주세요"
                onChange={handleChange("poorName")}
                onBlur={handleBlur("poorName")}
                onClear={handleClear("poorName")}
                error={Boolean(touched.poorName && errors.poorName)}
                errorMessage={touched.poorName ? errors.poorName : ""}
                inputProps={{
                  maxLength: 8,
                  inputMode: "text",
                  autoComplete: "nickname",
                }}
              />
            </FieldWrapper>
          </FieldsWrapper>
        </Wrapper>

        <SubmitButtonWrapper>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            가입하기
          </Button>
        </SubmitButtonWrapper>
      </Form>
    </PageContainer>
  );
}
