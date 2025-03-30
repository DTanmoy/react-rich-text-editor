import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip } from "@mui/material";
import { FontColorDialogProps } from "../interfaces";

// Predefined font colors
const FONT_COLORS = [
  "#000000", // Black
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FF9900", // Orange
  "#9900FF", // Purple
  "#009900", // Dark Green
  "#990000", // Dark Red
  "#000099", // Dark Blue
  "#999999", // Grey
  "#FFFFFF", // White
];

export default function FontColorDialog({ open, onClose, onSelect }: FontColorDialogProps) {
  const handleColorSelect = (color: string) => {
    onSelect(color);
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="font-color-dialog-title"
    >
      <DialogTitle id="font-color-dialog-title">Font Color</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', pt: 1 }}>
          {FONT_COLORS.map((color) => (
            <Tooltip key={color} title={color} arrow>
              <Box
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #999",
                  },
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
} 