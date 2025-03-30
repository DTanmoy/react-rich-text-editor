import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip } from "@mui/material";
import { HighlightColorDialogProps } from "../interfaces";

// Predefined highlight colors
const HIGHLIGHT_COLORS = [
  "#FFFF00", // Yellow
  "#00FFFF", // Cyan
  "#FF00FF", // Magenta
  "#00FF00", // Lime
  "#FF9900", // Orange
  "#FF99CC", // Pink
  "#99CCFF", // Light Blue
  "#CCCCCC", // Light Grey
];

export default function HighlightColorDialog({ open, onClose, onSelect }: HighlightColorDialogProps) {
  const handleColorSelect = (color: string) => {
    onSelect(color);
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="highlight-color-dialog-title"
    >
      <DialogTitle id="highlight-color-dialog-title">Highlight Color</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', pt: 1 }}>
          {HIGHLIGHT_COLORS.map((color) => (
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