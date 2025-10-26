"use client";

import { DashboardLayout } from "@/components/dashboard";
import { UploadFile } from "@/components/file-upload";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

type TextFormData = {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  content: string;
};

type DocumentFormData = {
  numQuestions: number;
  difficulty: "easy" | "medium" | "hard";
  file: File | null;
};

type Tab = {
  id: "text" | "document";
  label: string;
  icon: keyof typeof Icons;
};

const TABS: Tab[] = [
  { id: "text", label: "Text", icon: "textAa" },
  { id: "document", label: "Document", icon: "upload" },
];

const MAX_CHARACTERS = 25000;

export default function GeneratePage() {
  const [activeTab, setActiveTab] = useState<Tab["id"]>("text");

  const textForm = useForm<TextFormData>({
    defaultValues: { numQuestions: 5, difficulty: "easy", content: "" },
  });

  const docForm = useForm<DocumentFormData>({
    defaultValues: { numQuestions: 5, difficulty: "easy", file: null },
  });

  const handleTextSubmit = async (data: TextFormData) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          numQuestions: data.numQuestions,
          difficulty: data.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.questions) {
        console.log("Generated Questions:", result.questions);
        // Log each question with its options
        result.questions.forEach((question: any, index: number) => {
          console.log(`\nQuestion ${index + 1}: ${question.question}`);
          console.log(`A) ${question.options.A}`);
          console.log(`B) ${question.options.B}`);
          console.log(`C) ${question.options.C}`);
          console.log(`D) ${question.options.D}`);
          console.log(`Correct Answer: ${question.correctAnswer}`);
          console.log(`Explanation: ${question.explanation}`);
        });
      } else {
        console.error("Failed to generate questions:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    textForm.reset();
    docForm.reset();
  };

  const handleDocSubmit = async (data: DocumentFormData) => {
    if (!data.file) {
      console.error("No file selected");
      return;
    }

    try {
      // Read file content
      const content = await readFileContent(data.file);

      const response = await fetch("https://localhost:3000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          numQuestions: data.numQuestions,
          difficulty: data.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.questions) {
        console.log("Generated Questions from Document:", result.questions);
        // Log each question with its options
        result.questions.forEach((question: any, index: number) => {
          console.log(`\nQuestion ${index + 1}: ${question.question}`);
          console.log(`A) ${question.options.A}`);
          console.log(`B) ${question.options.B}`);
          console.log(`C) ${question.options.C}`);
          console.log(`D) ${question.options.D}`);
          console.log(`Correct Answer: ${question.correctAnswer}`);
          console.log(`Explanation: ${question.explanation}`);
        });
      } else {
        console.error("Failed to generate questions:", result.error);
      }
    } catch (error) {
      console.error("Error processing document:", error);
    }

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
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-white to-blue-50 px-6 py-12">
        <Card className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-100">
          <CardContent className="p-10 space-y-10">
            {/* Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <nav className="flex space-x-3 bg-gray-100 rounded-md p-1">
                {TABS.map((tab) => {
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
                  <QuizOptions form={textForm} />
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
                        />
                      )}
                    />
                    <div className="text-right text-xs text-gray-400 font-mono">
                      {textForm.watch("content").length}/{MAX_CHARACTERS}
                    </div>
                    <Button type="submit" className="w-full">
                      Generate Quiz
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
                  <QuizOptions form={docForm} />
                  <UploadFile
                    onFileSelect={(file: File) =>
                      docForm.setValue("file", file)
                    }
                  />
                  <Button type="submit" className="w-full">
                    Generate Quiz
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function QuizOptions({ form }: { form: ReturnType<typeof useForm<any>> }) {
  return (
    <motion.div
      className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
    >
      <h4 className="font-semibold text-gray-900 mb-6 text-lg">
        Quiz Preferences
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="numQuestions"
          render={({ field }) => (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <select
                {...field}
                className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n} questions
                  </option>
                ))}
              </select>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                {...field}
                className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                {["easy", "medium", "hard"].map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
}
