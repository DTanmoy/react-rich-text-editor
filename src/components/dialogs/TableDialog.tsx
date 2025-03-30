import { useState, ChangeEvent } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material";
import { TableDialogProps } from "../interfaces";

export default function TableDialog({ open, onClose, onConfirm }: TableDialogProps) {
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(2);
  
  // Reset to default values when dialog opens
  useState(() => {
    if (open) {
      setRows(2);
      setColumns(2);
    }
  });
  
  const handleRowsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRows(value);
    } else {
      setRows(1);
    }
  };
  
  const handleColumnsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setColumns(value);
    } else {
      setColumns(1);
    }
  };
  
  const handleConfirm = () => {
    onConfirm(rows, columns);
    onClose();
  };

  const handleDialogClose = () => {
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={handleDialogClose} 
      aria-labelledby="table-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="table-dialog-title">Insert Table</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            margin="dense"
            id="rows"
            label="Rows"
            type="number"
            fullWidth
            variant="outlined"
            value={rows}
            onChange={handleRowsChange}
            inputProps={{ min: 1 }}
          />
          
          <TextField
            margin="dense"
            id="columns"
            label="Columns"
            type="number"
            fullWidth
            variant="outlined"
            value={columns}
            onChange={handleColumnsChange}
            inputProps={{ min: 1 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm}
          color="primary"
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
} 