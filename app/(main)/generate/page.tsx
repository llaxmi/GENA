"use client";

import { MAX_CHARACTERS, Tab, TABS } from "@/components/definations";
import { UploadFile } from "@/components/file-upload";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { QuizOptions } from "@/features/generate/quiz-options";
import {
  documentQuizSchema,
  DocumentQuizSchemaType,
  textQuizSchema,
  TextQuizSchemaType,
} from "@/features/generate/schema";
import { GeneratingQuizModal } from "@/features/quizset";
import { Quiz } from "@/lib/generated/prisma";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

export default function GeneratePage() {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("text");
  const [loading, setLoading] = useState(false);

  const textForm = useForm<TextQuizSchemaType>({
    defaultValues: {
      name: "",
      numQuestions: 3,
      difficulty: "easy",
      content: "",
    },
  });

  const docForm = useForm<DocumentQuizSchemaType>({
    defaultValues: {
      name: "",
      numQuestions: 3,
      difficulty: "easy",
    },
  });
  const router = useRouter();

  const handleTextSubmit = async (data: TextQuizSchemaType) => {
    // Validate using schema
    const validationResult = textQuizSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = validationResult.error.issues;
      errors.forEach((error: { message: string }) => {
        toast.error(error.message);
      });
      return;
    }

    const validatedData = validationResult.data;

    setLoading(true);
    try {
      const formDate = new FormData();
      formDate.append("type", "text");
      formDate.append("name", validatedData.name);
      formDate.append("content", validatedData.content);
      formDate.append("numQuestions", validatedData.numQuestions.toString());
      formDate.append("difficulty", validatedData.difficulty);
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formDate,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          errorData.message ||
          `Failed to generate quiz. Please try again.`;
        toast.error(errorMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as Quiz;
      toast.success("Quiz generated successfully!", {
        style: {
          border: "1px solid green",
          padding: "16px",
          color: "green",
        },
        iconTheme: {
          primary: "green",
          secondary: "white",
        },
      });
      router.push(`/quiz/${result.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (
        error instanceof Error &&
        error.message !== `HTTP error! status: ${(error as any).status}`
      ) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      textForm.reset();
      docForm.reset();
    }
  };

  const handleDocSubmit = async (data: DocumentQuizSchemaType) => {
    // Validate using schema
    const validationResult = documentQuizSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = validationResult.error.issues;
      errors.forEach((error: { message: string }) => {
        toast.error(error.message);
      });
      return;
    }

    const validatedData = validationResult.data;

    // Additional file validations
    // Validate file type
    const validFileTypes = ["application/pdf", "text/plain"];
    const validExtensions = [".pdf", ".txt"];
    const fileExtension = validatedData.file.name
      .toLowerCase()
      .substring(validatedData.file.name.lastIndexOf("."));

    if (
      !validFileTypes.includes(validatedData.file.type) &&
      !validExtensions.includes(fileExtension)
    ) {
      toast.error("Please upload a PDF or TXT file");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (validatedData.file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setLoading(true);
    try {
      const textContent = await pdfToText(validatedData.file);

      // Validate extracted content
      if (!textContent || textContent.trim().length < 10) {
        toast.error(
          "The document appears to be empty or contains insufficient content. Please try a different file."
        );
        setLoading(false);
        return;
      }

      // Read file content
      const formDate = new FormData();
      formDate.append("type", "text");
      formDate.append("content", textContent);
      formDate.append(
        "name",
        validatedData.name ?? validatedData.file.name.split(".")[0]
      );
      formDate.append("numQuestions", validatedData.numQuestions.toString());
      formDate.append("difficulty", validatedData.difficulty);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formDate,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.error ||
          errorData.message ||
          `Failed to generate quiz. Please try again.`;
        toast.error(errorMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as Quiz;
      toast.success("Quiz generated successfully!");
      router.push(`/quiz/${result.id}`);
    } catch (error) {
      console.error("Error processing document:", error);
      if (error instanceof Error) {
        if (error.message.includes("pdfToText")) {
          toast.error(
            "Failed to extract text from document. Please ensure it's a valid PDF file."
          );
        } else if (
          error.message !== `HTTP error! status: ${(error as any).status}`
        ) {
          toast.error(
            "An unexpected error occurred while processing the document. Please try again."
          );
        }
      }
    } finally {
      setLoading(false);
      docForm.reset();
      textForm.reset();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="w-full border border-border shadow-lg">
        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <nav className="flex space-x-2 bg-muted rounded-lg p-1.5">
              {TABS.map((tab: Tab) => {
                const Icon = Icons[tab.icon];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[100px] justify-center ${
                      isActive
                        ? "bg-background text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    type="button"
                    disabled={loading}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* --- TEXT FORM --- */}
          {activeTab === "text" && (
            <Form {...textForm}>
              <form
                onSubmit={textForm.handleSubmit(handleTextSubmit, (errors) => {
                  // Handle validation errors
                  Object.keys(errors).forEach((key) => {
                    const error = errors[key as keyof typeof errors];
                    if (error?.message) {
                      toast.error(error.message as string);
                    }
                  });
                })}
                className="space-y-6"
              >
                <QuizOptions
                  form={
                    textForm as UseFormReturn<
                      TextQuizSchemaType | DocumentQuizSchemaType
                    >
                  }
                />
                <div className="flex flex-col space-y-3 mt-4">
                  <FormField
                    control={textForm.control}
                    name="content"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <textarea
                          {...field}
                          placeholder="Paste your notes or any learning material here..."
                          className="w-full h-64 p-4 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-background text-foreground placeholder:text-muted-foreground text-sm transition-colors"
                          maxLength={MAX_CHARACTERS}
                          disabled={loading}
                        />
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-blue-700 italic font-medium">
                            Enter your content to generate quiz questions
                          </p>
                          <div className="text-xs font-mono">
                            {textForm.watch("content").length}/{MAX_CHARACTERS}
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="min-w-[140px]"
                    >
                      {loading ? (
                        <>
                          <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        "Generate Quiz"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          )}

          {/* --- DOCUMENT FORM --- */}
          {activeTab === "document" && (
            <Form {...docForm}>
              <form
                onSubmit={docForm.handleSubmit(handleDocSubmit, (errors) => {
                  // Handle validation errors
                  Object.keys(errors).forEach((key) => {
                    const error = errors[key as keyof typeof errors];
                    if (error?.message) {
                      toast.error(error.message as string);
                    }
                  });
                })}
                className="space-y-6"
              >
                <QuizOptions
                  form={
                    docForm as UseFormReturn<
                      TextQuizSchemaType | DocumentQuizSchemaType
                    >
                  }
                />
                <UploadFile
                  onFileSelect={(file: File) => docForm.setValue("file", file)}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />{" "}
                      Generating...
                    </>
                  ) : (
                    "Generate Quiz"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>

      {loading && (
        <GeneratingQuizModal open={loading} setOpen={() => setLoading(false)} />
      )}
    </div>
  );
}
