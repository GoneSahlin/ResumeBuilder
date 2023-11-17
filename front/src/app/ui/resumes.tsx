"use client";

import { useState } from "react";
import ResumeTopBar from "../ui/resume-top-bar"
import { NewResumeForm } from "./new-resume-form";

export default function Resumes({initialResumes} : {initialResumes: Array<any>}) {
  const [resumes, setResumes] = useState<Array<any>>([...initialResumes]);
  const [addResumeActive, setAddResumeActive] = useState(false);

  return (
    <>
      {addResumeActive ? (
        <NewResumeForm resumes={resumes} setResumes={setResumes} setAddResumeActive={setAddResumeActive} />
      ):(
        <div>
          <ResumeTopBar resumes={resumes} setResumes={setResumes} setAddResumeActive={setAddResumeActive} />
          Resumes
        </div> 
      )}
    </>
  )

}