import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "../assets/fonts/PretendardVariable.woff2",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});
