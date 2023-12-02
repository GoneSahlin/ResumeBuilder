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

  const url = "https://hf7pjdm35v4mkzg2kgiv4blqje0ctwni.lambda-url.us-east-1.on.aws/" //?event=" + event

  // "curl \"http://localhost:9000/2015-03-31/functions/function/invocations\" -d '{json.dumps(event)}'"
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: event
  // });
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"event": events[0]})
  });

  // console.log(url)
  // const response = await fetch(url)
  console.log(response)


  // const responses: Array<any> = await Promise.all(events.map((event) => {return fetch("https://hf7pjdm35v4mkzg2kgiv4blqje0ctwni.lambda-url.us-east-1.on.aws/?event=" + event)}))

  // console.log(responses);
  // const pdfs: Array<any> = responses.map((response) => {return response["body"]})

  // return pdfs;
}

export default async function Page() {
  const resumes: Array<Resume> = await fetchResumes();
  const cv: Array<any> = await fetchCV();

  

  const pdfs = await getPdfs(cv, resumes);
  

  return (
     <Resumes initialResumes={resumes} cv={cv} pdfs={resumes} />
  )
}
