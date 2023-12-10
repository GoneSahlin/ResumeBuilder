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

export interface ResumeState {
  resume: Resume;
  modified: boolean;
}

export function resumeReducer(state: ResumeState, action: ResumeAction) {
  const resume: Resume = state.resume;

  var newResume: Resume;

  switch (action.type) {
    case ResumeActionKind.ADD_ITEM: {
      const id: number = action.payload;

      // create new resume
      newResume = {...resume};
      newResume[action.section] = [...newResume[action.section], id];

      break;
    }
    case ResumeActionKind.MOVE_UP_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      newResume = {...resume};
      
      // create copy of section so that reducer is a pure function
      newResume[action.section] = [...resume[action.section]]

      // switch items
      const tmp: number = newResume[action.section][i];
      newResume[action.section][i] = newResume[action.section][i - 1];
      newResume[action.section][i - 1] = tmp;

      break;
    }
    case ResumeActionKind.REMOVE_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      newResume = {...resume};
      
      // craete copy of section so that reducer is a pure function
      newResume[action.section] = [...resume[action.section]];

      // remove item
      newResume[action.section].splice(i, 1);

      break;
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }

  const newState: ResumeState = {
    resume: {...newResume},
    modified: true,
  }

  console.log(newResume);

  return newState;
}
