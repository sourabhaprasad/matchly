"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
  file: File | null;
  setFile: (f: File | null) => void;
  text: string;
  setText: (t: string) => void;
}

export default function ResumeUploader({
  file,
  setFile,
  text,
  setText,
}: ResumeUploaderProps) {
  const [inputMethod, setInputMethod] = useState<"file" | "text">(
    file ? "file" : "text"
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    if (inputMethod === "file") {
      setText("");
    } else {
      setFile(null);
    }
  }, [inputMethod, setFile, setText]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setText("");
        setSubmitted(false);
      }
    },
    [setFile, setText]
  );

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
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  const isValid =
    (inputMethod === "text" && text.trim() !== "") ||
    (inputMethod === "file" && file !== null);

  return (
    <div className="space-y-3 p-5">
      <h2 className="text-lg font-semibold">Upload Your Resume</h2>

      <div className="grid grid-cols-2 gap-2 bg-muted p-1 rounded-full shadow-inner w-full">
        {["file", "text"].map((method) => (
          <button
            key={method}
            onClick={() => setInputMethod(method as "file" | "text")}
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
          <Upload className="mx-auto mb-2 h-12 w-6 text-muted-foreground" />
          {file ? (
            <p className="text-sm font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-sm">Drag and drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports .doc, .docx, .pdf (max 10 MB)
              </p>
            </>
          )}
        </div>
      ) : (
        <Textarea
          placeholder="Paste your complete resume content here..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSubmitted(false);
          }}
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
            "Confirm Input"
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
