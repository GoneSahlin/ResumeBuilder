"use client";

import { useReducer, useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../../lib/definitions";
import { Grid } from "@mui/material";
import { updatePdfs } from "@/app/api/update-pdfs";
import ResumeEditor from "./resume-editor";
import { ResumeState, resumeReducer } from "@/app/lib/resume-reducer";

export default function Resumes({
  initialResumes,
  cv,
  initialPdfUrls,
} : {
  initialResumes: Array<Resume>,
  cv: any,
  initialPdfUrls: Array<any>,
}) {
  const [resumes, setResumes] = useState<Array<Resume>>([...initialResumes]);
  const [activeResume, setActiveResume] = useState<number>(0);
  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));
  const [pdfUrls, setPdfUrls] = useState<Array<string>>([...initialPdfUrls]);

  const [resumeState, resumeDispatch] = useReducer(
    resumeReducer, 
    {
      resume: 
      {
        ...resumes[activeResume]
      }, 
      modified: false
    } as ResumeState);

  const pdfUrl = pdfUrls[activeResume];

  const updatePdfUrls = async (resumes: Array<Resume>) => {
    setPdfUrls(await updatePdfs(cv, resumes));
  }

  return (
    <div>
      <ResumeTopBar
          resumes={resumes}
          setResumes={setResumes}
          cv={cv}
          setAddResumeActive={setAddResumeActive}
          activeResume={activeResume}
          setActiveResume={setActiveResume}
          pdfUrls={pdfUrls}
          setPdfUrls={setPdfUrls}
          resumeState={resumeState}
          resumeDispatch={resumeDispatch}
        /><br />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {addResumeActive || resumes.length === 0 ? (
            <NewResumeForm resumes={resumes} setResumes={setResumes} setAddResumeActive={setAddResumeActive} updatePdfUrls={updatePdfUrls} />
          ):(
            <ResumeEditor resumeState={resumeState} resumeDispatch={resumeDispatch} cv={cv} />
          )}
        </Grid>
        <Grid item xs={6}>
          <iframe src={pdfUrl} width="100%" height="800" />
        </Grid>
      </Grid>
    </div>
  )
}
