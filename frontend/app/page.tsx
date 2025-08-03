"use client";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import JobDetailsForm from "./components/JobDetailsForm";
import JobDescriptionInput from "./components/JobDescriptionInput";
import ResumeUploader from "./components/ResumeUploader";
import { submitResumeData } from "@/lib/api";
import CoverLetterOutput from "./components/CoverLetterOutput";
import SkillsMatchPanel from "./components/SkillsMatchPanel";
import SettingsPanel from "./components/SettingsPanel";
import EmptyState from "./components/EmptyState";
import { ArrowUpCircle } from "lucide-react";
import { Separator } from "../components/ui/separator";

interface JobDetails {
  company?: string;
  job_title?: string;
  hiring_manager?: string;
}

export default function HomePage() {
  const [jobDetails, setJobDetails] = useState<JobDetails>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jdText, setJdText] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [settings, setSettings] = useState({
    includeMatched: true,
    includeUnmatched: false,
    includeSummary: true,
    tone: "professional",
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToneChange = (tone: string) => {
    setSettings((prev) => ({ ...prev, tone }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const toastId = toast.loading("Analyzing your resume...", {
      duration: 10000, // Prevents toast from hanging forever
    });

    setIsLoading(true);
    setResult(null);

    try {
      const res = await submitResumeData({
        resumeFile,
        resumeText,
        jdFile: null,
        jdText,
        ...jobDetails,
      });

      setResult(res);
      toast.success("Resume analyzed successfully.", { id: toastId });
    } catch (error: any) {
      console.error("Error submitting resume data:", error);

      const message =
        error?.message || "Something went wrong while analyzing your resume.";
      toast.error(message, { id: toastId });
    } finally {
      toast.dismiss(toastId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleGenerate(): void {
    handleSubmit();
  }
  return (
    <main className="min-h-screen bg-muted text-sm relative">
      <Toaster richColors position="bottom-center" />
      <nav className="bg-white px-6 py-4 shadow-sm border-b flex items-center gap-2">
        <img src="/logo.png" alt="Matchly Logo" width={24} height={24} />
        <h1 className="text-xl font-bold">Matchly</h1>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-6 h-[calc(100vh-80px)]">
        <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto space-y-4 h-full">
          <ResumeUploader
            file={resumeFile}
            setFile={setResumeFile}
            text={resumeText}
            setText={setResumeText}
          />
          <Separator className="my-4" />
          <JobDetailsForm details={jobDetails} setDetails={setJobDetails} />
          <Separator className="my-4" />
          <JobDescriptionInput text={jdText} setText={setJdText} />
          <Separator className="my-4" />
          <SettingsPanel
            onGenerate={handleGenerate}
            settings={settings}
            onToggle={handleToggle}
            onToneChange={handleToneChange}
          />{" "}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto space-y-4 h-full">
          {isLoading && (
            <div className="text-center animate-pulse text-muted-foreground">
              <div className="mb-2 text-base font-medium">
                Analyzing your resume...
              </div>
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          )}

          {!isLoading && result && (
            <>
              {settings.includeSummary && result.cover_letter && (
                <CoverLetterOutput text={result.cover_letter} />
              )}

              {(settings.includeMatched || settings.includeUnmatched) && (
                <SkillsMatchPanel
                  matchPercentage={(result.score ?? 0) * 100}
                  matchedSkills={
                    settings.includeMatched ? result.matched ?? [] : []
                  }
                  unmatchedSkills={
                    settings.includeUnmatched ? result.missing ?? [] : []
                  }
                  suggestedSkills={(result.matched ?? []).filter(
                    (skill: string) => skill.length > 2
                  )}
                />
              )}
            </>
          )}

          {!isLoading && !result && <EmptyState />}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition"
          aria-label="Scroll to top"
        >
          <ArrowUpCircle size={28} />
        </button>
      )}
    </main>
  );
}
