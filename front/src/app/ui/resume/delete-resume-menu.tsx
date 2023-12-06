import { Resume } from "@/app/lib/definitions";
import { Button, Menu, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export function DeleteResumeMenu({
  resumes,
  setResumes,
  activeResume,
  setActiveResume,
  pdfUrls,
  setPdfUrls,
}:{
  resumes: Array<Resume>,
  setResumes: Dispatch<SetStateAction<Resume[]>>,
  activeResume: number,
  setActiveResume: Dispatch<SetStateAction<number>>,
  pdfUrls: Array<string>,
  setPdfUrls: Dispatch<SetStateAction<Array<string>>>,
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (index: number) => {
    setAnchorEl(null);

    setResumes((resumes) => resumes.filter((_, i) => i !== index));
    setPdfUrls((pdfUrls) => pdfUrls.filter((_, i) => i !== index));
  
    if (activeResume === index) {
      setActiveResume(--activeResume);
    }
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