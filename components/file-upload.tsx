import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
    setPreviewUrl(null);
    return undefined;
  }, [file]);

  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2 shadow-sm border border-gray-200 mb-2 animate-fade-in">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-md border border-gray-200"
        />
      ) : (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md text-gray-500 text-xl">
          <span role="img" aria-label="file">
            {file.type === "text/plain" ||
            file.name.toLowerCase().endsWith(".txt")
              ? "📝"
              : file.type === "application/pdf" ||
                file.name.toLowerCase().endsWith(".pdf")
              ? "📄"
              : "📄"}
          </span>
        </div>
      )}
      <div className="flex-1 truncate">
        <div className="font-medium text-gray-800 truncate">{file.name}</div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 px-2 py-1 text-xs flex items-center gap-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition border border-red-200 shadow-sm"
        aria-label="Remove file"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white animate-fade-in ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    }`}
    role="alert"
  >
    <div className="flex items-center gap-2">
      {type === "success" ? "✅" : "❌"}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-white/80 hover:text-white text-lg"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  </div>
);

export const UploadFile = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const fileArr = Array.from(files);
    // Filter for only text and PDF files
    const validFiles = fileArr.filter((file) => {
      const isValidType =
        file.type === "text/plain" ||
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".txt") ||
        file.name.toLowerCase().endsWith(".pdf");

      if (!isValidType) {
        setToast({
          message: `File "${file.name}" is not supported. Please upload only .txt or .pdf files.`,
          type: "error",
        });
        return false;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setToast({
          message: `File "${file.name}" is too large. Maximum size is 5MB.`,
          type: "error",
        });
        return false;
      }

      return true;
    });

    setSelectedFiles((prev) => [
      ...prev,
      ...validFiles.filter(
        (f) => !prev.some((p) => p.name === f.name && p.size === f.size)
      ),
    ]);
    onFileSelect(validFiles[0]);
    setSelectedFiles(validFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(event.target.files);
    }
    // Reset input value so the same file can be selected again
    event.target.value = "";
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    // Also reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Function to read text file content
  const readTextFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve((e.target?.result as string) || "");
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  // Function to read PDF file content (basic implementation)
  const readPDFFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // For now, we'll return a placeholder since PDF parsing requires additional libraries
        // In a real implementation, you'd use a library like pdf-parse or pdfjs-dist
        resolve(
          "PDF content extraction requires additional libraries. Please use text files for now."
        );
      };
      reader.onerror = () => reject(new Error("Failed to read PDF file"));
      reader.readAsArrayBuffer(file);
    });
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setProgress(0);

    try {
      // Read content from all files
      const fileContents = await Promise.all(
        selectedFiles.map(async (file) => {
          const isTextFile =
            file.type === "text/plain" ||
            file.name.toLowerCase().endsWith(".txt");
          const content = isTextFile
            ? await readTextFile(file)
            : await readPDFFile(file);

          return {
            fileName: file.name,
            fileType: file.type,
            content: content,
          };
        })
      );

      // Console log the submitted values
      console.log("Submitted file contents:", fileContents);

      // Log each file's content for debugging
      fileContents.forEach((fileContent, index) => {
        console.log(`\nFile ${index + 1}: ${fileContent.fileName}`);
        console.log(
          `Content preview: ${fileContent.content.substring(0, 200)}...`
        );
      });

      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setToast({
              message: "Files processed successfully!",
              type: "success",
            });
            setSelectedFiles([]);
            return 100;
          }
          return prev + 10;
        });
      }, 120);
    } catch (error) {
      console.error("Error reading files:", error);
      setUploading(false);
      setToast({
        message: "Error processing files. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col  px-4 w-full">
      <div className="w-full animate-fade-in space-y-8">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          aria-label="File input"
          multiple
          accept=".txt,.pdf,text/plain,application/pdf"
        />
        <div
          className={`w-full flex flex-col border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer mt-4 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-400"
          }`}
          style={{ minHeight: 120 }}
          onClick={handleButtonClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center py-6">
            <span className="text-4xl mb-2">📁</span>
            <span className="text-gray-700 font-medium">
              Drag & drop files here, or{" "}
              <span className="text-blue-600 underline">browse</span>
            </span>
            <span className="text-xs text-gray-400 mt-1">
              (PDF, TXT etc. up to 5MB each)
            </span>
          </div>
        </div>
        {selectedFiles.length === 1 && (
          <div className="mb-4">
            <FilePreview
              file={selectedFiles[0]}
              onRemove={() => handleRemoveFile(0)}
            />
          </div>
        )}
        {selectedFiles.length > 1 && (
          <div className="mb-4" style={{ maxHeight: 180, overflowY: "auto" }}>
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, idx) => (
                <>
                  <span className="truncate max-w-[120px] text-xs">
                    {file.name}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handleRemoveFile(idx)}
                    className="ml-2 p-0.5 rounded-full hover:bg-red-100 text-red-600 transition border border-transparent focus:outline-none focus:ring-2 focus:ring-red-200"
                    aria-label="Remove file"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </>
              ))}
            </div>
          </div>
        )}
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden animate-fade-in">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease;
        }
      `}</style>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
