"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutDialog({ isOpen, onClose }: LogoutDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogOut className="w-6 h-6 text-red-600" />
            <span>Sign Out</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out? You'll need to sign in again to
            access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant="outline"
            className="flex-1 text-red-600 border border-red-600 hover:bg-red-50 hover:text-red-600"
          >
            {isLoading ? (
              <>
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                Signing out...
              </>
            ) : (
              "Sign Out"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
