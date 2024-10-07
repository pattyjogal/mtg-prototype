import { Button, Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import LoginButton from "./login-btn";

export default function Navbar() {
  return (
    <nav>
      <Container p="3">
        <Flex direction="row" justify="between">
          <Link href="/" className="text-2xl font-bold">
            The Brewery
          </Link>

          <Flex gap="3">
            <Button>
              <Link href="/">Dashboard</Link>
            </Button>
            <Button>
              <Link href="/about">Precons</Link>
            </Button>
            <Button>
              <Link href="/services">Cards</Link>
            </Button>
            <Button>
              <Link href="/contact">Sets</Link>
            </Button>
          </Flex>
          <LoginButton />
        </Flex>
      </Container>
    </nav>
  );
}
