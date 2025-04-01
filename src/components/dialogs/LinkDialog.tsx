import { useState, useEffect } from "react";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";

// Interfaces
import { LinkDialogProps } from "../interfaces";

export default function LinkDialog({ open, onClose, onConfirm }: LinkDialogProps) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  
  // URL validation regex - more comprehensive
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
  
  // Reset fields when dialog opens and populate text with selected text if available
  useEffect(() => {
    if (open) {
      setUrl("");
      setIsValidUrl(false);
      
      // Use selected text as initial text value if available
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setText(selection.toString());
      } else {
        setText("");
      }
    }
  }, [open]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValidUrl(urlRegex.test(newUrl));
  };

  const handleConfirm = () => {
    // Ensure URL has protocol
    const finalUrl = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `https://${url}`;
    onConfirm(finalUrl, text);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="link-dialog-title">
      <DialogTitle id="link-dialog-title">Insert Link</DialogTitle>
      <DialogContent>
        <OutlinedInput
          size="small"
          placeholder="https://example.com"
          fullWidth
          value={url}
          onChange={handleUrlChange}
          error={url !== "" && !isValidUrl}
          sx={{ mb: 1 }}
          endAdornment={
            url !== "" && (
              <InputAdornment position="end">
                {isValidUrl ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <ErrorIcon color="error" />
                )}
              </InputAdornment>
            )
          }
        />
        {url !== "" && !isValidUrl && (
          <FormHelperText error sx={{ mb: 2 }}>
            Please enter a valid URL (e.g., https://example.com)
          </FormHelperText>
        )}
        <OutlinedInput
          size="small"
          placeholder="Link Text"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={onClose}>Cancel</Button>
        <Button 
          size="small"
          onClick={handleConfirm}
          color="primary"
          disabled={!url.trim() || !isValidUrl}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
} 