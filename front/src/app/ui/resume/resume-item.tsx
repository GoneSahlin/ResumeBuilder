import { Button, IconButton, ListItem, ListItemText } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export function ResumeItem({
  name,
  upArrow,
  downArrow,
  moveUp,
  moveDown,
  remove,
} : {
  name: string,
  upArrow: boolean,
  downArrow: boolean,
  moveUp: () => void,
  moveDown: () => void,
  remove: () => void,
}) {
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