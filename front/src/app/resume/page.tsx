import { fetchResumes } from "../api/fetch-resumes"
import ResumeTopBar from "../ui/resume-top-bar"

export default async function Page() {
  const resumes = await fetchResumes();

  const resumeNames: Array<string> = resumes.map((resume) => {return resume.resumeName});

  return (
    <div>
      <ResumeTopBar resumeNames={resumeNames}/>
      Resumes
    </div>    
  )
}