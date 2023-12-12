"use server";

import { PdfData, Resume } from "../lib/definitions";
import { fetchCV } from "./fetch-cv";
import { fetchPdfs } from "./fetch-pdfs";
import { fetchResumes } from "./fetch-resumes";

export async function fetchAll() {
  const resumes: Array<Resume> = await fetchResumes();
  const cv: any = await fetchCV();
  const pdfs: Array<PdfData> = await fetchPdfs();

  // check pdfUrls exist for each resume
  // resumes.forEach((resume, index) => {
  //   if (resume.id in pdfUrls.map((pdfUrl)))
  // })
  
  return {resumes, cv, pdfs}
}