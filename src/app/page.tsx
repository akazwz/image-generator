import { Link } from "next-view-transitions";
import { ArrowRightIcon, BinaryIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ColorSchemaToggle } from "@/components/color-schema-toggle";
import { cookies } from "next/headers";
import { LanguagesToggle } from "@/components/languages-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GenerateImageForm } from "@/components/forms/generate-image-form";
import { get } from "@/session/session-store";
import { getTranslations } from "next-intl/server";
import { UserMenu } from "@/components/user-menu";

export const runtime = "edge";

export type Theme = "auto" | "dark" | "light";

export default async function Index() {
  const githubLogin = (await get("githubLogin", "auth")) as string | null;
  const avatarUrl = (await get("avatarUrl", "auth")) as string;

  const theme = (cookies().get("theme")?.value ?? "auto") as Theme;
  const locale = cookies().get("locale")?.value ?? "en";

  const t = await getTranslations("home");

  return (
    <div className="flex flex-col min-h-dvh">
      <header
        className="flex items-center sticky top-0 p-4 gap-4 bg-primary-foreground/90 font-semibold"
        style={{
          backdropFilter: "blur(4px)",
        }}
      >
        <Link
          href="/"
          className={buttonVariants({
            variant: "link",
          })}
        >
          <BinaryIcon className="size-10" />
        </Link>
        <nav className="flex gap-8 flex-1 items-center justify-center"></nav>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/akazwz/image-generator"
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "link",
                size: "icon",
              }),
            )}
          >
            <GitHubLogoIcon className="size-6" />
          </Link>
          <LanguagesToggle locale={locale} />
          <ColorSchemaToggle theme={theme} />
          {githubLogin ? (
            <UserMenu username={githubLogin} avatarUrl={avatarUrl} />
          ) : (
            <Link
              href="/signin"
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
              )}
            >
              {t("signin")}
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </div>
      </header>
      <div
        className="pt-8 w-full"
        style={
          {
            // backgroundImage: "url('/bubbles.svg')",
          }
        }
      >
        {/* hero section */}
        <div className="mx-auto text-center px-12">
          <h1 className="text-5xl font-bold p-4">{t("title")}</h1>
          <p className="text-sm max-w-xl mx-auto">{t("description")}</p>
        </div>
        <GenerateImageForm />
      </div>
    </div>
  );
}
