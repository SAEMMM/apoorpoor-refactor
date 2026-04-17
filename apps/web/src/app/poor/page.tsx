import { GoItemButton, PoorContainer, ProfileWrapper } from "./styles";
import { IconButton, Typography } from "@mui/material";

import { AuthResponse } from "@repo/shared";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/shared/ui/layout/PageContainer";
import PageHeader from "@/shared/ui/layout/PageHeader";
import { colors } from "@/styles/theme/tokens/color";
import { fetchApi } from "@/shared/lib/fetchApi";
import { redirect } from "next/navigation";

const getPoorImageSrc = (level: number) => {
  if (level >= 6) {
    return "/images/poor/poor-high.svg";
  }

  if (level === 5) {
    return "/images/poor/poor-mid.svg";
  }

  return "/images/poor/poor-low.svg";
};

export default async function PoorPage() {
  const auth = await fetchApi<AuthResponse>({ path: "/auth/me" });

  if (!auth) {
    redirect("/sign-in");
  }

  const { user } = auth;

  return (
    <PageContainer
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <PageHeader title="푸어 키우기" referenceUrl="/main" />

      <PoorContainer>
        <Image
          src={getPoorImageSrc(user.level)}
          alt="Poor"
          width={122}
          height={225}
        />
        <Image
          src={`/images/level/level-${user.level}.svg`}
          alt="Poor Level"
          width={40}
          height={60}
          style={{ position: "absolute", bottom: -30 }}
        />
      </PoorContainer>

      <ProfileWrapper>
        <Typography fontWeight={700} fontSize={24}>
          {user.poorName}
        </Typography>

        <IconButton size="small">
          <EditIcon sx={{ fontSize: 18, color: colors.gray[350] }} />
        </IconButton>
      </ProfileWrapper>

      <Link href="/poor/items">
        <GoItemButton>아이템</GoItemButton>
      </Link>
    </PageContainer>
  );
}
