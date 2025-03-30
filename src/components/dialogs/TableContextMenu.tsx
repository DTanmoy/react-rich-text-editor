import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableContextMenuProps } from "../interfaces";

export default function TableContextMenu({ 
  anchorEl, 
  open, 
  onClose, 
  onAddRow, 
  onAddColumn, 
  onDeleteRow, 
  onDeleteColumn, 
  onDeleteTable 
}: TableContextMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={onAddRow}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Row</ListItemText>
      </MenuItem>
      <MenuItem onClick={onAddColumn}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Column</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onDeleteRow}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Row</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDeleteColumn}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Column</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onDeleteTable}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Table</ListItemText>
      </MenuItem>
    </Menu>
  );
} 