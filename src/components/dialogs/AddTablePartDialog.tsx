import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
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