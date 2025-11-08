"use client";

import { DashboardLayout } from "@/components/dashboard";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GeneratePage() {
  const [activeTab, setActiveTab] = useState("text");
  const [content, setContent] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const MAX_CHARACTERS = 25000;

  const tabs = [
    { id: "text", label: "Text", icon: "fileText" },
    { id: "document", label: "Document", icon: "upload" },
  ];

  const handleNext = () => {
    if (content.trim()) {
      console.log("Processing content:", content);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 px-6 py-12">
        <Card className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-gray-100">
          <CardContent className="p-10 space-y-10">
            {/* Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <nav className="flex space-x-3 bg-gray-100 rounded-md p-1">
                {tabs.map((tab) => {
                  const Icon = Icons[tab.icon as keyof typeof Icons];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-md text-sm font-semibold transition-colors min-w-[80px] justify-center ${
                        activeTab === tab.id
                          ? "bg-white text-blue-600 shadow"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <Button
                variant="outline"
                onClick={() => setShowOptions(!showOptions)}
                className="border-gray-200 hover:bg-gray-50 flex items-center gap-2 text-sm rounded-md max-w-[100px] justify-center px-3"
                aria-expanded={showOptions}
              >
                Options
                <Icons.settings className="w-4 h-4" />
              </Button>
            </div>

            {/* Content Area */}
            {activeTab === "text" ? (
              <div className="flex flex-col space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your notes, paragraphs, or any learning material here..."
                  className="w-full h-72 p-5 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 bg-gray-50 text-gray-800 placeholder-gray-400 text-base transition"
                  maxLength={MAX_CHARACTERS}
                  aria-label="Text input for quiz content"
                />
                <div className="text-right text-xs text-gray-400 font-mono tracking-wide select-none">
                  {content.length}/{MAX_CHARACTERS.toLocaleString()} characters
                </div>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-16 flex flex-col items-center justify-center text-center bg-gray-50 hover:border-blue-400 transition-colors"
                aria-label="Upload document area"
              >
                <Icons.upload className="w-12 h-12 text-gray-400 mb-4" />
                <span className="font-semibold text-gray-700 mb-1">
                  Upload a document
                </span>
                <span className="text-sm text-gray-500">
                  PDF, DOCX, or TXT formats supported
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    console.log(e.target.files);
                  }}
                />
              </label>
            )}

            {/* Options Panel */}
            {showOptions && (
              <motion.div
                className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                aria-live="polite"
              >
                <h4 className="font-semibold text-gray-900 mb-6 text-lg">
                  Quiz Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="num-questions"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Number of Questions
                    </label>
                    <select
                      id="num-questions"
                      className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      {[5, 10, 15, 20].map((n) => (
                        <option key={n} value={n}>
                          {n} questions
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="difficulty"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Difficulty
                    </label>
                    <select
                      id="difficulty"
                      className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                      {["Easy", "Medium", "Hard"].map((d) => (
                        <option key={d} value={d.toLowerCase()}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Button */}
            <div className="pt-8 flex justify-center">
              <Button
                onClick={handleNext}
                disabled={activeTab === "text" && !content.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md shadow-lg transition max-w-[140px]"
                aria-disabled={activeTab === "text" && !content.trim()}
              >
                Generate Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
