// app/components/ScoreMeter.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ScoreMeter() {
  const score = 85; // Replace with dynamic value later

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">Match Score</h2>
        <Progress value={score} />
        <p className="text-muted-foreground">
          {score}% match with job requirements
        </p>
      </CardContent>
    </Card>
  );
}
