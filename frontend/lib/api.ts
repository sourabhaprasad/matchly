export async function submitResumeData({
  resumeFile,
  resumeText,
  jdFile,
  jdText,
  company,
  job_title,
  hiring_manager,
  tone,
}: {
  resumeFile: File | null;
  resumeText: string;
  jdFile: File | null;
  jdText: string;
  company?: string;
  job_title?: string;
  hiring_manager?: string;
  tone?: string;
}) {
  const formData = new FormData();

  if (resumeFile) {
    formData.append("resume_file", resumeFile);
  } else if (resumeText) {
    formData.append("resume_text", resumeText);
  }

  if (jdFile) {
    formData.append("jd_file", jdFile);
  } else if (jdText) {
    formData.append("jd_text", jdText);
  }

  formData.append("company", company || "");
  formData.append("job_title", job_title || "");
  formData.append("hiring_manager", hiring_manager || "");
  formData.append("tone", tone || "professional");

  const res = await fetch("http://localhost:8001/api/process", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
}
