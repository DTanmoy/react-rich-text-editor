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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add to Table</DialogTitle>
      <DialogContent>
        <List>
          <ListItemButton onClick={onAddRow}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Row" />
          </ListItemButton>
          <ListItemButton onClick={onAddColumn}>
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