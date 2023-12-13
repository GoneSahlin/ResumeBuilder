import { PdfData, Resume } from "./definitions";

export enum ResumeActionKind {
  ADD_ITEM = 'ADD_ITEM',
  MOVE_UP_ITEM = 'MOVE_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  SET_ACTIVE_RESUME = 'SET_ACTIVE_RESUME',
  SET_NOT_MODIFIED_ONE = 'SET_NOT_MODIFIED_ONE',
  SET_NOT_MODIFIED_ALL = 'SET_NOT_MODIFIED_ALL',
  SET_ALL = 'SET_ALL',
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
  section: SectionKind | null;
  payload: any; // index or id, depending on type
}

export interface ResumeState {
  resumes: Array<Resume>;
  modified: Array<boolean>;
  activeResume: number;
  pdfs: Array<PdfData>;
}

export function resumeReducer(state: ResumeState, action: ResumeAction) {
  const resume: Resume = state.resumes[state.activeResume];

  switch (action.type) {
    case ResumeActionKind.ADD_ITEM: {
      const id: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      newResume[action.section!] = [...newResume[action.section!], id];

      // create new resumes
      const newResumes: Array<Resume> = [...state.resumes]
      newResumes[state.activeResume] = newResume;

      // update modified
      const newModified = [...state.modified]
      newModified[state.activeResume] = true;
      
      return {
        resumes: newResumes,
        modified: [...newModified],
        activeResume: state.activeResume,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.MOVE_UP_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      
      // create copy of section so that reducer is a pure function
      newResume[action.section!] = [...resume[action.section!]]

      // switch items
      const tmp: number = newResume[action.section!][i];
      newResume[action.section!][i] = newResume[action.section!][i - 1];
      newResume[action.section!][i - 1] = tmp;

      // create new resumes
      const newResumes: Array<Resume> = [...state.resumes]
      newResumes[state.activeResume] = newResume;

      // update modified
      const newModified = [...state.modified]
      newModified[state.activeResume] = true;

      return {
        resumes: newResumes,
        modified: [...newModified],
        activeResume: state.activeResume,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.REMOVE_ITEM: {
      // payload as index
      const i: number = action.payload;

      // create new resume
      const newResume: Resume = {...resume};
      
      // create copy of section so that reducer is a pure function
      newResume[action.section!] = [...resume[action.section!]];

      // remove item
      newResume[action.section!].splice(i, 1);

      // create new resumes
      const newResumes: Array<Resume> = [...state.resumes];
      newResumes[state.activeResume] = newResume;

      // update modified
      const newModified: Array<boolean> = [...state.modified];
      newModified[state.activeResume] = true;

      return {
        resumes: newResumes,
        modified: [...newModified],
        activeResume: state.activeResume,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.SET_ACTIVE_RESUME: {
      // payload as index of new active resume
      const i: number = action.payload;

      return {
        resumes: state.resumes,
        modified: state.modified,
        activeResume: i,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.SET_NOT_MODIFIED_ONE: {
      // payload as index of resume to set as not modified
      const i: number = action.payload;

      const newModified: Array<boolean> = [...state.modified];
      newModified[i] = false;

      return {
        resumes: state.resumes,
        modified: newModified,
        activeResume: state.activeResume,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.SET_NOT_MODIFIED_ALL: {
      // payload as index of resume to set as not modified
      const i: number = action.payload;

      const newModified: Array<boolean> = Array.from({length: state.resumes.length}, () => {return false});
      
      return {
        resumes: state.resumes,
        modified: newModified,
        activeResume: state.activeResume,
        pdfs: state.pdfs,
      }
    }
    case ResumeActionKind.SET_ALL: {
      // payload as object {newResumes: Array<Resume>, newPdfs: Array<PdfData>}
      const newResumes: Array<Resume> = action.payload.newResumes;
      const newPdfs: Array<PdfData> = action.payload.newPdfs;
      const newModified: Array<boolean> = Array.from({length: state.resumes.length}, () => {return false});

      return {
        resumes: newResumes,
        modified: newModified,
        activeResume: state.activeResume,
        pdfs: newPdfs,
      }
    }
    default:
      throw Error('Unknown action: ' + action.type);
  }
}
