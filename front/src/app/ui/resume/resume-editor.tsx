import { Resume } from "@/app/lib/definitions";
import { ResumeSection } from "./resume-section";
import { useReducer } from "react";
import { SectionKind, resumeReducer } from "@/app/lib/resume-reducer";

export default function ResumeEditor({
  initialResume,
  cv,
} : {
  initialResume: Resume,
  cv: any,
}) {
  const [resume, resumeDispatch] = useReducer(resumeReducer, initialResume);
  
  return (
    <div>
      {/* Educations */}
      <ResumeSection 
        resume={resume}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.EDUCATION}
        cvSectionKey="educations"
        cvNameKey="educationName"
        addString="Add Education"
      /><br/>
      {/* Projects */}
      <ResumeSection 
        resume={resume}
        resumeDispatch={resumeDispatch}
        cv={cv}
        resumeIdKey={SectionKind.PROJECTS}
        cvSectionKey="projects"
        cvNameKey="projectTitle"
        addString="Add Project"
      /><br/>
      {/* Research */}
      {/* <ResumeSection 
        resume={resume}
        cv={cv}
        resumeIdKey="researchIds"
        cvSectionKey="research"
        cvNameKey="researchTitle"
        addString="Add Research"
      /><br/> */}
      {/* Work Experience */}
      {/* <ResumeSection 
        resume={resume}
        cv={cv}
        resumeIdKey="workExperienceIds"
        cvSectionKey="workExperience"
        cvNameKey="workExperienceEmployer"
        addString="Add Work Experience"
      /><br/> */}
      {/* Related Coursework */}
      {/* <BulletResumeSection
        resume={resume}
        cv={cv}
        cvSectionKey="relatedCoursework"
        resumeIdKey="relatedCourseworkIds"
        addString="Add Related Coursework"
      /><br /> */}
      {/* Technical Skills */}
      {/* <BulletResumeSection
        resume={resume}
        cv={cv}
        cvSectionKey="technicalSkills"
        resumeIdKey="technicalSkillsIds"
        addString="Add Technical Skill"
      /><br /> */}
    </div>
  )
}