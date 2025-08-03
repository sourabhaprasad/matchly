import Image from "next/image";
import JobDetailsForm from "./components/JobDetailsForm";
import JobDescriptionInput from "./components/JobDescriptionInput";
import SettingsPanel from "./components/SettingsPanel";
import SkillsMatchPanel from "./components/SkillsMatchPanel";
import CoverLetterOutput from "./components/CoverLetterOutput";
import ResumeUploader from "./components/ResumeUploader";

export default function HomePage() {
  const skillsMatchPercentage = 75;
  const matchedSkills = [
    "React",
    "TypeScript",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
  ];
  const unmatchedSkills = ["Python", "Django", "AWS Lambda"];
  const suggestedSkills = ["GraphQL", "Docker", "Kubernetes"];
  return (
    <main className="min-h-screen bg-muted text-sm">
      {/* Navbar */}
      <nav className="bg-white px-6 py-4 shadow-sm border-b flex items-center gap-2">
        <Image src="/logo.png" alt="Matchly Logo" width={24} height={24} />
        <h1 className="text-xl font-bold">Matchly</h1>
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-6">
        {/* LEFT: Inputs wrapped in one card */}
        {/* className="bg-white rounded-xl p-6 shadow-sm space-y-4 border" */}
        <div className="space-y-4">
          <ResumeUploader />
          <JobDetailsForm />
          <JobDescriptionInput />
          <SettingsPanel />
        </div>

        {/* RIGHT: Output */}
        <div className="space-y-4">
          <CoverLetterOutput />
          <SkillsMatchPanel
            matchPercentage={skillsMatchPercentage}
            matchedSkills={matchedSkills}
            unmatchedSkills={unmatchedSkills}
            suggestedSkills={suggestedSkills}
          />
        </div>
      </div>
    </main>
  );
}
