"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface JobDescriptionInputProps {
  setText: (text: string) => void;
  text: string;
}

export default function JobDescriptionInput({
  setText,
  text,
}: JobDescriptionInputProps) {
  const isInputEmpty = !text.trim();

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border">
      <h2 className="text-lg font-semibold">Job Description</h2>

      <Textarea
        placeholder="Paste the job description here..."
        className="min-h-[180px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-end">
        <Button disabled={isInputEmpty}>Confirm Input</Button>
      </div>
    </div>
  );
}
