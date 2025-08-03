"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export default function ResumeUploader() {
  const [inputMethod, setInputMethod] = useState<"file" | "text">("file");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      setResumeText(""); // clear pasted text if file is uploaded
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate a delay or parsing step
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const isValid =
    (inputMethod === "text" && resumeText.trim() !== "") ||
    (inputMethod === "file" && fileName !== "");

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border space-y-5">
      <h2 className="text-lg font-semibold">Upload Your Resume</h2>

      <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-full shadow-inner w-full">
        {["file", "text"].map((method) => (
          <button
            key={method}
            onClick={() => {
              setInputMethod(method as "file" | "text");
              setResumeText("");
              setFileName("");
              setSubmitted(false);
            }}
            className={cn(
              "w-full px-4 py-2 rounded-full text-sm font-medium transition-all",
              inputMethod === method
                ? "bg-white shadow text-black"
                : "bg-transparent text-muted-foreground hover:text-black"
            )}
          >
            {method === "file" ? "Resume File" : "Paste Content"}
          </button>
        ))}
      </div>

      {inputMethod === "file" ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition",
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
          {fileName ? (
            <p className="text-sm font-medium">{fileName}</p>
          ) : (
            <>
              <p className="text-sm">Drag and drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports .doc, .docx, .pdf (max 50 MB)
              </p>
            </>
          )}
        </div>
      ) : (
        <Textarea
          placeholder="Paste your complete resume content here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="min-h-[150px]"
        />
      )}

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!isValid || loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>

      {submitted && (
        <p className="text-green-600 text-sm font-medium">
          Resume submitted successfully!
        </p>
      )}
    </div>
  );
}
