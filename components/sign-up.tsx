"use client";

import { signIn, signUp } from "@/lib/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

const AuthModal = ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => {
  const id = useId();
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user starts typing
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (activeTab === "signup") {
        const res = await signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        console.log("Sign up successful:", res);

        setFormData({ name: "", email: formData.email, password: "" });

        setActiveTab("signin");

        setError("");
      } else {
        const res = await signIn.email({
          email: formData.email,
          password: formData.password,
        });
        console.log("Sign in successful:", res);
        router.push("/dashboard");
        onClose();
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      setError(error?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={onClose}>
      <DialogContent>
        {/* Logo and Tab Header */}
        <div className="flex flex-col items-center font-secondary">
          <Image
            src="/favicon.ico"
            alt="GENA"
            width={100}
            height={100}
            className="w-30 h-30"
          />

          {/* Tabs */}
          <div className="mt-4 flex w-full justify-center gap-6 border-b border-border pb-2 text-sm font-medium">
            <button
              className={`pb-1 ${
                activeTab === "signup"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => {
                setActiveTab("signup");
                setError("");
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              Sign Up
            </button>
            <button
              className={`pb-1 ${
                activeTab === "signin"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={() => {
                setActiveTab("signin");
                setError("");
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Form Section */}
        <DialogHeader className="mt-2 text-center">
          <DialogTitle>
            {activeTab === "signup" ? "Sign up to GENA" : "Welcome back"}
          </DialogTitle>
          <DialogDescription>
            {activeTab === "signup"
              ? "We just need a few details to get you started."
              : "Enter your credentials to access your account."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {activeTab === "signup" && (
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Full name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Your full name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@mail.com"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : activeTab === "signup"
              ? "Sign up"
              : "Sign in"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {activeTab === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signin");
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-primary"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("signup");
                    setError("");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-primary"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
