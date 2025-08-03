import { XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UnmatchedSkills({ skills }: { skills: string[] }) {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        <XCircle className="text-red-600 w-5 h-5" />
        <h3 className="font-semibold text-base">Unmatched Skills</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            className="bg-red-100 text-red-700 text-sm font-medium px-2 py-1 rounded-full"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
