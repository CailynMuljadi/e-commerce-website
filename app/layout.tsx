import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from"@clerk/nextjs";

export const metadata: Metadata = {
  title:{
    template: "%s - Shopcart online store",
    default: "Shopcart online Store",
  },
  description: "Shopcart online store is a modern e-commerce platform that offers a wide range of products for all your shopping needs. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-poppins antialiased" suppressHydrationWarning>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
