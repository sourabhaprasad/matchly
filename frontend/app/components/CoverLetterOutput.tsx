"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useState } from "react";

export default function CoverLetterOutput() {
  const [coverLetter, setCoverLetter] = useState("");

  const isEmpty = coverLetter.trim() === "";

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
            <Textarea value={coverLetter} readOnly className="min-h-[200px]" />
            <div className="flex gap-2 justify-end">
              <Button variant="secondary">Copy</Button>
              <Button>Download PDF</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
