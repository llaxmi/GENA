import React from "react";
import { Button } from "./ui/button";

interface PrimaryButtonProps extends React.ComponentProps<typeof Button> {
  title: string;
}
export default function PrimaryButton({ title, ...props }: PrimaryButtonProps) {
  return (
    <Button variant="primary" {...props}>
      {title}
    </Button>
  );
}
