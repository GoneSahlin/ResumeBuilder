"use server";

import { PdfData, Resume } from "../lib/definitions";
import { createPdf } from "./create-pdf";
import { fetchCV } from "./fetch-cv";
import { fetchPdfs } from "./fetch-pdfs";
import { fetchResumes } from "./fetch-resumes";

export async function fetchAll() {
  const resumes: Array<Resume> = await fetchResumes();
  const cv: any = await fetchCV();
  const fetchedPdfs: Array<PdfData> = await fetchPdfs();

  // check pdfUrls exist for each resume
  const existingResumeIds: Array<string> = fetchedPdfs.map((pdf) => {return pdf.resumeId})
  const newPdfs: Array<PdfData> = await Promise.all(
    resumes.filter((resume) => !(resume.id in existingResumeIds))
      .map(async (resume, index) => {
        const newPdf: PdfData = await createPdf(cv, resume);

        return newPdf;
      }
    )
  );

  const pdfs: Array<PdfData> = [...fetchedPdfs, ...newPdfs]
  
  return {resumes, cv, pdfs};
}
