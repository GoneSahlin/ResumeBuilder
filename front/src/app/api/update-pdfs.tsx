// "use server";

// import Resumes from "../ui/resume/resumes";
// import { createPdf } from "./create-pdf";
// import { fetchCV } from "./fetch-cv";
// import { fetchPdfs } from "./fetch-pdfs";
// import { fetchResumes } from "./fetch-resumes";
// import { Resume } from "@/app/lib/definitions";

// export async function updatePdfs(cv: any, newResumes: Array<Resume>) {
//   /**
//    * Updates pdf urls when cv or resumes change
//    * @param newResumes new resumes to be stored and used to update pdfs
//    * @returns newPdfUrls updated urls to pdfs stored on s3
//    */
//   const [oldResumes, oldPdfUrls] = await Promise.all([fetchResumes(), fetchPdfs()])

//   // find which resumes are changed
//   const pdfsToUpdate: Array<number> = [];
//   oldResumes.forEach((resume: Resume, index: number) => {
//     if (JSON.stringify(resume) !== JSON.stringify(newResumes[index])) {
//       pdfsToUpdate.push(index);
//     }
//   });

//   // created new pdfs for changed resumes
//   const createdPdfUrls = await Promise.all(pdfsToUpdate.map((index: number) => {
//     return createPdf(cv, newResumes[index]);
//   }));

//   // combine old pdfs with created pdfs
//   const newPdfUrls: Array<string> = [...oldPdfUrls];
//   pdfsToUpdate.forEach((i: number, j: number) => {
//     newPdfUrls[i] = createdPdfUrls[j];
//   });

//   // TODO delete old urls

//   // store and return newPdfUrls
//   return newPdfUrls;
// }