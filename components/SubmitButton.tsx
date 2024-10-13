"use client";

import { Button } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: ReactNode;
  loading: ReactNode;
}

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? loading : label}
    </Button>
  );
};

export default SubmitButton;
