"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JobDescriptionInputProps {
  readonly setText: (text: string) => void;
  readonly text: string;
}

export default function JobDescriptionInput({
  setText,
  text,
}: JobDescriptionInputProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const isInputEmpty = !text.trim();

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border relative">
      <h2 className="text-lg font-semibold">Job Description</h2>

      <Textarea
        placeholder="Paste the job description here..."
        className="min-h-[180px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between items-center h-6 mt-4">
        {showSuccess ? (
          <div className="flex items-center text-green-600 text-sm font-medium gap-2">
            Job description saved successfully!
          </div>
        ) : (
          <div />
        )}

        <Button onClick={handleConfirm} disabled={isInputEmpty}>
          Confirm Input
        </Button>
      </div>
    </div>
  );
}
