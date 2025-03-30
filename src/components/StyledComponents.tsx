import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const CustomEditable = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'isExpanded' && prop !== 'fontSize' && prop !== 'fontFamily',
})<{
  isExpanded?: boolean;
  fontSize?: string;
  fontFamily?: string;
}>(({ isExpanded, fontSize, fontFamily, theme }) => ({
  width: "100%",
  padding: "8px 16px",
  outline: "none",
  minHeight: isExpanded ? "200px" : "40px",
  maxHeight: isExpanded ? "none" : "40px",
  overflowY: isExpanded ? "auto" : "hidden",
  fontFamily: fontFamily || "inherit",
  fontSize: fontSize || "inherit",
  
  // Add style for images to show cursor:zoom-in to indicate clickability
  "& img": {
    cursor: "zoom-in",
    maxWidth: "100%",
  },

  // Add styles for attachment display
  "& .editor-attachments": {
    margin: "8px 0",
  },

  "& .editor-attachment": {
    display: "flex !important",
    alignItems: "center !important",
    padding: "8px 12px !important",
    margin: "8px 0 !important",
    border: `1px solid ${theme.palette.divider} !important`,
    borderRadius: `${theme.shape.borderRadius}px !important`,
    backgroundColor: `${theme.palette.background.paper} !important`,
    width: "auto !important",
    maxWidth: "100% !important",
    boxSizing: "border-box !important",
    contentEditable: "false !important",
  },

  "& .editor-attachment-content": {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
  },

  "& .attachment-icon": {
    fontSize: "24px !important",
    marginRight: "12px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },

  "& .attachment-details": {
    flexGrow: "1 !important",
    overflow: "hidden !important",
    width: "auto !important",
  },

  "& .attachment-name": {
    fontWeight: "bold !important",
    overflow: "hidden !important",
    textOverflow: "ellipsis !important",
    whiteSpace: "nowrap !important",
  },

  "& .attachment-size": {
    fontSize: "0.75rem !important",
    color: `${theme.palette.text.secondary} !important`,
  },

  "& .attachment-actions": {
    display: "flex !important",
    gap: "8px !important",
  },

  "& .attachment-download, & .attachment-delete": {
    background: "none !important",
    border: "none !important",
    cursor: "pointer !important",
    fontSize: "16px !important",
    padding: "4px !important",
    borderRadius: "4px !important",
    display: "flex !important",
    alignItems: "center !important",
    justifyContent: "center !important",
  },

  "& .attachment-delete:hover": {
    backgroundColor: `${theme.palette.error.light} !important`,
  },

  "& .attachment-download:hover": {
    backgroundColor: `${theme.palette.action.hover} !important`,
  },

  "&:empty:before": {
    content: "attr(data-placeholder)",
    color: theme.palette.text.secondary,
    pointerEvents: "none",
    display: "block",
  },

  wordBreak: "break-word",
  flexGrow: 1,
  transition: "min-height 0.2s ease",

  "& a": {
    color: "#1976d2",
    textDecoration: "none",
  },

  "& a:hover": {
    textDecoration: "underline",
  },

  "& p": {
    margin: "0.5em 0",
  },

  "& blockquote": {
    borderLeft: "4px solid #ddd",
    marginLeft: 0,
    paddingLeft: "16px",
    color: "#666",
  },

  "& pre": {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    borderRadius: "4px",
    overflow: "auto",
  },

  "& code": {
    fontFamily: "monospace",
    backgroundColor: "#f5f5f5",
    padding: "2px 4px",
    borderRadius: "3px",
  },

  "& table": {
    borderCollapse: "collapse",
    width: "100%",
    margin: "16px 0",
    border: "1px solid #ccc",
  },
  
  "& th, & td": {
    border: "1px solid #ccc",
    padding: "8px",
    minWidth: "50px",
    verticalAlign: "top",
    wordBreak: "break-word",
  },
  
  "& th": {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    textAlign: "left",
  },
})); 