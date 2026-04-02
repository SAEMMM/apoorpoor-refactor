"use client";

import { Box, Typography } from "@mui/material";

import Button from "@/shared/ui/Button";
import Image from "next/image";
import PageContainer from "@/shared/ui/layout/PageContainer";
import { colors } from "@/styles/theme/tokens/color";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer centered={true}>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "52px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            color={colors.gray[350]}
            sx={{ fontSize: "40px", fontWeight: 700 }}
          >
            텅 비었네요
          </Typography>

          <Typography
            color={colors.gray[350]}
            sx={{ fontSize: "14px", fontWeight: 400 }}
          >
            서버와 통신이 원활하지 않아
          </Typography>
          <Typography
            color={colors.gray[350]}
            sx={{ fontSize: "14px", fontWeight: 400 }}
          >
            정보를 불러올 수 없어요
          </Typography>
        </Box>

        <Image
          src={"/images/error/error.png"}
          width={158}
          height={94}
          alt="error img"
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body2"
          color={colors.gray[450]}
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          자산탭 바로가기
        </Typography>
        <Button onClick={reset}>다시 시도</Button>
      </Box>
    </PageContainer>
  );
}
