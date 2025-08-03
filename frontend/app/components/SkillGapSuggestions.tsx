import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SkillGapSuggestions({ skills }: { skills: string[] }) {
  return (
    <div className="p-4 border rounded-lg space-y-3 max-w-full">
      <div className="flex items-center gap-2">
        <Sparkles className="text-orange-500 w-5 h-5 shrink-0" />
        <h3 className="font-semibold text-base">Skills Gap Suggestions</h3>
      </div>
      <p className="text-gray-600 text-sm">
        Emphasize these strong matches to increase your relevance for the role:
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill}
            className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-xl break-words whitespace-normal leading-snug max-w-[12rem] text-left"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
