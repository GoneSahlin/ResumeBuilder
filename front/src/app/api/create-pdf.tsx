"use server";

import { Resume } from "../lib/definitions";


export async function createPdf(cv: Array<any>, resume: Resume) {
  const event = {
      "cv": cv,
      "resume": resume
  };

  const url = "https://y4kkggibb3.execute-api.us-east-1.amazonaws.com/resume-builder-create-pdf"

  const pdfUrl = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  }).then((response) => response.text());

  return pdfUrl;
}
