"use client";

import { Avatar, Button, Flex } from "@radix-ui/themes";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function LoginButton({ user }: { user?: User }) {
  if (user?.name) {
    return (
      <Flex gap="3" align="center">
        <Avatar src={user.image || undefined} fallback={user.name[0]} /> {user?.name} <br />
        <Button onClick={() => signOut()}>Sign Out</Button>
      </Flex>
    );
  }
  return <Button onClick={() => signIn("discord")}>Sign in</Button>;
}
