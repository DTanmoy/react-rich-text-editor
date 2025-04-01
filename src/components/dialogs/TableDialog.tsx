/**
 * React Rich Text Editor
 * Table Dialog Component
 * @author Tanmoy Bhadra
 */

import { useState, ChangeEvent } from "react";

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

// Interfaces
import { TableDialogProps } from "../interfaces";

export default function TableDialog({
  open,
  onClose,
  onConfirm,
}: TableDialogProps) {
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <FormHelperText>Rows</FormHelperText>
            <OutlinedInput
              size="small"
              id="rows"
              placeholder="Rows"
              type="number"
              fullWidth
              value={rows}
              onChange={handleRowsChange}
              inputProps={{ min: 1 }}
            />
          </Box>

          <Box>
            <FormHelperText>Columns</FormHelperText>
            <OutlinedInput
              size="small"
              id="columns"
              placeholder="Columns"
              type="number"
              fullWidth
              value={columns}
              onChange={handleColumnsChange}
              inputProps={{ min: 1 }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}
