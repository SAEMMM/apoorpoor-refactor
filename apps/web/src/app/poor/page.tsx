import { AuthResponse } from "@repo/shared";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

export default async function PoorPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });

  if (!auth) {
    redirect("/sign-in");
  }

  const { user } = auth;

  return <PageContainer>{user.poorName}</PageContainer>;
}
