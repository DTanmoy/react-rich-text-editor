/**
 * React Rich Text Editor
 * Styled Components
 * @author Tanmoy Bhadra
 */
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

/**
 * A custom styled editable component for the rich text editor
 * 
 * This component provides the main editable area with various styling options for
 * the editor, including the ability to expand/collapse, custom font sizes, and
 * special styling for various HTML elements (images, links, tables, etc.)
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isExpanded=false] - Whether the editor is expanded to show more content
 * @param {string} [props.fontSize] - Custom font size for the editor content
 * @param {string} [props.fontFamily] - Custom font family for the editor content
 * 
 * @example
 * // Basic usage with expansion
 * <CustomEditable
 *   contentEditable
 *   isExpanded={true}
 *   fontSize="16px"
 *   fontFamily="Arial"
 * />
 */
export const CustomEditable = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'isExpanded' && prop !== 'fontSize' && prop !== 'fontFamily',
})<{
  isExpanded?: boolean;
  fontSize?: string;
  fontFamily?: string;
}>(({ theme, isExpanded, fontSize, fontFamily }) => ({
  width: "100%",
  padding: "8px 40px 8px 16px",
  outline: "none",
  minHeight: isExpanded ? "200px" : "40px",
  maxHeight: isExpanded ? "none" : "40px",
  overflowY: isExpanded ? "auto" : "hidden",
  fontFamily: fontFamily || "inherit",
  fontSize: fontSize || "inherit",
  textAlign: "left",
  verticalAlign: "top",
  
  // Add style for images to show cursor:zoom-in to indicate clickability
  "& img": {
    cursor: "zoom-in",
    maxWidth: "100%",
  },

  // Add styles for attachment links and containers
  "& a[data-attachment-id]": {
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.primary.main,
    fontWeight: 500,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  
  // Style for attachment containers (spans)
  "& span > a[data-attachment-id]": {
    display: "inline-block",
    verticalAlign: "middle",
  },

  "&:empty:before": {
    content: "attr(data-placeholder)",
    color: theme.palette.text.secondary,
    pointerEvents: "none",
    display: "block",
    position: "absolute",
    top: "8px",
    left: "16px",
  },

  wordBreak: "break-word",
  flexGrow: 1,
  transition: "min-height 0.2s ease",
  position: "relative",

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