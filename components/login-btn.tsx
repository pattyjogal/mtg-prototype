"use client";

import { Button, Flex } from "@radix-ui/themes";
import { signIn, signOut } from "next-auth/react";

export default function LoginButton({ username }: { username?: string | null }) {
  if (username) {
    return (
      <Flex gap="3">
        Welcome, {username} <br />
        <Button onClick={() => signOut()}>Sign Out</Button>
      </Flex>
    );
  }
  return <Button onClick={() => signIn("discord")}>Sign in</Button>;
}
