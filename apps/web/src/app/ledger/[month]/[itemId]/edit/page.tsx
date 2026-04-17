import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { LedgerForm } from "../../../_components/LedgerForm";
import type { LedgerItemResponse } from "@repo/shared";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { isValidMonth } from "@/features/ledger/utils/isValidMonth";
import { notFound } from "next/navigation";

type EditPageProps = {
  params: Promise<{ month: string; itemId: string }>;
};

export default async function LedgerEditPage({ params }: EditPageProps) {
  const { month, itemId } = await params;

  if (!isValidMonth(month)) {
    notFound();
  }

  const item = await fetchApi<LedgerItemResponse>({
    path: `/ledger/items/${itemId}`,
  });

  if (!item) {
    notFound();
  }

  return (
    <PageContainer sx={{ gap: "24px" }}>
      <PageHeader title="내역 수정" referenceUrl={`/ledger/${month}`} />

      <LedgerForm month={month} defaultValues={item} />
    </PageContainer>
  );
}
