import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { EdgeStoreProvider } from "./libs/edgestore";
import { Container, Theme } from "@radix-ui/themes";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import "@radix-ui/themes/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CFA Rolodex",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="red">
              <NavBar />
              <main className="p-5">
                <Container>
                  <EdgeStoreProvider>{children}</EdgeStoreProvider>
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
