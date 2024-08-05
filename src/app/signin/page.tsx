import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function SignIn() {
  const t = await getTranslations("signin");

  const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email public_repo`;

  return (
    <div className="w-full h-dvh lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("signin")}</h1>
            <p className="text-balance text-muted-foreground">{t("welcome")}</p>
          </div>
          <div className="grid gap-4">
            <Link
              href={githubLoginUrl}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "w-full gap-2",
              )}
            >
              <GitHubLogoIcon />
              {t("github")}
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/cute-dog.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
