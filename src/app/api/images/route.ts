export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src") as string;
  return fetch(src);
}
