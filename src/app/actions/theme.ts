"use server";

import { cookies } from "next/headers";

export async function updateTheme(theme: string) {
  cookies().set("theme", theme);
}
