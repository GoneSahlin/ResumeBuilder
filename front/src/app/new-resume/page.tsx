import { fetchResumes } from "../api/fetch-resumes";
import { NewResumeForm } from "../ui/new-resume-form";

export default async function Page() {
  const resumes =  await fetchResumes();

  const resumeNames: Array<string> = [];
  resumes.map((resume) => (resumeNames.push(resume.resumeName)))

  console.log(resumeNames);

  return (
    <NewResumeForm resumeNames={resumeNames}/>
  )
}