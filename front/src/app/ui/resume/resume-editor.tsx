import { Resume } from "@/app/lib/definitions";
import { ResumeSection } from "./resume-section";
import { Dispatch, useReducer } from "react";
import { ResumeAction, ResumeState, SectionKind, resumeReducer } from "@/app/lib/resume-reducer";

export default function ResumeEditor({
  resumeState,
  resumeDispatch,
  cv,
} : {
  resumeState: ResumeState,
  resumeDispatch: Dispatch<ResumeAction>,
  cv: any,
}) {  
  return (
    <div>
      {/* Educations */}
      <ResumeSection 
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.EDUCATION}
        cvSectionKey="educations"
        cvNameKey="educationName"
        addString="Add Education"
        bulletSection={false}
      /><br/>
      {/* Projects */}
      <ResumeSection 
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.PROJECTS}
        cvSectionKey="projects"
        cvNameKey="projectTitle"
        addString="Add Project"
        bulletSection={false}
      /><br/>
      {/* Research */}
      <ResumeSection 
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.RESEARCH}
        cvSectionKey="research"
        cvNameKey="researchTitle"
        addString="Add Research"
        bulletSection={false}
      /><br/>
      {/* Work Experience */}
      <ResumeSection 
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.WORK_EXPERIENCE}
        cvSectionKey="workExperience"
        cvNameKey="workExperienceEmployer"
        addString="Add Work Experience" 
        bulletSection={false}
      /><br/>
      {/* Related Coursework */}
      <ResumeSection
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        cvSectionKey="relatedCoursework"
        cvNameKey=""
        resumeIdKey={SectionKind.RELATED_COURSEWORK}
        addString="Add Related Coursework"
        bulletSection={true}
      /><br />
      {/* Technical Skills */}
      <ResumeSection
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        cv={cv}
        cvSectionKey="technicalSkills"
        cvNameKey=""
        resumeIdKey={SectionKind.TECHNICAL_SKILLS}
        addString="Add Technical Skill"
        bulletSection={true}
      /><br />
    </div>
  )
}
