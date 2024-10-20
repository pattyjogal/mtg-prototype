"use client";

import { Button } from "@radix-ui/themes";

interface DeleteButtonProps {
  deleteAction(): void;
}

export default function DeleteButton({ deleteAction }: DeleteButtonProps) {
  return (
    <Button variant="solid" color="red" onClick={() => deleteAction()}>
      Delete
    </Button>
  );
}
