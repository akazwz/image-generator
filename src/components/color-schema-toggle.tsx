"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { Theme } from "@/app/page";
import { updateTheme } from "@/app/actions/theme";
import { useTranslations } from "next-intl";

export function ColorSchemaToggle({ theme }: { theme: Theme }) {
  const t = useTranslations("colorSchema");

  const icons = {
    auto: <SunMoonIcon />,
    dark: <MoonIcon />,
    light: <SunIcon />,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm" asChild>
        <Button size="icon" variant="ghost">
          {icons[theme]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            await updateTheme("auto");
            window.location.reload();
          }}
        >
          {t("system")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateTheme("light")}>
          {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => updateTheme("dark")}>
          {t("dark")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
