"use server";

import { PdfData, Resume } from "../lib/definitions";
import { storePdfData } from "./store-pdf";


export async function createPdf(cv: Array<any>, resume: Resume) {
  console.log("Creating pdf for " + resume.resumeName)
  const event = {
      "cv": cv,
      "resume": resume
  };

  const url: string = "https://y4kkggibb3.execute-api.us-east-1.amazonaws.com/resume-builder-create-pdf"

  const pdfUrl: string = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then((response) => response.text());

  const pdf: PdfData = {
    pdfUrl: pdfUrl,
    resumeId: resume.id,
    resumeUpdatedAt: resume.updatedAt,
    updatedAt: Date.now(),
  }

  storePdfData(pdf);

  return pdf;
}
