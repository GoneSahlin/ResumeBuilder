import { Button, IconButton, ListItem, ListItemText } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ResumeAction, ResumeActionKind, SectionKind } from "@/app/lib/resume-reducer";
import { Dispatch } from "react";
import { Resume } from "@/app/lib/definitions";


export function ResumeItem({
  resumeDispatch,
  resumeIdKey,
  name,
  i,
  indexesLength,
} : {
  resumeDispatch: Dispatch<ResumeAction>,
  resumeIdKey: SectionKind,
  i: number,
  indexesLength: number
  name: string,
}) {
  const upArrow: boolean = i > 0;
  const downArrow: boolean = i < indexesLength - 1;

  const moveUp = () => {
    const action: ResumeAction = {
      type: ResumeActionKind.MOVE_UP_ITEM,
      section: resumeIdKey,
      payload: i,
    }
    resumeDispatch(action);
  }

  const moveDown = () => {
    const action: ResumeAction = {
      type: ResumeActionKind.MOVE_UP_ITEM,
      section: resumeIdKey,
      payload: i + 1,
    }
    resumeDispatch(action);
  }

  const remove = () => {
    const action: ResumeAction = {
      type: ResumeActionKind.REMOVE_ITEM,
      section: resumeIdKey,
      payload: i,
    }
    resumeDispatch(action);
  }

  return (
    <ListItem
      key={name}
      disableGutters
      secondaryAction={
        <div>
          <IconButton aria-label="up" sx={{ visibility: upArrow ? 'visible' : 'hidden'}} onClick={moveUp}>
            <ArrowDropUpIcon />
          </IconButton>
          <IconButton aria-label="down" sx={{ visibility: downArrow ? 'visible' : 'hidden'}} onClick={moveDown}>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={remove}>
            <ClearIcon />
          </IconButton>
        </div>
      }
    >
      <ListItemText id={name} primary={name} />
    </ListItem>
  )
}