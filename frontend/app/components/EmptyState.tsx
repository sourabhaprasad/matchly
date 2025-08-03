// components/EmptyState.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function EmptyState() {
  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-sm border-0 bg-white">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gray-100">
          <Sparkles className="w-10 h-10 text-gray-400" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No Results Yet
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Start by uploading your resume and entering the job details to see
          your generated cover letter and skill analysis here.
        </p>
        <ul className="space-y-1 text-sm text-gray-500 mb-6">
          <li>
            <span className="font-medium text-indigo-900 mr-1">1.</span>
            Upload resume or paste content
          </li>
          <li>
            <span className="font-medium text-indigo-900 mr-1">2.</span>
            Enter company and job details
          </li>
          <li>
            <span className="font-medium text-indigo-900 mr-1">3.</span>
            Generate your cover letter
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
