'use client';
 
import { Box, Button, ButtonGroup, Dialog, Select } from "@mui/material";
import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteResumeMenu } from "./delete-resume-menu";
import { storeResumes } from "@/app/api/store-resumes";
import { updatePdfs } from "@/app/api/update-pdfs";
import { ResumeAction, ResumeActionKind, ResumeState } from "@/app/lib/resume-reducer";
import { storeResume } from "@/app/api/store-resume";
import SaveDialog from "./save-dialog";
import { Resume } from "@/app/lib/definitions";

export interface ResumeTopBarProps {
  cv: any;
  setAddResumeActive: Dispatch<SetStateAction<boolean>>;
  pdfUrls: Array<string>;
  setPdfUrls: Dispatch<SetStateAction<Array<string>>>;
  resumeState: ResumeState;
  resumeDispatch: Dispatch<ResumeAction>;
}

export default function ResumeTopBar(props: ResumeTopBarProps) {
  const { cv, setAddResumeActive, pdfUrls, setPdfUrls, resumeState, resumeDispatch } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const resumes: Array<Resume> = resumeState.resumes;

  const checkUnsavedResume = () => {
    if (resumeState.modified[resumeState.activeResume]) {
      setOpenDialog(true);
    }
  }

  const handleResumeButton = (i: number) => {
    checkUnsavedResume();
    
    const action: ResumeAction = {
      type: ResumeActionKind.SET_ACTIVE_RESUME,
      section: null,
      payload: i,
    };
    resumeDispatch(action);
  }

  const handleSaveClick = async () => {
    await storeResumes(resumeState.resumes, resumeState.modified);

    const action: ResumeAction = {
      type: ResumeActionKind.SET_NOT_MODIFIED_ALL,
      section: null,
      payload: 0,
    }
    resumeDispatch(action);
    // setPdfUrls(await updatePdfs(cv, resumes));
  }


  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleSaveDialog = async () => {
    await handleSaveClick();
    setOpenDialog(false);
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
                variant={i === resumeState.activeResume ? "contained" : "outlined"}
              >
                {resumes[i].resumeName}
              </Button>
            </div>
          );
        })}
      </ButtonGroup>
      <Button type="button" onClick={() => setAddResumeActive(true)}>Add</Button>
      <DeleteResumeMenu
        resumeState={resumeState}
        resumeDispatch={resumeDispatch}
        pdfUrls={pdfUrls}
        setPdfUrls={setPdfUrls}
      />
      <Button variant="contained" type="button" onClick={handleSaveClick}>Save</Button>
      <SaveDialog 
        open={openDialog}
        onSave={handleSaveDialog}
        onClose={handleCloseDialog}
      />
    </Box>
  )
}