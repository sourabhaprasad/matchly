import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface SkillScoreProps {
  readonly matchPercentage: number;
}

export default function SkillScore({ matchPercentage }: SkillScoreProps) {
  let badgeLabel: string;
  if (matchPercentage >= 80) {
    badgeLabel = "Excellent Match";
  } else if (matchPercentage >= 60) {
    badgeLabel = "Good Match";
  } else {
    badgeLabel = "Needs Improvement";
  }

  return (
    <div className="space-y-2 border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Star className="text-yellow-500 w-5 h-5" />
        <span className="text-lg font-semibold">Match Score</span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{matchPercentage}%</p>
        <Badge className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
          {badgeLabel}
        </Badge>
      </div>

      <Progress value={matchPercentage} className="h-3 bg-gray-200" />
      <p className="text-gray-600 text-sm">
        Your resume shows strong alignment with the job requirements
      </p>
    </div>
  );
}
