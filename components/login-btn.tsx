import { auth, signIn, signOut } from "@/auth";

export default async function LoginButton() {
  const session = await auth();
  if (session?.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign Out</button>
        </form>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <form
        action={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}
