import { Resume } from "./definitions";

export enum ResumeActionKind {
  ADD_ITEM = 'ADD_ITEM',
  MOVE_UP_ITEM = 'MOVE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

export enum SectionKind {
  EDUCATION = "educationIds",
  PROJECTS = "projectIds",
  RESEARCH = "researchIds",
  WORK_EXPERIENCE = "workExperienceIds",
  RELATED_COURSEWORK = "relatedCourseworkIds",
  TECHNICAL_SKILLS = "technicalSkillsIds",
}

export interface ResumeAction {
  type: ResumeActionKind;
  section: SectionKind;
  payload: number; // index or id, depending on type
}

export function resumeReducer(resume: Resume, action: ResumeAction) {
  switch (action.type) {
    case ResumeActionKind.ADD_ITEM: {
      // payload as id
      const id: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      newResume[action.section] = [...resume[action.section], id];

      return newResume;
    }
    case ResumeActionKind.MOVE_UP_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      
      // create copy of section so that reducer is a pure function
      newResume[action.section] = [...resume[action.section]]

      // switch items
      const tmp: number = newResume[action.section][i];
      newResume[action.section][i] = newResume[action.section][i - 1];
      newResume[action.section][i - 1] = tmp;

      return newResume as Resume;
    }
    case ResumeActionKind.REMOVE_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      
      // craete copy of section so that reducer is a pure function
      newResume[action.section] = [...resume[action.section]]

      // remove item
      newResume[action.section].splice(i, 1);

      return newResume;
    }
  }
  throw Error('Unknown action: ' + action.type);
}

