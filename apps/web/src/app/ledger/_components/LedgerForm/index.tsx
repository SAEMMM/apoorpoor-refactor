"use client";

import "dayjs/locale/ko";

import { ChangeEvent, FormEvent, useMemo, useState, useTransition } from "react";
import {
  DateSelector,
  FieldWrapper,
  FieldsWrapper,
  Form,
  SubmitButtonWrapper,
  TypeSelector,
} from "./styles";
import Dropdown, { DropdownItem } from "@/shared/ui/Dropdown";
import { FormControlLabel, IconButton, RadioGroup, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import type {
  LedgerCategory,
  LedgerItemResponse,
  LedgerType,
} from "@repo/shared";
import {
  createLedgerItemAction,
  updateLedgerItemAction,
} from "@/features/ledger/actions/ledgerItem";

import Button from "@/shared/ui/Button";
import { CATEGORY_LABEL_MAP } from "@/features/ledger/constants/category";
import { Calendar } from "@/shared/ui/Calendar";
import { Drawer } from "@/shared/ui/Drawer";
import Radio from "@/shared/ui/Radio";
import TextField from "@/shared/ui/TextField";
import { colors } from "@/styles/theme/tokens/color";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/shared/ui/Snackbar/SnackbarProvider";

dayjs.locale("ko");

type LedgerFormValues = {
  name: string;
  type: LedgerType;
  category: LedgerCategory | "";
  amount: string;
};

type LedgerFormErrors = Partial<Record<keyof LedgerFormValues, string>>;

interface LedgerFormProps {
  month: string;
  date?: string;
  defaultValues?: LedgerItemResponse;
}

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABEL_MAP) as [
  LedgerCategory,
  string,
][];

const INCOME_CATEGORIES: LedgerCategory[] = ["salary", "bonus", "etc"];

const EXPENSE_CATEGORIES: LedgerCategory[] = [
  "food",
  "cafe",
  "transport",
  "shopping",
  "living",
  "health",
  "culture",
  "gift",
  "etc",
];

function getCategoriesByType(type: LedgerType): [LedgerCategory, string][] {
  const categories =
    type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.map((key) => [key, CATEGORY_LABEL_MAP[key]]);
}

function validateName(value: string) {
  if (!value.trim()) return "내역 이름을 입력해주세요.";
  if (value.trim().length > 20) return "20자 이내로 입력해주세요.";
  return "";
}

function validateCategory(value: string) {
  if (!value) return "카테고리를 선택해주세요.";
  return "";
}

function validateAmount(value: string) {
  if (!value) return "금액을 입력해주세요.";
  const num = Number(value.replace(/,/g, ""));
  if (Number.isNaN(num) || num <= 0) return "올바른 금액을 입력해주세요.";
  return "";
}

function validateForm(values: LedgerFormValues): LedgerFormErrors {
  return {
    name: validateName(values.name),
    category: validateCategory(values.category),
    amount: validateAmount(values.amount),
  };
}

function formatAmountInput(value: string): string {
  const digits = value.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("ko-KR");
}

function getInitialDate(date?: string, defaultValues?: LedgerItemResponse, month?: string): string {
  if (defaultValues?.date) return defaultValues.date;
  if (date) return date;
  return `${month}-01`;
}

function formatDateLabel(dateStr: string): string {
  return dayjs(dateStr).format("YYYY년 M월 D일 (dd)");
}

