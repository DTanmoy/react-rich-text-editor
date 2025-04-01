/**
 * React Rich Text Editor
 * Table Context Menu Component
 * @author Tanmoy Bhadra
 */

import React from 'react';

// Material UI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Icons
import {
  DeleteIcon,
  AddIcon,
} from '../icons';

// Interfaces
interface TableContextMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onDeleteTable: () => void;
}

export default function TableContextMenu({
  anchorEl,
  open,
  onClose,
  onAddRow,
  onAddColumn,
  onDeleteRow,
  onDeleteColumn,
  onDeleteTable,
}: TableContextMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onAddRow} data-operation="add-row">
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Row</ListItemText>
      </MenuItem>
      <MenuItem onClick={onAddColumn} data-operation="add-column">
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Column</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onDeleteRow} data-operation="delete-row">
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Row</ListItemText>
      </MenuItem>
      <MenuItem onClick={onDeleteColumn} data-operation="delete-column">
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Column</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onDeleteTable} data-operation="delete-table">
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Table</ListItemText>
      </MenuItem>
    </Menu>
  );
} 