"use client";
import { Chivo } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { Providers } from "../providers";
import { usePathname } from 'next/navigation';
const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const noAppBarRoutes = ['/signin','/signup','/forgot-password','/'];
  const noFooterRoutes = ['/signin','/signup','/forgot-password'];
  const hideAppBar = noAppBarRoutes.includes(pathname);
  const hideFooter = noFooterRoutes.includes(pathname);
  return (
    <html lang="en">
      <body className={`${chivo.variable} ${rubik.variable} min-h-screen flex flex-col`}>
       
          <Providers>
          {!hideAppBar && <Appbar />}
            <main className="flex-grow ">{children}</main>
            {!hideFooter && <Footer />}
          </Providers>
       
      </body>
    </html>
  );
}
