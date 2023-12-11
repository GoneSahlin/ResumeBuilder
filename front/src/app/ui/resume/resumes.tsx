"use client";

import { useReducer, useState } from "react";
import ResumeTopBar from "./resume-top-bar"
import { NewResumeForm } from "./new-resume-form";
import { Resume } from "../../lib/definitions";
import { Grid } from "@mui/material";
import { updatePdfs } from "@/app/api/update-pdfs";
import ResumeEditor from "./resume-editor";
import { ResumeState, resumeReducer } from "@/app/lib/resume-reducer";

export interface ResumeProps {
  initialResumes: Array<Resume>;
  cv: any;
  initialPdfUrls: Array<any>;
}

export default function Resumes(props: ResumeProps) {
  const { initialResumes, cv, initialPdfUrls } = props;

  const [addResumeActive, setAddResumeActive] = useState(!(initialResumes.length > 0));
  const [pdfUrls, setPdfUrls] = useState<Array<string>>([...initialPdfUrls]);

  const initialState: ResumeState = {
    resumes: [...initialResumes],
    modified: Array.from({length: initialResumes.length}, () => false),
    activeResume: 0,
  }
  const [resumeState, resumeDispatch] = useReducer(resumeReducer, initialState);

  const pdfUrl = pdfUrls[resumeState.activeResume];
  const resumes: Array<Resume> = resumeState.resumes;

  const updatePdfUrls = async (resumes: Array<Resume>) => {
    setPdfUrls(await updatePdfs(cv, resumes));
  }

  return (
    <div>
      <ResumeTopBar
          cv={cv}
          setAddResumeActive={setAddResumeActive}
          pdfUrls={pdfUrls}
          setPdfUrls={setPdfUrls}
          resumeState={resumeState}
          resumeDispatch={resumeDispatch}
        /><br />
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {addResumeActive || resumes.length === 0 ? (
            <NewResumeForm resumeState={resumeState} resumeDispatch={resumeDispatch} setAddResumeActive={setAddResumeActive} updatePdfUrls={updatePdfUrls} />
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
