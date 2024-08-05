"use server";

import { getTranslations } from "next-intl/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import Replicate from "replicate";
import * as z from "zod";
import { get } from "@/session/session-store";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prevState: any, formData: FormData) {
  const t = await getTranslations("server");
  try {
    const githubLogin = (await get("githubLogin", "auth")) as string | null;
    if (!githubLogin) {
      return {
        error: t("error"),
        message: t("needAuth"),
        url: "",
      };
    }
    const rateLimitResult = await ratelimit.limit(githubLogin);
    if (!rateLimitResult.success) {
      return {
        error: t("error"),
        message: t("rateLimit"),
        url: "",
      };
    }
    const { success, data } = z
      .object({
        prompt: z.string().min(1),
      })
      .safeParse(Object.fromEntries(formData.entries()));
    if (!success) {
      return {
        error: t("error"),
        message: t("invalidPrompt"),
        url: "",
      };
    }
    const input = {
      prompt: data.prompt,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 90,
    };
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input,
    });
    const url = output as unknown as string;
    return {
      error: "",
      url,
    };
  } catch (error: any) {
    return {
      error: t("error"),
      message: t("tryLater"),
      url: "",
    };
  }
}
