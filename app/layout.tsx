import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-poppins antialiased">
      <div className="flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      </body>
    </html>
  );
}
