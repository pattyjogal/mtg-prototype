import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Discord({
      clientId:
        process.env.DISCORD_CLIENT_ID ||
        (() => {
          throw new Error("DISCORD_CLIENT_ID environment variable is not set");
        })(),
      clientSecret:
        process.env.DISCORD_CLIENT_SECRET ||
        (() => {
          throw new Error("DISCORD_CLIENT_SECRET environment variable is not set");
        })(),
    }),
  ],
});
