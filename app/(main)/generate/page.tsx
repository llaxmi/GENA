"use client";

import { MAX_CHARACTERS, Tab, TABS } from "@/components/definations";
import { UploadFile } from "@/components/file-upload";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { QuizOptions } from "@/features/generate/quiz-options";
import {
  DocumentQuizSchemaType,
  TextQuizSchemaType,
} from "@/features/generate/schema";
import GeneratingQuizModal from "@/features/quizset/generating-quiz-modal";
import { Quiz } from "@/lib/generated/prisma";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

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
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          content: data.content,
          numQuestions: data.numQuestions,
          difficulty: data.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as Quiz;
      router.push(`/quiz/${result.id}`);
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
    textForm.reset();
    docForm.reset();
  };

  const handleDocSubmit = async (data: DocumentQuizSchemaType) => {
    if (!data.file) {
      console.error("No file selected");
      return;
    }
    setLoading(true);
    try {
      // Read file content
      const content = await readFileContent(data.file);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          content: content,
          numQuestions: data.numQuestions,
          difficulty: data.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as Quiz;
      router.push(`/quiz/${result.id}`);
      console.log(result);
    } catch (error) {
      console.error("Error processing document:", error);
    }
    setLoading(false);
    docForm.reset();
    textForm.reset();
  };

  // Helper function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve((e.target?.result as string) || "");
      };
      reader.onerror = () => reject(new Error("Failed to read file"));

      if (
        file.type === "text/plain" ||
        file.name.toLowerCase().endsWith(".txt")
      ) {
        reader.readAsText(file);
      } else if (
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        // For PDF files, we'll read as text for now (basic implementation)
        // In a real app, you'd use a PDF parsing library
        reader.readAsText(file);
      } else {
        reject(new Error("Unsupported file type"));
      }
    });
  };

  return (
    <div className="min-h-full flex items-center justify-center w-full max-w-7xl mx-auto">
      <Card className=" w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardContent className="p-6 space-y-4">
          {/* Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <nav className="flex space-x-3 bg-gray-100 rounded-md p-1">
              {TABS.map((tab: Tab) => {
                const Icon = Icons[tab.icon];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-sm font-semibold transition-colors min-w-[90px] justify-center ${
                      isActive
                        ? "bg-white text-blue-600 shadow"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    type="button"
                    disabled={loading}
                  >
                    <Icon className="w-5 h-5" />
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
                onSubmit={textForm.handleSubmit(handleTextSubmit)}
                className="space-y-6"
              >
                <QuizOptions
                  form={
                    textForm as UseFormReturn<
                      TextQuizSchemaType | DocumentQuizSchemaType
                    >
                  }
                />
                <div className="flex flex-col space-y-2 mt-4">
                  <FormField
                    control={textForm.control}
                    name="content"
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Paste your notes or any learning material here..."
                        className="w-full h-72 p-5 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-300 bg-gray-50 text-gray-800 placeholder-gray-400 text-base transition"
                        maxLength={MAX_CHARACTERS}
                        disabled={loading}
                      />
                    )}
                  />
                  <div className="text-right text-xs text-gray-400 font-mono">
                    {textForm.watch("content").length}/{MAX_CHARACTERS}
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-40 self-end"
                  >
                    {loading ? (
                      <Icons.spinner className="w-4 h-4 animate-spin" />
                    ) : (
                      "Generate Quiz"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* --- DOCUMENT FORM --- */}
          {activeTab === "document" && (
            <Form {...docForm}>
              <form
                onSubmit={docForm.handleSubmit(handleDocSubmit)}
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
