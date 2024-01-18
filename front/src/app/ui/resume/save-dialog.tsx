import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export interface SaveDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function SaveDialog(props: SaveDialogProps) {
  const { open, onClose, onSave } = props;

  function handleClose() {
    onClose();
  }

  function handleSave() {
    onSave();
  }
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {"Unsaved Changes"}
      </DialogTitle>
      <DialogContent>
        {"Do you want to save changes?"}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Don&apos;t Save</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>     
  )
}

