import { auth, signIn, signOut } from "@/auth";
import { Button, Flex } from "@radix-ui/themes";

export default async function LoginButton() {
  const session = await auth();
  if (session?.user) {
    return (
      <Flex gap="3">
        Welcome, {session.user.name} <br />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Sign Out</Button>
        </form>
      </Flex>
    );
  }
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        <Button>Sign in</Button>
      </form>
    </div>
  );
}
