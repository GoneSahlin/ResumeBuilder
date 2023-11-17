'use client';
 
import { Box, Button, ButtonGroup, Select } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';
import { DeleteResumeMenu } from "./delete-resume-menu";

export default function ResumeTopBar({
  resumes,
  setResumes,
  setAddResumeActive,
}:{
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  setAddResumeActive: Dispatch<SetStateAction<boolean>>,
}) {

  const resumeNames: Array<string> = resumes.map((resume: any) => {return resume.resumeName});

  return (
    <Box>
      <ButtonGroup>
        {resumeNames.map((resumeName) => {
          return (
            <Button key={resumeName}>{resumeName}</Button>
          );
        })}
      </ButtonGroup>
      <Button type="button" onClick={() => setAddResumeActive(true)}>Add</Button>
      <DeleteResumeMenu resumes={resumes} setResumes={setResumes} />
    </Box>
  )
}