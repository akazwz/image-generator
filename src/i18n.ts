import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export default getRequestConfig(async () => {
  let locale = cookies().get("locale")?.value;
  if (!locale) {
    const languages = new Negotiator({
      headers: {
        "accept-language": headers().get("accept-language") || "",
      },
    }).languages();
    const locales = ["en", "zh"];
    locale = match(languages, locales, "en");
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
