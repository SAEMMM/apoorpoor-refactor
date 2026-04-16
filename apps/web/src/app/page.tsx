import type { AuthResponse } from "@repo/shared";
import SplashScreen from "./_components/SplashScreen";
import { fetchApi } from "@/shared/lib/fetchApi";

export default async function SplashPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });

  return <SplashScreen redirectTo={auth ? "/main" : "/sign-in"} />;
}
