import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import Providers from "./providers";
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
        }}
      >
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
