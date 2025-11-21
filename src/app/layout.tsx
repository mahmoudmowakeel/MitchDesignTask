import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { AppProvider } from "./context/AppContext";

export const metadata: Metadata = {
  title: "Mitch-Design Interview Task",
  description: "Our Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AppProvider>{children}</AppProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
