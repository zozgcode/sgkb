import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Credit Cards, Bank, and Loans - Personal and Business",
  description: "Credit Cards, Bank, and Loans - Personal and Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen hidden md:flex items-center justify-center text-xl">
          <p>For seamless transaction, Kindly view this page on a mobile device. Thanks</p>
        </div>
        <ProtectedRoute>
          <div className="block md:hidden">{children}</div>
        </ProtectedRoute>
      </body>
    </html>
  );
}
