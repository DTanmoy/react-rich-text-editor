import { useState, useRef, ChangeEvent } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Divider, Typography } from "@mui/material";
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
        
        <TextField
          margin="dense"
          id="url"
          label="Image URL"
          type="url"
          fullWidth
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <TextField
          margin="dense"
          id="alt"
          label="Alt Text"
          type="text"
          fullWidth
          variant="outlined"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          helperText="Descriptive text for screen readers and if image fails to load"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
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