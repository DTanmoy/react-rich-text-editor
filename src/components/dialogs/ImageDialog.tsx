import { useState, useRef, ChangeEvent } from "react";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";

// Interfaces
import { ImageDialogProps } from "../interfaces";

export default function ImageDialog({ open, onClose, onConfirm }: ImageDialogProps) {
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConfirm = () => {
    onConfirm(url, alt);
    onClose();
    // Reset fields
    setUrl("");
    setAlt("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      
      // Basic validation
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Create a temporary URL for the selected file
      const objectUrl = URL.createObjectURL(selectedFile);
      setUrl(objectUrl);
      
      // Use filename as alt text if none provided
      if (!alt) {
        const fileName = selectedFile.name.split('.')[0];
        setAlt(fileName);
      }
    }
  };

  const handleDialogClose = () => {
    setUrl("");
    setAlt("");
    onClose();
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleDialogClose} 
      aria-labelledby="image-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="image-dialog-title">Insert Image</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Upload Image</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleBrowseClick}
              sx={{ mr: 2 }}
            >
              Browse...
            </Button>
            <Typography variant="body2" color="text.secondary">
              {url && url.startsWith('blob:') ? "File selected" : "No file selected"}
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }}>OR</Divider>
        
        <OutlinedInput
          size="small"
          id="url"
          placeholder="Image URL"
          type="url"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <OutlinedInput
          size="small"
          id="alt"
          placeholder="Alt Text"
          type="text"
          fullWidth
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button size="small" onClick={handleDialogClose}>Cancel</Button>
        <Button 
          size="small"
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