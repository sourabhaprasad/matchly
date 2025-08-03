"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function SettingsPanel() {
  return (
    <Card>
      <CardContent className="space-y-6 p-4">
        <h2 className="text-lg font-semibold">Generation Settings</h2>

        {/* Tone Selector */}
        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone for cover letter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="matched-skills">Include Matched Skills</Label>
            <Switch id="matched-skills" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="unmatched-skills">Include Unmatched Skills</Label>
            <Switch id="unmatched-skills" />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="include-summary">Include Summary</Label>
            <Switch id="include-summary" />
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Cover Letter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
