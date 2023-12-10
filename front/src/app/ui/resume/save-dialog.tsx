import { Dialog } from "@mui/material";

export interface SaveDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SaveDialog(props: SaveDialogProps) {
  const { open, onClose } = props;

  function handleClose() {
    onClose();
  }
  
  return (
    <Dialog onClose={handleClose} open={open}>
      <span>Dialog Text</span>
    </Dialog>     
  )
}

