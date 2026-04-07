import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { LedgerForm } from "../../_components/LedgerForm";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { colors } from "@/styles/theme/tokens/color";
import { isValidMonth } from "@/features/ledger/utils/isValidMonth";
import { notFound } from "next/navigation";

type CreatePageProps = {
  params: Promise<{ month: string }>;
  searchParams: Promise<{ date?: string }>;
};

export default async function LedgerCreatePage({
  params,
  searchParams,
}: CreatePageProps) {
  const { month } = await params;
  const { date } = await searchParams;

  if (!isValidMonth(month)) {
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
          <IconButton size="small">
            <ArrowBackIosNewIcon
              sx={{ width: "24px", height: "24px", color: colors.black }}
            />
          </IconButton>
        </Link>

        <Typography variant="h2">수입 / 지출 등록</Typography>
      </div>

      <LedgerForm month={month} date={date} />
    </PageContainer>
  );
}
