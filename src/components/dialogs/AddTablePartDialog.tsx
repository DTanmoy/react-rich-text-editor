/**
 * React Rich Text Editor
 * Add Table Part Dialog Component
 * @author Tanmoy Bhadra
 */

import React from 'react';
// Material UI
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

interface AddTablePartDialogProps {
  open: boolean;
  onClose: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

export default function AddTablePartDialog({ open, onClose, onAddRow, onAddColumn }: AddTablePartDialogProps) {
  
  const handleAddRow = () => {
    onAddRow();
    onClose();
  };
  
  const handleAddColumn = () => {
    onAddColumn();
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add to Table</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
          <Button 
            variant="outlined" 
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleAddRow}
            data-operation="add-row"
          >
            Add Row
          </Button>
          <Button 
            variant="outlined" 
            fullWidth
            startIcon={<AddIcon />}
            onClick={handleAddColumn}
            data-operation="add-column"
          >
            Add Column
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Select a table cell first to add rows or columns.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
} 