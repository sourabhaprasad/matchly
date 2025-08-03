"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function JobDescriptionInput() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-3 border">
      <h2 className="text-lg font-semibold">Job Description</h2>

      <Textarea
        placeholder="Paste the job description here..."
        className="min-h-[120px]"
      />

      <div className="flex justify-between">
        <Button variant="outline" className="flex items-center gap-2 text-sm">
          <Upload className="w-4 h-4" />
          Upload JD File
        </Button>
        <Button>Save</Button>
      </div>
    </div>
  );
}
