import { Button, Menu, MenuItem } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export function SectionAddMenu({
  addString,
  ids,
  itemStrings,
  addItem,
}:{
  addString: string,
  ids: Array<number>,
  itemStrings: Array<string>,
  addItem: (id:number) => (void),
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id: number) => {
    setAnchorEl(null);
    addItem(id);
  };

  const indexes: Array<number> = Array.from({length: ids.length}, (item, index) => index);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {addString}
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
        {indexes.map((i) => {
          return (
            <MenuItem key={i} onClick={() => handleClose(ids[i])}>{itemStrings[i]}</MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
