import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import MobileAppShell from "@/shared/ui/layout/MobileAppShell";
import Providers from "./providers";
import React from "react";
import { pretendard } from "./fonts";

export const metadata: Metadata = {
  title: "apoorpoor-refactor",
  description: "apoorpoor-refactor web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body
        style={{
          fontFamily: "var(--font-pretendard), sans-serif",
          margin: 0,
        }}
      >
        <AppRouterCacheProvider>
          <Providers>
            <MobileAppShell>{children}</MobileAppShell>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
