/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Redbrick Robotics Academy — สื่อการสอน Linux & ROS 2 แบบ Interactive",
  description:
    "แพลตฟอร์มการเรียนรู้หุ่นยนต์เชิงปฏิบัติการโดย Redbrick Robotics ฝึกฝน Linux fundamentals, Ubuntu 24.04 LTS, และ ROS 2 Jazzy Jalisco ตั้งแต่บรรทัดคำสั่งสู่หุ่นยนต์อัตโนมัติ",
  icons: {
    icon: "/images/redbrick-logo-transparent.png",
    shortcut: "/images/redbrick-logo-transparent.png",
    apple: "/images/redbrick-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#F8F9FA] dark:bg-[#111315] text-charcoal-900 dark:text-gray-100">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
