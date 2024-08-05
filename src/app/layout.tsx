import { ViewTransitions } from "next-view-transitions";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import ColorSchemaScript from "@/components/color-schema-script";
import "./globals.css";
import Script from "next/script";

export const runtime = "edge";

export async function generateMetadata() {
  const t = await getTranslations("home")
  return {
    title: t("title"),
    description: t("description"),
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const theme = cookies().get("theme")?.value ?? "auto";

  return (
    <ViewTransitions>
      <html lang={locale} className={theme} suppressHydrationWarning>
        <head>
          <ColorSchemaScript isForceMode={theme != "auto"} />
        </head>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <Script
            async
            src="https://u.pexni.com/script.js"
            data-website-id="bd7b521d-b91c-469d-8b87-deba49f080fb"
          />
        </body>
      </html>
    </ViewTransitions>
  );
}
