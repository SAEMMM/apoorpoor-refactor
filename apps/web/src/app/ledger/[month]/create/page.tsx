import { LedgerForm } from "../../_components/LedgerForm";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
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
      <PageHeader title="수입 / 지출 등록" referenceUrl={`/ledger/${month}`} />

      <LedgerForm month={month} date={date} />
    </PageContainer>
  );
}
