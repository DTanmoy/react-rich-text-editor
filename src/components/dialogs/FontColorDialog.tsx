/**
 * React Rich Text Editor
 * Font Color Dialog Component
 * @author Tanmoy Bhadra
 */

import React from 'react';
// Material UI
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface FontColorDialogProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (color: string) => void;
}

// Predefined font colors in a 4x2 grid matching the image
const FONT_COLORS = [
  // Row 1
  "#CD5C5C", // Indian Red
  "#E9967A", // Dark Salmon
  "#FFD700", // Gold
  "#BDB76B", // Dark Khaki
  // Row 2
  "#3CB371", // Medium Sea Green
  "#20B2AA", // Light Sea Green
  "#4169E1", // Royal Blue
  "#9370DB", // Medium Purple
];

export default function FontColorDialog({ open, anchorEl, onClose, onSelect }: FontColorDialogProps) {
  const handleColorSelect = (color: string) => {
    onSelect(color);
    onClose();
  };
  
  const handleAutomaticColor = () => {
    onSelect("currentColor"); // Default text color 
    onClose();
  };
  
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        sx: {
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: 0,
          maxWidth: '245px',
          overflow: 'visible'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '180px' }}>
        <Button 
          fullWidth 
          onClick={handleAutomaticColor}
          sx={{ 
            justifyContent: 'center',
            py: 1.5,
            color: 'rgba(0,0,0,0.6)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: 'normal'
          }}
        >
          Automatic
        </Button>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', p: 1 }}>
          {FONT_COLORS.map((color) => (
            <Box
              key={color}
              onClick={() => handleColorSelect(color)}
              sx={{
                width: '100%',
                paddingBottom: '100%', // Creates a square
                backgroundColor: color,
                borderRadius: '4px',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.1)',
                '&:hover': {
                  border: '1px solid rgba(0,0,0,0.3)',
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Popover>
  );
} 