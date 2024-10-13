import { Container, Heading } from "@radix-ui/themes";
import { auth } from "@/auth";
import SideFormCardView from "@/components/SideFormCardView";
import { redirect } from "next/navigation";

export default async function CardEditPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/cards");
  }

  return (
    <Container>
      <Heading mb="8">Create a Card</Heading>
      <SideFormCardView />
    </Container>
  );
}
