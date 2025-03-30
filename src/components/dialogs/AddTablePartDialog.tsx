import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import { AddTablePartDialogProps } from "../interfaces";

export default function AddTablePartDialog({ 
  open, 
  onClose, 
  onAddColumn, 
  onAddRow 
}: AddTablePartDialogProps) {
  const handleAddColumn = () => {
    onAddColumn();
    onClose();
  };
  
  const handleAddRow = () => {
    onAddRow();
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="add-table-part-dialog-title"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="add-table-part-dialog-title">Add to Table</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 1 }}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleAddRow}
          >
            Add Row
          </Button>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleAddColumn}
          >
            Add Column
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
} 