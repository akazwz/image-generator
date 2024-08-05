"use client";

import { updateTheme } from "@/app/actions/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

export function UpdateThemeForm({ theme }: { theme: string }) {
  const t = useTranslations("theme");

  return (
    <Label className="flex items-center">
      <span>{t("theme")}</span>
      <div className="flex-1" />
      <Select
        name="theme"
        defaultValue={theme}
        onValueChange={async (e) => {
          await updateTheme(e.valueOf());
          if (e.valueOf() === "auto") {
            window.location.reload();
          }
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("theme")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem itemType="submit" value="light">
            {t("light")}
          </SelectItem>
          <SelectItem value="dark">{t("dark")}</SelectItem>
          <SelectItem value="auto">{t("system")}</SelectItem>
        </SelectContent>
      </Select>
    </Label>
  );
}
