import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Providers } from "@/redux/provider";

export const metadata = {
  title: "Who Wants To Be A Millionaire",
  description: "Sponsored by Shelta!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
