import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";

export const metadata: Metadata = {
  title: "Movie Nest",
  description:
    "A curated platform to explore, organize, and discover movie lists. Easily browse through a wide range of films and create your personalized watchlists. Perfect for movie enthusiasts and casual viewers alike!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-publicSans antialiased`}>
        <section>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </section>
      </body>
    </html>
  );
}
