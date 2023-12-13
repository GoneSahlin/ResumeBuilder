import { deleteResume } from "@/app/api/delete-resume";
import { Resume } from "@/app/lib/definitions";
import { ResumeAction, ResumeState } from "@/app/lib/resume-reducer";
import { Button, Menu, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export interface DeleteResumeMenuProps {
  resumeState: ResumeState;
  resumeDispatch: Dispatch<ResumeAction>;
}

export function DeleteResumeMenu(props: DeleteResumeMenuProps) {
  const { resumeState, resumeDispatch } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const resumes: Array<Resume> = resumeState.resumes; 

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (index: number) => {
    setAnchorEl(null);

    deleteResume(resumes[index].id);
    
    // if (activeResume === index) {
    //   setActiveResume(--activeResume);
    // }
  };

  const indexes: Array<number> = Array.from({length: resumes.length}, (item, index) => index);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Delete
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {indexes.map((index) => {
          return (
            <MenuItem key={index} onClick={() => handleClose(index)}>{resumes[index].resumeName}</MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
