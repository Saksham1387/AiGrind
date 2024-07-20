// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// import { Chivo } from "next/font/google";
// import { Rubik } from "next/font/google";
// import "./globals.css";
// import { Appbar } from "../components/Appbar";
// import { Footer } from "../components/Footer";
// import { Providers,ThemeProvider } from "../providers";

// const chivo = Chivo({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-chivo",
// });
// const rubik = Rubik({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-rubik",
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }): JSX.Element {
//   return (
//     <html lang="en">
//       <body className={chivo.variable + " " + rubik.variable}>
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//         <Providers>
//           <Appbar />
//           {children}
//           <Footer />
//         </Providers>
//       </ThemeProvider>
//       </body>
//     </html>
//   );
// }
"use client";
import { Chivo } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Appbar } from "../components/Appbar";
import { Footer } from "../components/Footer";
import { Providers, ThemeProvider } from "../providers";
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
  const noAppBarRoutes = ['/signin','/signup','/forgot-password'];
  const hideAppBar = noAppBarRoutes.includes(pathname);
  return (
    <html lang="en">
      <body className={`${chivo.variable} ${rubik.variable} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
          {!hideAppBar && <Appbar />}
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
