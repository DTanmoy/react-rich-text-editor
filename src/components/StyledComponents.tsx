import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const CustomEditable = styled(Box)<{
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