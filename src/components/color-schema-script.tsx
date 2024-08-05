import { useMemo } from "react";

export default function ColorSchemaScript({
  isForceMode,
}: {
  isForceMode: boolean;
}) {
  let script = useMemo(
    () => `
            const isAuto = document.documentElement.classList.contains("auto")

            if (isAuto) {
                const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
                document.documentElement.classList.remove("dark")
                document.documentElement.classList.remove("light")
                document.documentElement.classList.add(theme)
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    document.documentElement.classList.remove("dark")
                    document.documentElement.classList.remove("light")
                    document.documentElement.classList.add(e.matches ? "dark" : "light")
                })
            }
        `,
    [],
  );

  return isForceMode ? null : (
    <script dangerouslySetInnerHTML={{ __html: script }} />
  );
}
