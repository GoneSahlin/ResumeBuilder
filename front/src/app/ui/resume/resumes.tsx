"use client";

import { useReducer, useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { PdfData, Resume } from "../../lib/definitions";
import { Grid } from "@mui/material";
import { updatePdfs } from "@/app/api/update-pdfs";
import ResumeEditor from "./resume-editor";
import { ResumeState, resumeReducer } from "@/app/lib/resume-reducer";

export interface ResumeProps {
  initialResumes: Array<Resume>;
  cv: any;
  initialPdfs: Array<PdfData>;
}

export default function Resumes(props: ResumeProps) {
  const { initialResumes, cv, initialPdfs } = props;

  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));

  const initialState: ResumeState = {
    resumes: [...initialResumes],
    modified: Array.from({length: initialResumes.length}, () => false),
    activeResume: 0,
    pdfs: initialPdfs,
  }
  const [resumeState, resumeDispatch] = useReducer(resumeReducer, initialState);

  const pdfUrl = resumeState.pdfs[resumeState.activeResume].pdfUrl;
  const resumes: Array<Resume> = resumeState.resumes;

  return (
    <div>
      <ResumeTopBar
          cv={cv}
          setAddResumeActive={setAddResumeActive}
          resumeState={resumeState}
          resumeDispatch={resumeDispatch}
        /><br />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {addResumeActive || resumes.length === 0 ? (
            <NewResumeForm resumeState={resumeState} resumeDispatch={resumeDispatch} setAddResumeActive={setAddResumeActive} />
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
