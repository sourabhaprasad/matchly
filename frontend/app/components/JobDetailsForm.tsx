"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Briefcase, Mail } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface JobDetails {
  company?: string;
  job_title?: string;
  hiring_manager?: string;
}

interface JobDetailsFormProps {
  readonly details: JobDetails;
  readonly setDetails: Dispatch<SetStateAction<JobDetails>>;
}

export default function JobDetailsForm({
  details,
  setDetails,
}: JobDetailsFormProps) {
  return (
    <div className="space-y-3 p-5">
      <h2 className="text-lg font-semibold">Job Details</h2>

      <div className="space-y-1">
        <Label htmlFor="company">Company Name</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="company"
            placeholder="e.g. Google"
            className="pl-9"
            value={details.company || ""}
            onChange={(e) =>
              setDetails({ ...details, company: e.target.value })
            }
          />
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
            value={details.job_title || ""}
            onChange={(e) =>
              setDetails({ ...details, job_title: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="hiring_manager">Recipient Name (Optional)</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="hiring_manager"
            placeholder="Enter the name of hiring manager or recruiter"
            className="pl-9"
            value={details.hiring_manager || ""}
            onChange={(e) =>
              setDetails({ ...details, hiring_manager: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
