import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { LedgerForm } from "../../../_components/LedgerForm";
import type { LedgerItemResponse } from "@repo/shared";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
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
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link
          href={`/ledger/${month}`}
          style={{ position: "absolute", left: 0 }}
        >
          <IconButton>
            <ArrowBackIosNewIcon
              fontSize="large"
              sx={{ width: "24px", height: "24px", color: colors.black }}
            />
          </IconButton>
        </Link>

        <Typography variant="h2">내역 수정</Typography>
      </div>

      <LedgerForm month={month} defaultValues={item} />
    </PageContainer>
  );
}
