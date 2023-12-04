"use client";

import { useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../../lib/definitions";
import { ResumeItem } from "./resume-item";
import { ResumeSection } from "./resume-section";
import { Grid } from "@mui/material";
import { BulletResumeSection } from "./bullet-resume-section";

export default function Resumes({
  initialResumes,
  cv,
  pdfs,
} : {
  initialResumes: Array<Resume>,
  cv: any,
  pdfs: Array<any>,
}) {
  const [resumes, setResumes] = useState<Array<Resume>>([...initialResumes]);
  const [activeResume, setActiveResume] = useState<number>(0);
  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));

  const pdf = pdfs[activeResume]

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        {addResumeActive || resumes.length === 0 ? (
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
            {/* Related Coursework */}
            <BulletResumeSection
              resumes={resumes}
              setResumes={setResumes}
              activeResume={activeResume}
              cv={cv}
              cvSectionKey="relatedCoursework"
              resumeIdKey="relatedCourseworkIds"
              addString="Add Related Coursework"
            /><br />
            {/* Technical Skills */}
            <BulletResumeSection
              resumes={resumes}
              setResumes={setResumes}
              activeResume={activeResume}
              cv={cv}
              cvSectionKey="technicalSkills"
              resumeIdKey="technicalSkillsIds"
              addString="Add Technical Skill"
            /><br />
          </div>
        )}
      </Grid>
      <Grid item xs={6}>
        {/* <iframe src={"data:application/pdf;base64," + pdf} width="100%" height="100%"/> */}
        <iframe src={"https://resume-builder-pdfs.s3.amazonaws.com/resume.pdf"} width="100%" height="100%"/>
        {/* <embed src={"data:application/pdf;base64," + pdf} type="application/pdf"/> */}
        {/* PDF File */}
      </Grid>
    </Grid>
  )
}
