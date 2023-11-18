"use server";

import { fetchCV } from "../api/fetch-cv";
import { fetchResumes } from "../api/fetch-resumes"
import { Resume } from "../lib/definitions";
import Resumes from "../ui/resume/resumes";

export default async function Page() {
  // const resumes: Array<Resume> = await fetchResumes();
  const resumes:Array<Resume> = [];
  const cv: Array<any> = await fetchCV();

  return (
     <Resumes initialResumes={resumes} cv={cv}/>
  )
}
