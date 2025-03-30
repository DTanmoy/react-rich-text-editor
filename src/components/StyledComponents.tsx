import { styled } from "@mui/material/styles";

export const CustomEditable = styled("div")<{
  isExpanded: boolean;
  fontSize?: string | number;
  fontFamily?: string;
}>(({ theme, isExpanded, fontSize, fontFamily }) => ({
  width: "100%",
  minHeight: isExpanded ? "200px" : "40px",
  maxHeight: isExpanded ? "none" : "100px",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  fontSize: fontSize || theme.typography.body1.fontSize,
  fontFamily: fontFamily || theme.typography.fontFamily,
  outline: "none",
  padding: "8px 12px",
  flex: 1,
  overflow: "auto",
  "&:empty:before": {
    content: "attr(data-placeholder)",
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
  "& img": {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    margin: "8px 0",
  },
  "& table": {
    borderCollapse: "collapse",
    width: "100%",
    margin: "8px 0",
    tableLayout: "fixed",
    border: "1px solid #ccc",
  },
  "& th, & td": {
    border: "1px solid #ccc",
    padding: "8px",
    minWidth: "50px",
    wordBreak: "break-word",
    verticalAlign: "top",
  },
  "& th": {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    textAlign: "left",
  },
  "& p": {
    margin: "0.5em 0",
  },
  // Added improved styling for lists
  "& ul, & ol": {
    padding: "0 0 0 24px",
    margin: "8px 0",
  },
  "& ul": {
    listStyleType: "disc",
  },
  "& ol": {
    listStyleType: "decimal",
  },
  "& li": {
    margin: "4px 0",
    padding: "0 0 0 4px",
  },
  // Ensure nested lists have proper styling
  "& ul ul": {
    listStyleType: "circle",
  },
  "& ul ul ul": {
    listStyleType: "square",
  },
  "& ol ol": {
    listStyleType: "lower-alpha",
  },
  "& ol ol ol": {
    listStyleType: "lower-roman",
  },
})); 