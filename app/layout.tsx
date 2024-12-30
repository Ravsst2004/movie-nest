import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Providers } from "@/app/store-provider";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`font-poppins antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <section>
              <SidebarProvider>
                <AppSidebar />
                <main className="w-full overflow-x-hidden">
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </section>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
