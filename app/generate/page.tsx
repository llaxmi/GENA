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
      // Handle the next step - could navigate to quiz generation results
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardContent className="p-8">
              {/* Tab Navigation and Options */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                  {tabs.map((tab) => {
                    const IconComponent = Icons[tab.icon as keyof typeof Icons];
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowOptions(!showOptions)}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Options
                  <Icons.settings className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Content Area */}
              <div className="space-y-4">
                {activeTab === "text" && (
                  <div className="space-y-4">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste in your notes or other content"
                      className="w-full h-80 p-6 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 bg-gray-50/50"
                      maxLength={MAX_CHARACTERS}
                    />

                    {/* Character Counter */}
                    <div className="flex justify-end">
                      <span className="text-sm text-gray-500">
                        {content.length}/{MAX_CHARACTERS.toLocaleString()}{" "}
                        characters
                      </span>
                    </div>
                  </div>
                )}
                {activeTab === "document" && (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <Icons.upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Upload a document
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                )}
                {/* Next Button */}
                <div className="flex justify-start pt-4">
                  <Button
                    onClick={handleNext}
                    disabled={activeTab === "text" && !content.trim()}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl"
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* Options Panel */}
              {showOptions && (
                <motion.div
                  className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <h4 className="font-medium text-gray-900 mb-4">
                    Quiz Options
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Questions
                      </label>
                      <select className="w-full p-2 border border-gray-200 rounded-lg">
                        <option>5 questions</option>
                        <option>10 questions</option>
                        <option>15 questions</option>
                        <option>20 questions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <select className="w-full p-2 border border-gray-200 rounded-lg">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
