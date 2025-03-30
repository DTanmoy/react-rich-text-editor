import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { LinkDialogProps } from "../interfaces";

export default function LinkDialog({ open, onClose, onConfirm }: LinkDialogProps) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  
  // Reset fields when dialog opens and populate text with selected text if available
  useEffect(() => {
    if (open) {
      setUrl("");
      
      // Use selected text as initial text value if available
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setText(selection.toString());
      } else {
        setText("");
      }
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm(url, text);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="link-dialog-title">
      <DialogTitle id="link-dialog-title">Insert Link</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          fullWidth
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          id="text"
          label="Link Text"
          type="text"
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm}
          color="primary"
          disabled={!url.trim()}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
} 