"use client";

import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/theme/tokens/color";

type SplashScreenProps = {
  redirectTo: "/main" | "/sign-in";
};

export default function SplashScreen({ redirectTo }: SplashScreenProps) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(redirectTo);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [redirectTo, router]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100dvh",
        backgroundColor: colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        px: 3,
      }}
    >
      <Stack spacing={0} alignItems="center">
        <Image
          alt="splash"
          src={"/images/splash/splash-image.png"}
          width={214}
          height={70}
        />

        <Typography
          variant="body2"
          sx={{
            color: colors.primary.main,
            fontWeight: 700,
          }}
        >
          나만의 거지 키우기
        </Typography>
      </Stack>
    </Box>
  );
}
