"use client";

import { useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../../lib/definitions";
import { ResumeSection } from "./resume-section";
import { Grid } from "@mui/material";
import { BulletResumeSection } from "./bullet-resume-section";
import { updatePdfs } from "@/app/api/update-pdfs";

export default function Resumes({
  initialResumes,
  cv,
  initialPdfUrls,
} : {
  initialResumes: Array<Resume>,
  cv: any,
  initialPdfUrls: Array<any>,
}) {
  const [resumes, setResumes] = useState<Array<Resume>>([...initialResumes]);
  const [activeResume, setActiveResume] = useState<number>(0);
  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));
  const [pdfUrls, setPdfUrls] = useState<Array<string>>([...initialPdfUrls]);

  const pdfUrl = pdfUrls[activeResume];

  const updatePdfUrls = async (resumes: Array<Resume>) => {
    setPdfUrls(await updatePdfs(cv, resumes));
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        {addResumeActive || resumes.length === 0 ? (
          <NewResumeForm resumes={resumes} setResumes={setResumes} setAddResumeActive={setAddResumeActive} updatePdfUrls={updatePdfUrls} />
        ):(
          <div>
            <ResumeTopBar
              resumes={resumes}
              setResumes={setResumes}
              cv={cv}
              setAddResumeActive={setAddResumeActive}
              activeResume={activeResume}
              setActiveResume={setActiveResume}
              pdfUrls={pdfUrls}
              setPdfUrls={setPdfUrls}
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
        <iframe src={pdfUrl} width="100%" height="800"/>
      </Grid>
    </Grid>
  )
}
