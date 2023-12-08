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
        bulletSection={false}
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
        bulletSection={false}
      /><br/>
      {/* Research */}
      <ResumeSection 
        resume={resume}
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
        resume={resume}
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
        resume={resume}
        resumeDispatch={resumeDispatch}
        cv={cv}
        cvSectionKey="relatedCoursework"
        cvNameKey=""
        resumeIdKey={SectionKind.RELATED_COURSEWORK}
        addString="Add Related Coursework"
        bulletSection={true}
      /><br />
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