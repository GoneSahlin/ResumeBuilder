"use server";

import { fetchCV } from "../api/fetch-cv";
import { fetchPdfs } from "../api/fetch-pdfs";
import { fetchResumes } from "../api/fetch-resumes"
import { Resume } from "../lib/definitions";
import Resumes from "../ui/resume/resumes";


export default async function Page() {
  const resumes: Array<Resume> = await fetchResumes();
  const cv: Array<any> = await fetchCV();

  const pdfUrls = await fetchPdfs();
  
  return (
     <Resumes initialResumes={resumes} cv={cv} initialPdfUrls={pdfUrls} />
  )
}
