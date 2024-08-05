"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { updateLocale } from "@/app/actions/locale";

export function LanguagesToggle({ locale }: { locale: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm" asChild>
        <Button size="icon" variant="ghost">
          <LanguagesIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={locale === "en"}
          onClick={async () => {
            await updateLocale("en");
          }}
        >
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === "zh"}
          onClick={() => updateLocale("zh")}
        >
          简体中文
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
