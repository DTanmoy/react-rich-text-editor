import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add to Table</DialogTitle>
      <DialogContent>
        <List>
          <ListItemButton onClick={handleAddRow}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Row" />
          </ListItemButton>
          <ListItemButton onClick={handleAddColumn}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Column" />
          </ListItemButton>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
} 