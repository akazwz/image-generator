import { Octokit } from "@octokit/rest";
import { exchangeWebFlowCode } from "@octokit/oauth-methods";
import { set } from "@/session/session-store";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    throw new Response("Authorization code not found", { status: 400 });
  }
  console.log("client id: ", process.env.GITHUB_CLIENT_ID);
  console.log("client secret: ", process.env.GITHUB_CLIENT_SECRET);
  const result = await exchangeWebFlowCode({
    clientType: "oauth-app",
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  });
  const githubAccessToken = result.authentication.token;

  const octokit = new Octokit({
    auth: githubAccessToken,
  });
  const { data: userData } = await octokit.rest.users.getAuthenticated();
  const { data: emails } =
    await octokit.rest.users.listEmailsForAuthenticatedUser();
  const primaryEmail = emails.find((email) => email.primary);
  const email = primaryEmail ? primaryEmail.email : null;
  if (!email) {
    throw new Response("Primary email not found", { status: 400 });
  }
  await set("githubAccessToken", githubAccessToken, "auth");
  await set("email", email, "auth");
  await set("githubLogin", userData.login, "auth");
  await set("avatarUrl", userData.avatar_url, "auth");
  await set("userData", JSON.stringify(userData), "auth");

  return redirect("/");
}
