import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import LoginButton from "./login-btn";
import { auth } from "@/auth";
import NavigationTabs from "./NavigationTabs";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav>
      <Container p="3">
        <Flex direction="row" justify="between">
          <Link href="/" className="text-2xl font-bold">
            The Brewery
          </Link>
          <NavigationTabs />
          <LoginButton user={session?.user} />
        </Flex>
      </Container>
    </nav>
  );
}
