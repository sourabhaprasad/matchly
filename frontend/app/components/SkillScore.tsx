import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface SkillScoreProps {
  readonly matchPercentage: number;
}

export default function SkillScore({ matchPercentage }: SkillScoreProps) {
  let badgeLabel: string;
  let badgeClass: string;
  let summaryText: string;

  if (matchPercentage >= 80) {
    badgeLabel = "Excellent Match";
    badgeClass = "bg-green-100 text-green-800";
    summaryText =
      "Your resume demonstrates a strong alignment with the job's required skills.";
  } else if (matchPercentage >= 60) {
    badgeLabel = "Good Match";
    badgeClass = "bg-yellow-100 text-yellow-800";
    summaryText =
      "Your resume meets many of the key skill requirements for this role.";
  } else if (matchPercentage >= 40) {
    badgeLabel = "Moderate Match";
    badgeClass = "bg-orange-100 text-orange-800";
    summaryText =
      "Your resume reflects some overlap with the required skills, but may benefit from further alignment.";
  } else {
    badgeLabel = "Low Match";
    badgeClass = "bg-red-100 text-red-800";
    summaryText =
      "Your resume shows limited overlap with the required skills for this position.";
  }

  return (
    <div className="space-y-2 border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Star className="text-yellow-500 w-5 h-5" />
        <span className="text-lg font-semibold">Match Score</span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold">{matchPercentage.toFixed(2)}%</p>
        <Badge
          className={`${badgeClass} text-sm font-medium px-3 py-1 rounded-full`}
        >
          {badgeLabel}
        </Badge>
      </div>

      <Progress value={matchPercentage} className="h-3 bg-gray-200" />
      <p className="text-gray-600 text-sm">{summaryText}</p>
    </div>
  );
}
