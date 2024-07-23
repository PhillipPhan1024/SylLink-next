import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import { getUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SylLink",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user}/>

        {/* <main className="flex flex-col justify-center items-center min-h-screen pb-24">
          {children}
        </main> */}
        <main>{children}</main>

        <Toaster />
      </body>
    </html>
  );
}