export const LedgerForm = ({ month, date, defaultValues }: LedgerFormProps) => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const isEdit = Boolean(defaultValues);

  const [selectedDate, setSelectedDate] = useState(
    getInitialDate(date, defaultValues, month),
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerMonth, setDatePickerMonth] = useState(
    selectedDate.slice(0, 7),
  );

  const [values, setValues] = useState<LedgerFormValues>({
    name: defaultValues?.name ?? "",
    type: defaultValues?.type ?? "expense",
    category: defaultValues?.category ?? "",
    amount: defaultValues
      ? Math.abs(defaultValues.amount).toLocaleString("ko-KR")
      : "",
  });

  const [errors, setErrors] = useState<LedgerFormErrors>({});
  const [touched, setTouched] = useState<
    Record<keyof LedgerFormValues, boolean>
  >({
    name: false,
    type: false,
    category: false,
    amount: false,
  });

  const isFormValid = useMemo(() => {
    const nextErrors = validateForm(values);
    return Object.values(nextErrors).every((error) => !error);
  }, [values]);

  const categoryOptions = getCategoriesByType(values.type);
  const selectedCategoryLabel = values.category
    ? CATEGORY_LABEL_MAP[values.category]
    : undefined;

  const handleChange =
    (field: keyof LedgerFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let nextValue = event.target.value;

      if (field === "amount") {
        nextValue = formatAmountInput(nextValue);
      }

      setValues((prev) => ({ ...prev, [field]: nextValue }));

      if (touched[field]) {
        const validator =
          field === "name"
            ? validateName
            : field === "category"
              ? validateCategory
              : field === "amount"
                ? validateAmount
                : () => "";

        setErrors((prev) => ({ ...prev, [field]: validator(nextValue) }));
      }
    };

  const handleBlur = (field: keyof LedgerFormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    const validator =
      field === "name"
        ? validateName
        : field === "category"
          ? validateCategory
          : field === "amount"
            ? validateAmount
            : () => "";

    setErrors((prev) => ({ ...prev, [field]: validator(values[field]) }));
  };

  const handleClear = (field: keyof LedgerFormValues) => () => {
    setValues((prev) => ({ ...prev, [field]: "" }));
    if (touched[field]) {
      const validator =
        field === "name"
          ? validateName
          : field === "amount"
            ? validateAmount
            : () => "";
      setErrors((prev) => ({ ...prev, [field]: validator("") }));
    }
  };

  const handleTypeChange = (nextType: LedgerType) => {
    setValues((prev) => ({ ...prev, type: nextType, category: "" }));
    setErrors((prev) => ({ ...prev, category: "" }));
    setTouched((prev) => ({ ...prev, category: false }));
  };

  const handleCategorySelect = (category: LedgerCategory) => {
    setValues((prev) => ({ ...prev, category }));
    setTouched((prev) => ({ ...prev, category: true }));
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setTouched({ name: true, type: true, category: true, amount: true });
    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) return;

    const amount = Number(values.amount.replace(/,/g, ""));

    startTransition(async () => {
      if (isEdit && defaultValues) {
        await updateLedgerItemAction(defaultValues.id, {
          name: values.name.trim(),
          type: values.type,
          category: values.category as LedgerCategory,
          amount,
          date: selectedDate,
        });
      } else {
        await createLedgerItemAction({
          name: values.name.trim(),
          type: values.type,
          category: values.category as LedgerCategory,
          amount,
          date: selectedDate,
        });
      }

      if (!isEdit) {
        showSnackbar({ message: "10 포인트가 적립 되었어요.", variant: "success" });
      }
      router.push(`/ledger/${month}`);
    });
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FieldsWrapper>
        <FieldWrapper>
          <Typography variant="body2">분류</Typography>
          <TypeSelector>
            <RadioGroup
              row
              value={values.type}
              onChange={(e) => handleTypeChange(e.target.value as LedgerType)}
            >
              <FormControlLabel
                value="expense"
                control={<Radio sx={{ alignSelf: "center" }} />}
                label={
                  <Typography variant="body1" sx={{ ml: "4px" }}>
                    지출
                  </Typography>
                }
                sx={{ ml: 0, mr: "24px" }}
              />
              <FormControlLabel
                value="income"
                control={<Radio sx={{ alignSelf: "center" }} />}
                label={
                  <Typography variant="body1" sx={{ ml: "4px" }}>
                    수입
                  </Typography>
                }
                sx={{ ml: 0 }}
              />
            </RadioGroup>
          </TypeSelector>
        </FieldWrapper>

        <FieldWrapper>
          <Typography variant="body2">날짜</Typography>
          <DateSelector
            onClick={() => setIsDatePickerOpen(true)}
            sx={{ borderColor: colors.gray[350] }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: 400, color: colors.black }}
            >
              {formatDateLabel(selectedDate)}
            </Typography>
          </DateSelector>
        </FieldWrapper>

        <FieldWrapper>
          <Typography variant="body2">내역 이름</Typography>
          <TextField
            value={values.name}
            placeholder="내역 이름을 입력해주세요"
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            onClear={handleClear("name")}
            error={Boolean(touched.name && errors.name)}
            errorMessage={touched.name ? errors.name : ""}
            inputProps={{
              maxLength: 20,
              enterKeyHint: "next",
            }}
          />
        </FieldWrapper>

        <FieldWrapper>
          <Typography variant="body2">카테고리</Typography>
          <Dropdown
            placeholder="카테고리 선택"
            valueLabel={selectedCategoryLabel}
          >
            {categoryOptions.map(([key, label]) => (
              <DropdownItem key={key} onClick={() => handleCategorySelect(key)}>
                {label}
              </DropdownItem>
            ))}
          </Dropdown>
        </FieldWrapper>

        <FieldWrapper>
          <Typography variant="body2">금액</Typography>
          <TextField
            value={values.amount}
            placeholder="금액 입력"
            onChange={handleChange("amount")}
            onBlur={handleBlur("amount")}
            onClear={handleClear("amount")}
            error={Boolean(touched.amount && errors.amount)}
            errorMessage={touched.amount ? errors.amount : ""}
            inputProps={{
              inputMode: "numeric",
              enterKeyHint: "done",
            }}
          />
        </FieldWrapper>
      </FieldsWrapper>

      <SubmitButtonWrapper>
        <Button type="submit" disabled={!isFormValid || isPending}>
          {isEdit ? "수정하기" : "추가하기"}
        </Button>
      </SubmitButtonWrapper>

      <Drawer
        open={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton
              size="small"
              onClick={() => {
                const prev = dayjs(`${datePickerMonth}-01`).subtract(1, "month");
                setDatePickerMonth(prev.format("YYYY-MM"));
              }}
            >
              <ArrowLeftIcon sx={{ color: colors.gray[500] }} />
            </IconButton>

            <Typography variant="h2" color={colors.primary.main}>
              {dayjs(`${datePickerMonth}-01`).format("YYYY년 M월")}
            </Typography>

            <IconButton
              size="small"
              onClick={() => {
                const next = dayjs(`${datePickerMonth}-01`).add(1, "month");
                setDatePickerMonth(next.format("YYYY-MM"));
              }}
            >
              <ArrowRightIcon sx={{ color: colors.gray[500] }} />
            </IconButton>
          </div>
        }
      >
        <Calendar
          month={datePickerMonth}
          selected={dayjs(selectedDate).toDate()}
          onSelect={(d) => {
            setSelectedDate(dayjs(d).format("YYYY-MM-DD"));
            setDatePickerMonth(dayjs(d).format("YYYY-MM"));
            setIsDatePickerOpen(false);
          }}
        />
      </Drawer>
    </Form>
  );
};
