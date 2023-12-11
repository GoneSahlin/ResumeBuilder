import { Resume } from "../lib/definitions";
import { storeResume } from "./store-resume";

export async function storeResumes(resumes: Array<Resume>, modified: Array<boolean>) {
  resumes.forEach((resume, index) => {
    if (modified[index]) {
      storeResume(resume);
    }
  });
}
