"use client";

import { useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../../lib/definitions";
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
          /><br/>
          {/* Educations */}
          <ResumeSection 
            resumes={resumes}
            setResumes={setResumes}
            activeResume={activeResume}
            cv={cv}
            resumeIdKey="educationIds"
            cvSectionKey="educations"
            cvNameKey="educationName"
            addString="Add Education"
          /><br/>
          {/* Projects */}
          <ResumeSection 
            resumes={resumes}
            setResumes={setResumes}
            activeResume={activeResume}
            cv={cv}
            resumeIdKey="projectIds"
            cvSectionKey="projects"
            cvNameKey="projectTitle"
            addString="Add Project"
          /><br/>
          {/* Research */}
          <ResumeSection 
            resumes={resumes}
            setResumes={setResumes}
            activeResume={activeResume}
            cv={cv}
            resumeIdKey="researchIds"
            cvSectionKey="research"
            cvNameKey="researchTitle"
            addString="Add Research"
          /><br/>
          {/* Work Experience */}
          <ResumeSection 
            resumes={resumes}
            setResumes={setResumes}
            activeResume={activeResume}
            cv={cv}
            resumeIdKey="workExperienceIds"
            cvSectionKey="workExperience"
            cvNameKey="workExperienceEmployer"
            addString="Add Work Experience"
          /><br/>
        </div>
      )}
    </>
  )
}