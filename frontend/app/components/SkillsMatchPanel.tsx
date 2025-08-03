"use client";

import { Card, CardContent } from "@/components/ui/card";
import SkillScore from "./SkillScore";
import MatchedSkills from "./MatchedSkills";
import UnmatchedSkills from "./UnmatchedSkills";
import SkillGapSuggestions from "./SkillGapSuggestions";
import { BarChart2 } from "lucide-react";

interface SkillsMatchPanelProps {
  matchPercentage: number;
  matchedSkills: string[];
  unmatchedSkills: string[];
  suggestedSkills: string[];
}

export default function SkillsMatchPanel({
  matchPercentage,
  matchedSkills,
  unmatchedSkills,
  suggestedSkills,
}: SkillsMatchPanelProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-600" />
          Skills Match Overview
        </h1>
        <SkillScore matchPercentage={matchPercentage} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MatchedSkills skills={matchedSkills} />
          <UnmatchedSkills skills={unmatchedSkills} />
        </div>
        <SkillGapSuggestions skills={suggestedSkills} />
      </CardContent>
    </Card>
  );
}
