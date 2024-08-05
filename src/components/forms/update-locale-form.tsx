"use client";

import { updateLocale } from "@/app/actions/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

export function UpdateLocaleForm({ locale }: { locale: string }) {
  const t = useTranslations("locale");

  return (
    <Label className="flex items-center">
      <span>{t("locale")}</span>
      <div className="flex-1" />
      <Select
        name="locale"
        defaultValue={locale}
        onValueChange={async (e) => {
          await updateLocale(e.valueOf());
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("locale")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem itemType="submit" value="en">
            {t("en")}
          </SelectItem>
          <SelectItem value="zh">{t("zh")}</SelectItem>
        </SelectContent>
      </Select>
    </Label>
  );
}
