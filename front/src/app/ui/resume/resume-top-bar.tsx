'use client';
 
import { Box, Button, ButtonGroup, Select } from "@mui/material";
import { Dispatch, SetStateAction } from 'react';
import { DeleteResumeMenu } from "./delete-resume-menu";
import { storeResumes } from "@/app/api/store-resume";

export default function ResumeTopBar({
  resumes,
  setResumes,
  setAddResumeActive,
  activeResume,
  setActiveResume,
}:{
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  setAddResumeActive: Dispatch<SetStateAction<boolean>>,
  activeResume: number,
  setActiveResume: Dispatch<SetStateAction<number>>,
}) {

  const handleResumeButton = (i: number) => {
    setActiveResume(i);
  }

  const handleSaveClick = async () => {
    storeResumes(resumes);
  }

  const indexes: Array<number> = Array.from({length: resumes.length}, (item, index) => index);

  return (
    <Box>
      <ButtonGroup>
        {indexes.map((i) => {
          return (
            <div key={i}>
              <Button 
                key={resumes[i].resumeName}
                onClick={() => handleResumeButton(i)}
                variant={i === activeResume ? "contained" : "outlined"}
              >
                {resumes[i].resumeName}
              </Button>
            </div>
          );
        })}
      </ButtonGroup>
      <Button type="button" onClick={() => setAddResumeActive(true)}>Add</Button>
      <DeleteResumeMenu resumes={resumes} setResumes={setResumes} activeResume={activeResume} setActiveResume={setActiveResume}/>
      <Button variant="contained" type="button" onClick={handleSaveClick}>Save</Button>
    </Box>
  )
}