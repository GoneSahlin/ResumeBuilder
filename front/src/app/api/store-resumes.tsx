import { Resume } from "../lib/definitions";
import { storeResume } from "./store-resume";

export async function storeResumes(resumes: Array<Resume>) {
  resumes.forEach((resume) => {storeResume(resume)});
}
