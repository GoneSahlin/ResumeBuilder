"use server";

import { fetchCV } from "../api/fetch-cv";
import { fetchResumes } from "../api/fetch-resumes"
import { Resume } from "../lib/definitions";
import Resumes from "../ui/resume/resumes";


async function getPdfs(cv: Array<any>, resumes: Array<Resume>) {
  const events = resumes.map((resume) => {
    return {
      "cv": cv,
      "resume": resume
    }
  })
  const event = JSON.stringify(events[0])

  const url = "https://y4kkggibb3.execute-api.us-east-1.amazonaws.com/resume-builder-create-pdf"

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: event
  }).then((response) => response.text());

  const pdf_url = response

  console.log(pdf_url)

  const pdf_urls = [pdf_url]

  return [pdf_urls]
}

export default async function Page() {
  const resumes: Array<Resume> = await fetchResumes();
  const cv: Array<any> = await fetchCV();

  const pdf_urls = await getPdfs(cv, resumes);
  

  return (
     <Resumes initialResumes={resumes} cv={cv} pdf_urls={pdf_urls} />
  )
}
