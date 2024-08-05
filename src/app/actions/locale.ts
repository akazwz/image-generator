"use server";

import { cookies } from "next/headers";

export async function updateLocale(locale: string) {
  cookies().set("locale", locale);
}
