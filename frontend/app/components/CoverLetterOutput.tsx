"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Check, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface CoverLetterOutputProps {
  text: string;
  setText?: (text: string) => void; // Optional if you want to lift state
}

export default function CoverLetterOutput({
  text: initialText,
  setText,
}: CoverLetterOutputProps) {
  const [copied, setCopied] = useState(false);
  const [text, updateText] = useState(initialText || "");

  const isEmpty = text.trim() === "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("Times", "Normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, 20, 20);
    doc.save("cover_letter.pdf");
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Generated Cover Letter</h2>
        </div>

        {isEmpty ? (
          <div className="min-h-[200px] flex flex-col items-center justify-center text-center rounded-md border border-muted">
            <FileText className="w-10 h-10 text-muted-foreground/30 mb-4" />
            <p className="text-sm text-muted-foreground px-6">
              Your generated cover letter will appear here.
              <br />
              Fill in the job details and click{" "}
              <strong>"Generate Cover Letter"</strong> to get started.
            </p>
          </div>
        ) : (
          <>
            <Textarea
              value={text}
              onChange={(e) => {
                updateText(e.target.value);
                setText?.(e.target.value);
              }}
              className="min-h-[200px]"
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={handleCopy} variant="secondary">
                {copied ? <Check className="h-4 w-4 mr-1" /> : null}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button onClick={handleDownload}>
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
