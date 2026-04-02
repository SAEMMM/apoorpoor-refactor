"use client";

import { Box, IconButton } from "@mui/material";
import { Contents, Header } from "./styles";

import { AccountBanner } from "./_components/AccountBanner";
import { GrowPoorBanner } from "./_components/GrowPoorBanner";
import Image from "next/image";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { SpendingChallengeBanner } from "./_components/SpendingChallengeBanner";

export default function MainPage() {
  // await new Promise((r) => setTimeout(r, 2000));
  //   throw new Error("테스트 에러");
  return (
    <PageContainer>
      <Header>
        <IconButton
          size="small"
          sx={{
            p: 0,
            width: 44,
            height: 44,
          }}
        >
          <Image
            src={"/images/main/howto.png"}
            width={44}
            height={44}
            alt="how to"
            unoptimized
          />
        </IconButton>
      </Header>

      <Contents>
        <AccountBanner />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <GrowPoorBanner />
          <SpendingChallengeBanner />
        </Box>
      </Contents>
    </PageContainer>
  );
}
