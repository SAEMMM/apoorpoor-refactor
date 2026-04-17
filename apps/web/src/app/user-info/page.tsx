import { Divider, InfoRow, InfoSection } from "./styles";
import { IconButton, Typography } from "@mui/material";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import type { AuthResponse } from "@repo/shared";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
import { PasswordChangeForm } from "./_components/PasswordChangeForm";
import { SignOutButton } from "./_components/SignOutButton";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

export default async function UserInfoPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });

  if (!auth) {
    redirect("/sign-in");
  }

  const { user } = auth;

  return (
    <PageContainer sx={{ gap: "24px" }}>
      <PageHeader title="내 정보" referenceUrl="/main" />

      <InfoSection>
        <Typography variant="body2" fontWeight={700}>
          계정 정보
        </Typography>

        <InfoRow>
          <Typography variant="body2" color={colors.gray[500]}>
            이메일
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </InfoRow>

        <InfoRow>
          <Typography variant="body2" color={colors.gray[500]}>
            푸어 이름
          </Typography>
          <Typography variant="body2">{user.poorName}</Typography>
        </InfoRow>
      </InfoSection>

      <Divider />

      <InfoSection>
        <Typography variant="body2" fontWeight={700}>
          비밀번호 변경
        </Typography>

        <PasswordChangeForm />
      </InfoSection>

      <Divider />

      <SignOutButton />
    </PageContainer>
  );
}
