"use server";

import { clearSessionId } from "@/session/session-id";

export async function signOut() {
  clearSessionId();
}
