import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SkillGapSuggestions({ skills }: { skills: string[] }) {
  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex items-center gap-2">
        <Sparkles className="text-orange-500 w-5 h-5" />
        <h3 className="font-semibold text-base">Skills Gap Suggestions</h3>
      </div>
      <p className="text-gray-600 text-sm">
        Consider highlighting these skills to strengthen your application:
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            className="bg-orange-100 text-orange-700 text-sm font-medium px-2 py-1 rounded-full"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
