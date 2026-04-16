import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AuthResponse } from "@repo/shared";
import { Header } from "./styles";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

export default async function PoorPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });

  if (!auth) {
    redirect("/sign-in");
  }

  const { user } = auth;

  return (
    <PageContainer>
      <Header>
        <Link href={`/main`} style={{ position: "absolute", left: 0 }}>
          <IconButton size="small">
            <ArrowBackIosNewIcon
              sx={{ width: "24px", height: "24px", color: colors.black }}
            />
          </IconButton>
        </Link>

        <Typography variant="h2">푸어 키우기</Typography>
      </Header>
    </PageContainer>
  );
}
