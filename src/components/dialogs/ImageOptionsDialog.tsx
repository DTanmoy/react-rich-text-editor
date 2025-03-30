import { useState, ChangeEvent } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { ImageOptionsDialogProps } from "../interfaces";

export default function ImageOptionsDialog({ 
  open, 
  onClose, 
  imageElement, 
  onResize, 
  onAlign, 
  onDelete 
}: ImageOptionsDialogProps) {
  const [width, setWidth] = useState("");
  const [alignment, setAlignment] = useState("");
  
  // Initialize values when dialog opens
  useState(() => {
    if (imageElement) {
      // Get current image width
      setWidth(imageElement.style.width || "");
      
      // Get current alignment
      if (imageElement.style.float === "left") {
        setAlignment("left");
      } else if (imageElement.style.float === "right") {
        setAlignment("right");
      } else if (imageElement.style.margin === "0 auto" || imageElement.style.display === "block") {
        setAlignment("center");
      } else {
        setAlignment("");
      }
    }
  });
  
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };
  
  const handleAlignmentChange = (e: SelectChangeEvent) => {
    setAlignment(e.target.value);
  };
  
  const handleApply = () => {
    if (width) {
      onResize(width.includes("%") ? width : `${width}%`);
    }
    if (alignment) {
      onAlign(alignment);
    }
    onClose();
  };
  
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="image-options-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="image-options-dialog-title">Image Options</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="width"
          label="Width (%)"
          type="text"
          fullWidth
          variant="outlined"
          value={width}
          onChange={handleWidthChange}
          placeholder="e.g., 50 for 50%"
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth variant="outlined">
          <InputLabel id="alignment-label">Alignment</InputLabel>
          <Select
            labelId="alignment-label"
            id="alignment"
            value={alignment}
            onChange={handleAlignmentChange}
            label="Alignment"
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="left">Left</MenuItem>
            <MenuItem value="center">Center</MenuItem>
            <MenuItem value="right">Right</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="error" sx={{ mr: "auto" }}>Delete</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} color="primary">Apply</Button>
      </DialogActions>
    </Dialog>
  );
} 