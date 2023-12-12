"use server";

import { fetchAll } from "../api/fetch-all";
import Resumes from "../ui/resume/resumes";


export default async function Page() {
  const { resumes, cv, pdfUrls } = await fetchAll();

  
  return (
     <Resumes initialResumes={resumes} cv={cv} initialPdfUrls={pdfUrls} />
  )
}
