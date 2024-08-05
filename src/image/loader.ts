"use client";

import { ImageLoaderProps } from "next/image";

export default function imageLoader({ src }: ImageLoaderProps) {
  return `/api/images/?src=${src}`;
}
