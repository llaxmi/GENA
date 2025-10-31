"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit3 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SettingsFormData = {
  userName: string;
  email: string;
};

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    defaultValues: {
      userName: "Laxmi",
      email: "laxmi@gmail.com",
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: SettingsFormData) => {
    // You can replace this with your API call or logic
    console.log("Form submitted:", data);
    setIsEditing(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl py-6 space-y-6"
      >
        {/* Profile Section */}
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl font-semibold">
                {watchedValues.userName?.charAt(0) ?? "J"}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    disabled={!isEditing}
                    {...register("userName", {
                      required: "Full name is required",
                    })}
                  />
                  {errors.userName && (
                    <p className="text-xs text-red-500">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    disabled={!isEditing}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className={`bg-white text-red-500 border-red-500  hover:text-red-500 ${
                isEditing ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            {isEditing ? (
              <>
                <Button type="submit" disabled={!isDirty} className="w-16">
                  Save
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-16"
              >
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </form>
    </div>
  );
}
