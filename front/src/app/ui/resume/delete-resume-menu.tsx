import { Button, Menu, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export function DeleteResumeMenu({
  resumes,
  setResumes,
}:{
  resumes: Array<any>,
  setResumes: Dispatch<SetStateAction<any[]>>,
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (resume: any) => {
    setAnchorEl(null);
    setResumes([...resumes.filter((x) => {return x !== resume})])
  };

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
        {resumes.map((resume) => {
          return (
            <MenuItem onClick={() => handleClose(resume)}>{resume.resumeName}</MenuItem>
          );
        })}
      </Menu>
    </>
  );
}