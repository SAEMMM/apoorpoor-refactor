import { AuthResponse, PoorOverviewResponse } from "@repo/shared";

import { ItemsGroup } from "./_components/ItemGroup";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

export default async function ItemsPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });
  const poor = await fetchApi<PoorOverviewResponse>({ path: "/poor" });

  if (!poor || !auth) {
    redirect("/sign-in");
  }

  return (
    <PageContainer sx={{ gap: "12px" }}>
      <PageHeader title="아이템" referenceUrl="/poor" />

      <ItemsGroup items={poor.items} poorLevel={auth.user.level} />
    </PageContainer>
  );
}
