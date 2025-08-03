// app/components/JobDetailsForm.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Briefcase, Mail } from "lucide-react";

export default function JobDetailsForm() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm space-y-4 border">
      <h2 className="text-lg font-semibold">Job Details</h2>

      <div className="space-y-1">
        <Label htmlFor="company">Company Name</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input id="company" placeholder="e.g. Google" className="pl-9" />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="role">Job Title</Label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="role"
            placeholder="e.g. Frontend Developer Intern"
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="location">Recipient Name (Optional) </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="location"
            placeholder="Enter the name of hiring manager or recruiter"
            className="pl-9"
          />
        </div>
      </div>
    </div>
  );
}
