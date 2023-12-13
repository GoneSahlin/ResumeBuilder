"use server";

import { fetchAll } from "../api/fetch-all";
import Resumes from "../ui/resume/resumes";


export default async function Page() {
  const { resumes, cv, pdfs } = await fetchAll();

  const pdfUrls: Array<string> = pdfs.map((map) => {return map.pdfUrl});
  
  return (
     <Resumes initialResumes={resumes} cv={cv} initialPdfUrls={pdfUrls} />
  );
}
