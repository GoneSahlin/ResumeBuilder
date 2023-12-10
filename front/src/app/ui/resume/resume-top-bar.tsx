'use client';
 
import { Box, Button, ButtonGroup, Dialog, Select } from "@mui/material";
import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteResumeMenu } from "./delete-resume-menu";
import { storeResumes } from "@/app/api/store-resumes";
import { updatePdfs } from "@/app/api/update-pdfs";
import { ResumeAction, ResumeState } from "@/app/lib/resume-reducer";
import { storeResume } from "@/app/api/store-resume";
import SaveDialog from "./save-dialog";

export default function ResumeTopBar({
  resumes,
  setResumes,
  cv,
  setAddResumeActive,
  activeResume,
  setActiveResume,
  pdfUrls,
  setPdfUrls,
  resumeState,
  resumeDispatch,
}:{
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
  cv: any
  setAddResumeActive: Dispatch<SetStateAction<boolean>>,
  activeResume: number,
  setActiveResume: Dispatch<SetStateAction<number>>,
  pdfUrls: Array<string>,
  setPdfUrls: Dispatch<SetStateAction<Array<string>>>,
  resumeState: ResumeState,
  resumeDispatch: Dispatch<ResumeAction>,
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const checkUnsavedResume = () => {
    if (resumeState.modified) {
      setOpenDialog(true);
    }
  }

  const handleResumeButton = (i: number) => {
    checkUnsavedResume();
    setActiveResume(i);
  }

  const handleSaveClick = async () => {
    if (resumeState.modified) {
      await storeResume(resumeState.resume);
    }
    // setPdfUrls(await updatePdfs(cv, resumes));
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
      <DeleteResumeMenu
        resumes={resumes}
        setResumes={setResumes}
        activeResume={activeResume}
        setActiveResume={setActiveResume}
        pdfUrls={pdfUrls}
        setPdfUrls={setPdfUrls}
      />
      <Button variant="contained" type="button" onClick={handleSaveClick}>Save</Button>
      <SaveDialog 
        open={openDialog}
        onClose={() => {}}
      />
    </Box>
  )
}