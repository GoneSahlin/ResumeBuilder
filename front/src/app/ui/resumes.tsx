"use client";

import { useState } from "react";
import ResumeTopBar from "../ui/resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../lib/definitions";
import { ResumeItem } from "./resume-item";
import { ResumeSection } from "./resume-section";

export default function Resumes({initialResumes, cv} : {initialResumes: Array<Resume>, cv: any}) {
  const [resumes, setResumes] = useState<Array<Resume>>([...initialResumes]);
  const [activeResume, setActiveResume] = useState<number>(0);
  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));

  return (
    <>
      {addResumeActive ? (
        <NewResumeForm resumes={resumes} setResumes={setResumes} setAddResumeActive={setAddResumeActive} />
      ):(
        <div>
          <ResumeTopBar
            resumes={resumes}
            setResumes={setResumes}
            setAddResumeActive={setAddResumeActive}
            activeResume={activeResume}
            setActiveResume={setActiveResume}
          />
          {/* Educations */}
          <ResumeSection 
            resumes={resumes}
            setResumes={setResumes}
            activeResume={activeResume}
            cv={cv}
            resumeIdKey="educationIds"
            cvSectionKey="educations"
            addString="Add Education"
          />          
        </div>
      )}
    </>
  )
}