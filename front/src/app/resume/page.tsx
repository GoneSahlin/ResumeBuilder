"use server";

import { fetchResumes } from "../api/fetch-resumes"
import Resumes from "../ui/resumes";

export default async function Page() {
  const resumes: Array<any> = await fetchResumes();

  return (
     <Resumes initialResumes={resumes}/>
  )
}
