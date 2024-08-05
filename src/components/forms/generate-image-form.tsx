"use client";

import { generateImage } from "@/app/actions/ai";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useTranslations } from "next-intl";

const initialState = {
  error: "",
  message: "",
  url: "",
};

export function GenerateImageForm() {
  let [state, formAction, pending] = useActionState(
    generateImage,
    initialState,
  );

  const t = useTranslations("home");

  const defaultPrompt = `black forest gateau cake spelling out the words "akazwz", tasty, food photography, dynamic shot`;

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 max-w-xl p-2 mx-auto items-center"
    >
      <div className="w-full border rounded-md max-w-md md:max-w-lg aspect-square bg-primary-foreground">
        {pending ? (
          <Skeleton className="size-full flex items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </Skeleton>
        ) : state.url !== "" ? (
          <Image
            src={state.url}
            width={512}
            height={512}
            className="object-cover rounded-md"
            alt="prompt"
          />
        ) : (
          <div></div>
        )}
      </div>
      {state.error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="size-4" />
          <AlertTitle>{state.error}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center w-full space-x-2">
        <Input
          id="propmt"
          name="prompt"
          defaultValue={defaultPrompt}
          required
        />
        <Button type="submit" disabled={pending} className="gap-2">
          {t("generate")}
          {pending ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            <ArrowRightIcon className="size-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
