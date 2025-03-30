import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

interface CustomEditableProps {
  isExpanded: boolean;
  fontSize?: string;
  fontFamily?: string;
}

export const CustomEditable = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isExpanded" && prop !== "fontSize" && prop !== "fontFamily",
})<CustomEditableProps>`
  padding: 16px;
  min-height: ${(props) => (props.isExpanded ? "200px" : "40px")};
  outline: none;
  overflow-y: auto;
  word-break: break-word;
  flex-grow: 1;
  transition: min-height 0.2s ease;
  font-size: ${(props) => props.fontSize || "inherit"};
  font-family: ${(props) => props.fontFamily || "inherit"};

  &[data-placeholder]:empty::before {
    content: attr(data-placeholder);
    color: #aaa;
    pointer-events: none;
  }

  a {
    color: #1976d2;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    margin: 0.5em 0;
  }

  blockquote {
    border-left: 4px solid #ddd;
    margin-left: 0;
    padding-left: 16px;
    color: #666;
  }

  pre {
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow: auto;
  }

  code {
    font-family: monospace;
    background-color: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
    border: 1px solid #ccc;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    min-width: 50px;
    vertical-align: top;
    word-break: break-word;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: bold;
    text-align: left;
  }
`; 