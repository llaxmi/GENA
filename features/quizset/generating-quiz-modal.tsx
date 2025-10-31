import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { InfinityLoader } from "./generating-loader";

const generatingText = [
  "Generating",
  "Preparing",
  "Almost there",
  "Finalizing",
  "Almost done",
  "Hold on",
  "Just a moment",
];

export default function GeneratingQuizModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % generatingText.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="w-1/6 p-4 [&>button]:hidden"
      >
        <DialogHeader>
          <DialogTitle className="text-center ">
            {generatingText[index]}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center mt-2">
          <div className="flex min-h-[20px] w-min items-center justify-center bg-background">
            <InfinityLoader
              size={50}
              className="[&>svg>path:last-child]:stroke-blue-700"
            />
          </div>
        </div>
        <DialogDescription className="text-center text-sm">
          We are generating the quiz for you. This may take a few seconds.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
