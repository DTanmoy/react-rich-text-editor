/**
 * Rich Text Editor Component
 *
 * Features include:
 * - Basic text formatting (bold, italic, underline, etc.)
 * - Lists (bullet and numbered)
 * - Links and images
 * - Tables with formatting options
 * - Code blocks with syntax highlighting
 * - Image resizing with drag handles (positioned at corners and edges)
 * - Color controls for text and highlighting
 */

import {
  useState,
  useRef,
  useEffect,
  MouseEvent as ReactMouseEvent,
} from "react";
import {
  Box,
  IconButton,
  Toolbar,
  Divider,
  Collapse,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import TableChartIcon from "@mui/icons-material/TableChart";
import GridOnIcon from "@mui/icons-material/GridOn";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import CropIcon from "@mui/icons-material/Crop";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { EditorProps, HandlePosition, CSSPositionProperty } from "./interfaces";
import { CustomEditable } from "./StyledComponents";
import {
  LinkDialog,
  ImageDialog,
  ImageOptionsDialog,
  TableDialog,
  CodeDialog,
  HighlightColorDialog,
  FontColorDialog,
  AddTablePartDialog,
  TableContextMenu,
  EmojiDialog,
  ImagePreviewDialog,
} from "./dialogs";
import { findAncestorByTagName, getBlocksInRange } from "./EditorUtils";

export default function Editor({
  width = "100%",
  placeholder = "Type a message",
  value = "",
  onChange,
  borderColor,
  fontSize,
  fontFamily,
  onSend,
}: EditorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [tableDialogOpen, setTableDialogOpen] = useState(false);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [imageOptionsDialogOpen, setImageOptionsDialogOpen] = useState(false);
  const [selectedImageElement, setSelectedImageElement] =
    useState<HTMLImageElement | null>(null);
  const [resizeHandlesVisible, setResizeHandlesVisible] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [resizeStartDimensions, setResizeStartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [resizeStartPosition, setResizeStartPosition] = useState({
    x: 0,
    y: 0,
  });
  const [currentResizeHandle, setCurrentResizeHandle] = useState<string | null>(
    null
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const open = Boolean(anchorEl);
  const [imageMenuAnchorEl, setImageMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const imageMenuOpen = Boolean(imageMenuAnchorEl);
  const [addTablePartDialogOpen, setAddTablePartDialogOpen] = useState(false);
  const [tableContextMenuAnchorEl, setTableContextMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const tableContextMenuOpen = Boolean(tableContextMenuAnchorEl);
  const [selectedTableElement, setSelectedTableElement] = useState<{
    table: HTMLTableElement | null;
    row: HTMLTableRowElement | null;
    cell: HTMLTableCellElement | null;
  }>({
    table: null,
    row: null,
    cell: null,
  });
  const [codeMenuAnchorEl, setCodeMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const codeMenuOpen = Boolean(codeMenuAnchorEl);
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const [fontColorDialogAnchorEl, setFontColorDialogAnchorEl] = useState<HTMLElement | null>(null);
  const fontColorDialogOpen = Boolean(fontColorDialogAnchorEl);
  const [highlightColorDialogAnchorEl, setHighlightColorDialogAnchorEl] = useState<HTMLElement | null>(null);
  const highlightColorDialogOpen = Boolean(highlightColorDialogAnchorEl);
  const [fontSizeMenuAnchorEl, setFontSizeMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const fontSizeMenuOpen = Boolean(fontSizeMenuAnchorEl);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [emojiDialogAnchorEl, setEmojiDialogAnchorEl] = useState<HTMLElement | null>(null);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

  // Store selection manually rather than in React state to avoid re-renders
  const selectionRef = useRef<{
    startContainer: Node | null;
    startOffset: number;
    endContainer: Node | null;
    endOffset: number;
  } | null>(null);

  // Function to save the current selection more reliably
  const saveSelectionRange = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      selectionRef.current = {
        startContainer: range.startContainer,
        startOffset: range.startOffset,
        endContainer: range.endContainer,
        endOffset: range.endOffset,
      };
      console.log("Saved selection range manually:", selectionRef.current);
      return true;
    }
    return false;
  };

  // Function to restore a saved selection more reliably
  const restoreSelectionRange = () => {
    if (selectionRef.current && editorRef.current) {
      try {
        const selection = window.getSelection();
        const range = document.createRange();

        if (selection) {
          // Create a new range with saved positions
          const { startContainer, startOffset, endContainer, endOffset } =
            selectionRef.current;

          if (startContainer && endContainer) {
            // Ensure nodes are still in the DOM
            let startInDOM = false;
            let endInDOM = false;

            // Check if start container is in editor
            let node = startContainer;
            while (node) {
              if (node === editorRef.current) {
                startInDOM = true;
                break;
              }
              if (node.parentNode) {
                node = node.parentNode;
              } else {
                break;
              }
            }

            // Check if end container is in editor
            node = endContainer;
            while (node) {
              if (node === editorRef.current) {
                endInDOM = true;
                break;
              }
              if (node.parentNode) {
                node = node.parentNode;
              } else {
                break;
              }
            }

            if (startInDOM && endInDOM) {
              range.setStart(startContainer, startOffset);
              range.setEnd(endContainer, endOffset);

              selection.removeAllRanges();
              selection.addRange(range);
              console.log("Restored selection range manually");
              return true;
            }
          }
        }
      } catch (e) {
        console.error("Error restoring selection range:", e);
      }
    }
    console.log("Failed to restore selection range");
    return false;
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleMenuClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    console.log("Editor expanded:", !isExpanded);
  };

  const handleSend = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      console.log("Editor content sent:", content);

      if (onSend) {
        onSend();
      }
    }
  };

  // Add this helper function before updateContent function
  const getCleanContent = (editorElement: HTMLElement): string => {
    // Create a clone of the editor content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorElement.innerHTML;
    
    // Remove all resize handles and containers from the clone
    const resizeHandles = tempDiv.querySelectorAll('.resize-handles-container, .resize-handle');
    resizeHandles.forEach(handle => {
      if (handle.parentNode) {
        handle.parentNode.removeChild(handle);
      }
    });
    
    return tempDiv.innerHTML;
  };

  const updateContent = () => {
    if (editorRef.current && onChange) {
      // Get the content without the resize handles
      const content = getCleanContent(editorRef.current);
      
      onChange(content);
      console.log("Content updated:", content);
    }
  };

  const execCommand = (
    command: string,
    value: string = "",
    actionName: string = command
  ) => {
    // Ensure the editor is focused
    if (editorRef.current) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.focus();
      }

      try {
        // For basic formatting commands, use our modern alternatives when possible
        let success = false;

        if (
          command === "bold" ||
          command === "italic" ||
          command === "underline" ||
          command === "strikeThrough" ||
          command === "hiliteColor" ||
          command === "backColor" ||
          command === "foreColor" ||
          command === "removeFormat" ||
          command === "insertHTML"
        ) {
          success = applyFormatDirectly(command, value);
        }

        if (!success) {
          // Fallback to deprecated method
          document.execCommand(command, false, value);
        }

        // Update the parent component with new content
        updateContent();
        console.log(`Applied ${actionName} formatting`);
      } catch (error) {
        console.error(`Error applying ${actionName} formatting:`, error);
      }
    }
  };

  const applyFormatDirectly = (
    command: string,
    value: string = ""
  ): boolean => {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return false;

      const range = selection.getRangeAt(0);

      switch (command) {
        case "bold": {
          if (range.collapsed) return false;
          const boldElement = document.createElement("strong");
          applyInlineFormatting(range, boldElement);
          return true;
        }

        case "italic": {
          if (range.collapsed) return false;
          const italicElement = document.createElement("em");
          applyInlineFormatting(range, italicElement);
          return true;
        }

        case "underline": {
          if (range.collapsed) return false;
          const underlineElement = document.createElement("u");
          applyInlineFormatting(range, underlineElement);
          return true;
        }

        case "strikeThrough": {
          if (range.collapsed) return false;
          const strikeElement = document.createElement("s");
          applyInlineFormatting(range, strikeElement);
          return true;
        }

        case "hiliteColor":
        case "backColor": {
          if (range.collapsed) return false;
          const highlightElement = document.createElement("span");
          highlightElement.style.backgroundColor = value;
          applyInlineFormatting(range, highlightElement);
          return true;
        }

        case "foreColor": {
          if (range.collapsed) return false;
          const colorElement = document.createElement("span");
          colorElement.style.color = value;
          applyInlineFormatting(range, colorElement);
          return true;
        }

        case "insertHTML": {
          range.deleteContents();
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = value;
          const fragment = document.createDocumentFragment();
          while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
          }
          range.insertNode(fragment);
          return true;
        }

        case "removeFormat":
          // This is more complex to handle manually, so we'll use execCommand
          return false;
      }

      return false;
    } catch (error) {
      console.error("Error in applyFormatDirectly:", error);
      return false;
    }
  };

  const applyInlineFormatting = (
    range: Range,
    formattingElement: HTMLElement
  ) => {
    const contents = range.extractContents();
    formattingElement.appendChild(contents);
    range.insertNode(formattingElement);

    // Restore selection
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();

      // Create a new range at the end of our inserted element
      const newRange = document.createRange();
      newRange.selectNodeContents(formattingElement);
      newRange.collapse(false);
      selection.addRange(newRange);
    }
  };

  const handleBold = () => execCommand("bold", "", "Bold");
  const handleItalic = () => execCommand("italic", "", "Italic");
  const handleUnderline = () => execCommand("underline", "", "Underline");
  const handleStrikethrough = () =>
    execCommand("strikeThrough", "", "Strikethrough");

  const handleBulletList = () => {
    // Try to apply list formatting with our custom method
    const success = applyListFormatting("ul");

    if (!success) {
      // Fallback to execCommand if our method fails
      execCommand("insertUnorderedList", "", "Bullet List");
    } else {
      updateContent();
    }
  };

  const handleNumberList = () => {
    // Try to apply list formatting with our custom method
    const success = applyListFormatting("ol");

    if (!success) {
      // Fallback to execCommand if our method fails
      execCommand("insertOrderedList", "", "Numbered List");
    } else {
      updateContent();
    }
  };

  const applyListFormatting = (listType: "ol" | "ul"): boolean => {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return false;

      const range = selection.getRangeAt(0);

      // Get blocks in the current selection
      const blocks = getBlocksInRange(range);

      if (blocks.length === 0) {
        // No blocks found, create a new list with a single item
        const listElement = document.createElement(listType);
        const listItem = document.createElement("li");

        // If we have a text selection, use it as the list item content
        if (!range.collapsed) {
          listItem.appendChild(range.extractContents());
        }

        listElement.appendChild(listItem);
        range.insertNode(listElement);

        // Place cursor inside the list item
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(listItem);
        newRange.collapse(false);
        selection.addRange(newRange);

        return true;
      } else {
        // Transform existing blocks into list items
        const listElement = document.createElement(listType);
        const insertAfter = blocks[0].previousSibling;
        const insertBefore = blocks[blocks.length - 1].nextSibling;
        const parentNode = blocks[0].parentNode;

        // Check if the block is already in a list of the same type
        const isAlreadyInList = (block: HTMLElement): boolean => {
          let parent = block.parentElement;
          while (parent) {
            if (parent.tagName.toLowerCase() === listType) {
              return true;
            }
            if (parent === editorRef.current) {
              break;
            }
            parent = parent.parentElement;
          }
          return false;
        };

        // Handle blocks already in lists
        const blocksAlreadyInList = blocks.filter(isAlreadyInList);

        if (blocksAlreadyInList.length > 0) {
          // Some blocks are already in a list of this type, remove them from the list
          blocksAlreadyInList.forEach((block) => {
            // Find the list item containing this block
            const listItem = findAncestorByTagName(block, "li");
            if (listItem && listItem.parentNode) {
              // If this is the only content in the list item, remove the entire list item
              if (
                listItem.childNodes.length === 1 ||
                (listItem.childNodes.length === 1 &&
                  listItem.firstChild === block)
              ) {
                listItem.parentNode.removeChild(listItem);
              } else {
                // Otherwise, just extract the block from the list item
                listItem.parentNode.insertBefore(block, listItem);
              }
            }
          });

          // Don't continue with the rest of the function
          return true;
        }

        // For each block, create a list item and move the block's contents into it
        blocks.forEach((block) => {
          const listItem = document.createElement("li");

          // Move all child nodes from the block to the list item
          while (block.firstChild) {
            listItem.appendChild(block.firstChild);
          }

          // Add the list item to our list
          listElement.appendChild(listItem);

          // Remove the original block
          if (block.parentNode) {
            block.parentNode.removeChild(block);
          }
        });

        // Insert the new list into the document
        if (parentNode) {
          if (insertBefore) {
            parentNode.insertBefore(listElement, insertBefore);
          } else if (insertAfter && insertAfter.nextSibling) {
            parentNode.insertBefore(listElement, insertAfter.nextSibling);
          } else {
            parentNode.appendChild(listElement);
          }
        } else if (editorRef.current) {
          editorRef.current.appendChild(listElement);
        }

        return true;
      }
    } catch (error) {
      console.error("Error in applyListFormatting:", error);
      return false;
    }
  };

  const handleQuote = () => execCommand("formatBlock", "<blockquote>", "Quote");

  const handleCodeButtonClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setCodeMenuAnchorEl(event.currentTarget);
  };

  const handleCodeMenuClose = () => {
    setCodeMenuAnchorEl(null);
  };

  const handleInlineCode = () => {
    // Close the menu
    handleCodeMenuClose();

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      // Create a code element and apply it
      const codeElement = document.createElement("code");
      codeElement.style.fontFamily = "monospace";
      codeElement.style.backgroundColor = "#f5f5f5";
      codeElement.style.padding = "2px 4px";
      codeElement.style.borderRadius = "3px";

      applyInlineFormatting(range, codeElement);
      updateContent();
    }
  };

  const handleMarkdownCode = () => {
    handleCodeMenuClose();
    setCodeDialogOpen(true);
    saveSelectionRange();
  };

  const handleMarkdownCodeConfirm = (code: string, language: string) => {
    // Create pre and code elements
    const preElement = document.createElement("pre");
    const codeElement = document.createElement("code");

    // Set language class if specified
    if (language && language !== "plaintext") {
      codeElement.className = `language-${language}`;
    }

    // Escape HTML characters in code
    codeElement.textContent = code;

    // Build the code block
    preElement.appendChild(codeElement);
    preElement.style.backgroundColor = "#f5f5f5";
    preElement.style.padding = "16px";
    preElement.style.borderRadius = "4px";
    preElement.style.overflow = "auto";
    codeElement.style.fontFamily = "monospace";

    // Restore selection and insert the code block
    if (restoreSelectionRange()) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(preElement);

        // Move cursor after the inserted code block
        range.setStartAfter(preElement);
        range.setEndAfter(preElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // If we can't restore the selection, append to the end
      if (editorRef.current) {
        editorRef.current.appendChild(preElement);
      }
    }

    updateContent();
  };

  const handleClearFormatting = () => {
    execCommand("removeFormat", "", "Clear Formatting");
  };

  const handleDecreaseIndent = () => {
    execCommand("outdent", "", "Decrease Indent");
  };

  const handleIncreaseIndent = () => {
    execCommand("indent", "", "Increase Indent");
  };

  const handleHorizontalRule = () => {
    execCommand("insertHorizontalRule", "", "Horizontal Rule");
  };

  const handleLink = () => {
    setLinkDialogOpen(true);
    saveSelectionRange();
  };

  const handleLinkConfirm = (url: string, text: string) => {
    // Create a link element
    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.textContent = text;
    linkElement.target = "_blank"; // Open in new tab
    linkElement.rel = "noopener noreferrer"; // Security best practice

    // Restore selection and insert the link
    if (restoreSelectionRange()) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(linkElement);

        // Move cursor after the inserted link
        range.setStartAfter(linkElement);
        range.setEndAfter(linkElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // If we can't restore the selection, append to the end
      if (editorRef.current) {
        editorRef.current.appendChild(linkElement);
      }
    }

    updateContent();
  };

  const handleImage = () => {
    setImageDialogOpen(true);
    saveSelectionRange();
  };

  const handleImageConfirm = (url: string, alt: string) => {
    // Create an image element
    const imgElement = document.createElement("img");
    imgElement.src = url;
    imgElement.alt = alt;
    imgElement.style.maxWidth = "100%";

    // Restore selection and insert the image
    if (restoreSelectionRange()) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(imgElement);

        // Move cursor after the inserted image
        range.setStartAfter(imgElement);
        range.setEndAfter(imgElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // If we can't restore the selection, append to the end
      if (editorRef.current) {
        editorRef.current.appendChild(imgElement);
      }
    }

    updateContent();
  };

  const handleTable = () => {
    setTableDialogOpen(true);
    saveSelectionRange();
  };

  const handleTableConfirm = (rows: number, columns: number) => {
    // Create table elements
    const tableElement = document.createElement("table");
    tableElement.style.width = "100%";
    tableElement.style.borderCollapse = "collapse";
    tableElement.style.border = "1px solid #ccc";
    tableElement.style.margin = "16px 0";

    // Create header row
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (let i = 0; i < columns; i++) {
      const th = document.createElement("th");
      th.textContent = `Header ${i + 1}`;
      th.style.border = "1px solid #ccc";
      th.style.padding = "8px";
      th.style.backgroundColor = "#f5f5f5";
      th.style.fontWeight = "bold";
      th.style.textAlign = "left";
      th.style.minWidth = "50px";
      th.style.wordBreak = "break-word";
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    tableElement.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    for (let i = 0; i < rows - 1; i++) {
      // -1 because we already added header row
      const row = document.createElement("tr");

      for (let j = 0; j < columns; j++) {
        const cell = document.createElement("td");
        cell.textContent = `Cell ${i + 1},${j + 1}`;
        cell.style.border = "1px solid #ccc";
        cell.style.padding = "8px";
        cell.style.minWidth = "50px";
        cell.style.wordBreak = "break-word";
        cell.style.verticalAlign = "top";
        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }

    tableElement.appendChild(tbody);

    // Restore selection and insert the table
    if (restoreSelectionRange()) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();

        // Create a wrapper paragraph to ensure proper spacing around the table
        const wrapperP = document.createElement("p");
        wrapperP.appendChild(tableElement);
        range.insertNode(wrapperP);

        // Move cursor after the inserted table
        range.setStartAfter(wrapperP);
        range.setEndAfter(wrapperP);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // If we can't restore the selection, append to the end
      if (editorRef.current) {
        const wrapperP = document.createElement("p");
        wrapperP.appendChild(tableElement);
        editorRef.current.appendChild(wrapperP);
      }
    }

    updateContent();
  };

  const handleAddTablePartClick = () => {
    if (!verifyTableSelection()) {
      console.warn("No valid table element selected for add operation");
      return;
    }
    setAddTablePartDialogOpen(true);
  };

  const handleAddColumn = () => {
    console.log("handleAddColumn called, selectedTableElement:", selectedTableElement);
    
    if (selectedTableElement.table && selectedTableElement.cell) {
      const table = selectedTableElement.table;
      const cellIndex = selectedTableElement.cell.cellIndex;
      
      console.log("Adding column, details:", { 
        tableRows: table.rows.length,
        cellIndex 
      });

      // Calculate the column number (for header text)
      const columnNumber = cellIndex + 2; // +1 because we're adding after, +1 for 1-based numbering

      // Add a cell to each row
      const rows = table.rows;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const isHeaderRow = findAncestorByTagName(row, "thead") !== null || row.querySelector("th") !== null;
        
        // Create appropriate cell type (th for header, td for body)
        const newCell = isHeaderRow ? document.createElement("th") : document.createElement("td");
        
        // Set cell content based on whether it's a header or not
        newCell.textContent = isHeaderRow ? `Header ${columnNumber}` : `New Cell`;
        
        // Add styling
        newCell.style.border = "1px solid #ccc";
        newCell.style.padding = "8px";
        newCell.style.minWidth = "50px";
        newCell.style.wordBreak = "break-word";
        newCell.style.verticalAlign = "top";

        if (isHeaderRow) {
          // Header cell styling
          newCell.style.backgroundColor = "#f5f5f5";
          newCell.style.fontWeight = "bold";
          newCell.style.textAlign = "left";
        }

        // Insert at the correct position
        if (cellIndex >= 0 && cellIndex < row.cells.length) {
          row.insertBefore(newCell, row.cells[cellIndex].nextSibling);
        } else {
          row.appendChild(newCell);
        }
      }

      updateContent();
    }
  };

  const handleAddRow = () => {
    console.log("handleAddRow called, selectedTableElement:", selectedTableElement);
    
    if (selectedTableElement.table && selectedTableElement.row) {
      const table = selectedTableElement.table;
      const rowIndex = selectedTableElement.row.rowIndex;
      
      // Get tbody, creating it if needed
      const tbody = ensureTableBodyExists(table);
      const thead = table.querySelector("thead");
      
      console.log("Adding row, details:", { 
        tableRows: table.rows.length,
        rowIndex,
        hasTbody: !!tbody,
        hasThead: !!thead
      });

      // Create a new row
      const newRow = document.createElement("tr");

      // Add cells to match the column count
      const columnCount = selectedTableElement.row.cells.length;
      for (let i = 0; i < columnCount; i++) {
        const newCell = document.createElement("td");
        newCell.textContent = `New Cell`;
        newCell.style.border = "1px solid #ccc";
        newCell.style.padding = "8px";
        newCell.style.minWidth = "50px";
        newCell.style.wordBreak = "break-word";
        newCell.style.verticalAlign = "top";
        newRow.appendChild(newCell);
      }

      // Insert at the correct position based on whether the row is in thead or tbody
      if (findAncestorByTagName(selectedTableElement.row, "thead")) {
        // If in header, add to thead
        if (thead) {
          thead.appendChild(newRow);
        }
      } else {
        // For tbody rows, insert after the selected row
        const tbodyRowIndex = rowIndex - (thead ? thead.rows.length : 0);
        const nextRow = tbodyRowIndex + 1 < tbody.rows.length ? tbody.rows[tbodyRowIndex + 1] : null;
        
        if (nextRow) {
          tbody.insertBefore(newRow, nextRow);
        } else {
          tbody.appendChild(newRow);
        }
      }

      updateContent();
    }
  };

  const handleDelete = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      updateContent();
    }
  };

  const handleClearAll = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      updateContent();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Support common keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            handleBold();
            break;
          case "i":
            e.preventDefault();
            handleItalic();
            break;
          case "u":
            e.preventDefault();
            handleUnderline();
            break;
          case "k":
            e.preventDefault();
            handleLink();
            break;
        }
      }
    };

    const handleEditorClick = (e: Event) => {
      const target = e.target as HTMLElement;

      // Handle clicks on images
      if (target.tagName === "IMG") {
        const img = target as HTMLImageElement;
        setSelectedImageElement(img);

        // Check if user is holding ctrl/cmd key (for editing) or regular click (for preview)
        if (e instanceof MouseEvent && (e.ctrlKey || e.metaKey)) {
          // Show image edit menu with ctrl/cmd+click
          setImageMenuAnchorEl(target);
        } else {
          // Regular click - show preview
          e.preventDefault(); // Prevent default behavior
          setImagePreviewOpen(true);
        }
      } else {
        // Close image menu if clicking elsewhere
        setImageMenuAnchorEl(null);

        // Check if clicking on or inside a table cell
        const findTableElements = (element: HTMLElement) => {
          const cell = findAncestorByTagName(element, "td") || findAncestorByTagName(element, "th");
          if (!cell) return null;
          
          const row = findAncestorByTagName(cell, "tr");
          if (!row) return null;
          
          const table = findAncestorByTagName(row, "table");
          if (!table) return null;
          
          return {
            table: table as HTMLTableElement,
            row: row as HTMLTableRowElement,
            cell: cell as HTMLTableCellElement
          };
        };
        
        const tableElements = findTableElements(target);
        
        if (tableElements) {
          console.log("Table cell selected:", { 
            table: tableElements.table, 
            row: tableElements.row, 
            cell: tableElements.cell,
            cellIndex: tableElements.cell.cellIndex,
            rowIndex: tableElements.row.rowIndex
          });
          
          // Store a reference to the selected table elements
          setSelectedTableElement(tableElements);
        }
      }
    };

    const handleContextMenu = (e: Event) => {
      const target = e.target as HTMLElement;

      // Handle right-clicks on tables
      const cell =
        findAncestorByTagName(target, "td") ||
        findAncestorByTagName(target, "th");
      if (cell) {
        const row = findAncestorByTagName(cell, "tr");
        const table = row ? findAncestorByTagName(row, "table") : null;

        if (row && table) {
          e.preventDefault();

          setSelectedTableElement({
            table: table as HTMLTableElement,
            row: row as HTMLTableRowElement,
            cell: cell as HTMLTableCellElement,
          });

          setTableContextMenuAnchorEl(target);
        }
      }
    };

    // Handle mouse interactions for image resizing
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if we're clicking on a resize handle
      if (target.classList.contains("resize-handle") && selectedImageElement) {
        e.preventDefault();
        setResizing(true);

        // Store which handle we're dragging
        const handleName = target.getAttribute("data-handle");
        setCurrentResizeHandle(handleName);

        // Store starting dimensions and position
        const rect = selectedImageElement.getBoundingClientRect();
        setResizeStartDimensions({
          width: rect.width,
          height: rect.height,
        });

        setResizeStartPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    // Add this variable for tracking hover timeout
    let hoverTimeout: number | null = null;

    // Update the handleMouseMove function to debounce the hover detection
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing && selectedImageElement && currentResizeHandle) {
        e.preventDefault();

        // Calculate how far we've moved from the starting position
        const deltaX = e.clientX - resizeStartPosition.x;
        const deltaY = e.clientY - resizeStartPosition.y;
        const aspectRatio = resizeStartDimensions.width / resizeStartDimensions.height;

        // Calculate new width based on the resize handle being used
        let newWidth = resizeStartDimensions.width;

        // Use a more precise and smoother calculation for each handle type
        switch (currentResizeHandle) {
          case "right":
            newWidth = Math.max(resizeStartDimensions.width + deltaX, 50);
            break;
          case "bottom-right":
            newWidth = Math.max(resizeStartDimensions.width + deltaX, 50);
            break;
          case "top-right":
            newWidth = Math.max(resizeStartDimensions.width + deltaX, 50);
            break;
          case "left":
            newWidth = Math.max(resizeStartDimensions.width - deltaX, 50);
            break;
          case "bottom-left":
            newWidth = Math.max(resizeStartDimensions.width - deltaX, 50);
            break;
          case "top-left":
            newWidth = Math.max(resizeStartDimensions.width - deltaX, 50);
            break;
          case "top":
            // For top handle, maintain aspect ratio based on vertical movement
            newWidth = Math.max(resizeStartDimensions.width - deltaY * aspectRatio, 50);
            break;
          case "bottom":
            // For bottom handle, maintain aspect ratio based on vertical movement
            newWidth = Math.max(resizeStartDimensions.width + deltaY * aspectRatio, 50);
            break;
        }

        // Set a percentage-based width for more predictable resizing
        const containerWidth = editorRef.current?.clientWidth || 1;
        const widthPercentage = (newWidth / containerWidth) * 100;
        
        // Update the image with percentage-based width
        selectedImageElement.style.width = `${widthPercentage}%`;
        selectedImageElement.style.height = "auto"; // Maintain aspect ratio

        // Use requestAnimationFrame for smoother updates
        window.requestAnimationFrame(() => {
          // Update resize handle positions
          updateResizeHandlePositions();
        });
      }

      // Show resize handles when hovering over an image with debouncing
      if (!resizing) {
        const target = e.target as HTMLElement;

        if (target.tagName === "IMG") {
          // Clear any existing timeout
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }
          
          // Set the image element immediately
          setSelectedImageElement(target as HTMLImageElement);
          
          // But add a small delay before showing handles to prevent flickering
          hoverTimeout = setTimeout(() => {
            addResizeHandles();
          }, 100);
        } else if (target.className !== 'resize-handle') {
          // When moving away from image and not onto a handle, set a timeout to hide handles
          if (hoverTimeout) {
            clearTimeout(hoverTimeout);
          }
          
          hoverTimeout = setTimeout(() => {
            // Only hide if we're not currently resizing
            if (!resizing) {
              removeResizeHandles();
            }
          }, 300);
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (resizing) {
        e.preventDefault();
        setResizing(false);
        setCurrentResizeHandle(null);

        // Use a small delay before updating content to ensure all DOM updates are complete
        setTimeout(() => {
          // Update content storage after resize is complete
          updateContent();
        }, 50);
      }
    };

    const addResizeHandles = () => {
      // If we have a selected image and it doesn't already have resize handles
      if (selectedImageElement && editorRef.current) {
        // Remove any existing handles first to prevent duplicates
        removeResizeHandles();

        // Get accurate image and editor positions
        const imageRect = selectedImageElement.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();

        // Create container for handles
        const handleContainer = document.createElement("div");
        handleContainer.className = "resize-handles-container";
        handleContainer.style.position = "absolute";
        handleContainer.style.top = `${
          imageRect.top - editorRect.top + editorRef.current.scrollTop
        }px`;
        handleContainer.style.left = `${
          imageRect.left - editorRect.left + editorRef.current.scrollLeft
        }px`;
        handleContainer.style.width = `${imageRect.width}px`;
        handleContainer.style.height = `${imageRect.height}px`;
        handleContainer.style.pointerEvents = "none"; // Let clicks pass through to the image
        handleContainer.style.zIndex = "999";
        handleContainer.style.transition = "all 0.05s ease"; // Add smooth transition for repositioning

        // Define handle positions
        const handlePositions: Record<string, HandlePosition> = {
          "top-left": { top: "-6px", left: "-6px" },
          top: { top: "-6px", left: "50%" },
          "top-right": { top: "-6px", right: "-6px" },
          right: { top: "50%", right: "-6px" },
          "bottom-right": { bottom: "-6px", right: "-6px" },
          bottom: { bottom: "-6px", left: "50%" },
          "bottom-left": { bottom: "-6px", left: "-6px" },
          left: { top: "50%", left: "-6px" },
        };

        // Create handles
        Object.entries(handlePositions).forEach(([handleName, position]) => {
          const handle = document.createElement("div");
          handle.className = "resize-handle";
          handle.setAttribute("data-handle", handleName);
          handle.style.position = "absolute";
          handle.style.width = "12px";
          handle.style.height = "12px";
          handle.style.backgroundColor = "#1976d2";
          handle.style.border = "2px solid white";
          handle.style.borderRadius = "50%";
          handle.style.pointerEvents = "auto"; // Make handles clickable
          handle.style.zIndex = "1000";
          handle.style.cursor = `${handleName}-resize`; // Set appropriate cursor

          // Apply position
          Object.entries(position).forEach(([prop, value]) => {
            const cssProperty = prop as CSSPositionProperty;
            handle.style[cssProperty] = value;
          });

          // Center handles on edges
          if (position.left === "50%") {
            handle.style.transform = "translateX(-50%)";
          }
          if (position.top === "50%") {
            handle.style.transform = "translateY(-50%)";
          }
          if (position.left === "50%" && position.top === "50%") {
            handle.style.transform = "translate(-50%, -50%)";
          }

          handleContainer.appendChild(handle);
        });

        // Add the handles to the editor
        editorRef.current.appendChild(handleContainer);

        // Mark resize handles as visible
        setResizeHandlesVisible(true);
      }
    };

    const removeResizeHandles = () => {
      // Remove any existing resize handles
      const handles = document.querySelectorAll(".resize-handles-container");
      handles.forEach((handle) => {
        if (handle.parentNode) {
          handle.parentNode.removeChild(handle);
        }
      });

      setResizeHandlesVisible(false);
    };

    const updateResizeHandlePositions = () => {
      if (selectedImageElement && editorRef.current && resizeHandlesVisible) {
        const handleContainer = document.querySelector('.resize-handles-container') as HTMLElement;
        
        if (handleContainer) {
          // Get updated positions
          const imageRect = selectedImageElement.getBoundingClientRect();
          const editorRect = editorRef.current.getBoundingClientRect();
          
          // Update container position
          handleContainer.style.top = `${
            imageRect.top - editorRect.top + editorRef.current.scrollTop
          }px`;
          handleContainer.style.left = `${
            imageRect.left - editorRect.left + editorRef.current.scrollLeft
          }px`;
          handleContainer.style.width = `${imageRect.width}px`;
          handleContainer.style.height = `${imageRect.height}px`;
        } else {
          // If container doesn't exist, re-create handles
          removeResizeHandles();
          addResizeHandles();
        }
      }
    };

    // Add event listeners when component mounts
    if (editorRef.current) {
      editorRef.current.addEventListener("keydown", handleKeyDown);
      editorRef.current.addEventListener("click", handleEditorClick);
      editorRef.current.addEventListener("contextmenu", handleContextMenu);
      editorRef.current.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Update size of resize handles when window resizes
      const handleWindowResize = () => {
        if (resizeHandlesVisible) {
          removeResizeHandles();
          addResizeHandles();
        }
      };
      window.addEventListener("resize", handleWindowResize);

      // Update position of resize handles when editor scrolls
      const handleEditorScroll = () => {
        if (resizeHandlesVisible) {
          removeResizeHandles();
          addResizeHandles();
        }
      };
      editorRef.current.addEventListener("scroll", handleEditorScroll);

      // Return cleanup function
      return () => {
        // Create a copy of the ref value to handle the cleanup properly
        const editorElement = editorRef.current;
        if (editorElement) {
          editorElement.removeEventListener("keydown", handleKeyDown);
          editorElement.removeEventListener("click", handleEditorClick);
          editorElement.removeEventListener("contextmenu", handleContextMenu);
          editorElement.removeEventListener("mousedown", handleMouseDown);
          editorElement.removeEventListener("scroll", handleEditorScroll);
        }
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleWindowResize);
        
        // Also clear any pending timeouts
        if (hoverTimeout) {
          clearTimeout(hoverTimeout);
        }
      };
    }
  // Add the missing dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    resizing,
    selectedImageElement,
    resizeHandlesVisible,
    resizeStartDimensions,
    resizeStartPosition,
    currentResizeHandle,
    // Add missing dependencies
    handleBold,
    handleItalic,
    handleUnderline,
    handleLink,
    updateContent
  ]);

  const handleImageResize = (width: string) => {
    if (selectedImageElement) {
      selectedImageElement.style.width = width;
      selectedImageElement.style.height = "auto"; // Maintain aspect ratio
      updateContent();
    }
    setImageOptionsDialogOpen(false);
  };

  const handleImageAlign = (align: string) => {
    if (selectedImageElement) {
      switch (align) {
        case "left":
          selectedImageElement.style.float = "left";
          selectedImageElement.style.margin = "0 16px 16px 0";
          selectedImageElement.style.display = "block";
          break;
        case "center":
          selectedImageElement.style.float = "none";
          selectedImageElement.style.margin = "16px auto";
          selectedImageElement.style.display = "block";
          break;
        case "right":
          selectedImageElement.style.float = "right";
          selectedImageElement.style.margin = "0 0 16px 16px";
          selectedImageElement.style.display = "block";
          break;
        default:
          selectedImageElement.style.float = "none";
          selectedImageElement.style.margin = "16px 0";
          selectedImageElement.style.display = "inline-block";
      }
      updateContent();
    }
    setImageOptionsDialogOpen(false);
  };

  const handleImageDelete = () => {
    if (selectedImageElement && selectedImageElement.parentNode) {
      selectedImageElement.parentNode.removeChild(selectedImageElement);
      updateContent();
    }
    setImageOptionsDialogOpen(false);
  };

  const handleImageMenuClose = () => {
    setImageMenuAnchorEl(null);
  };

  const handleQuickAlign = (align: string) => {
    handleImageMenuClose();
    handleImageAlign(align);
  };

  const handleOpenImageOptions = () => {
    handleImageMenuClose();
    setImageOptionsDialogOpen(true);
  };

  const handleTableContextMenuClose = () => {
    setTableContextMenuAnchorEl(null);
  };

  // Add this function to verify if the table selection exists and is valid
  const verifyTableSelection = (): boolean => {
    // First check if table elements exist
    if (!selectedTableElement.table || !selectedTableElement.row || !selectedTableElement.cell) {
      console.warn("No table element selected!");
      return false;
    }
    
    // Then verify that table elements are still connected to DOM
    const isTableInDOM = document.contains(selectedTableElement.table);
    const isRowInDOM = document.contains(selectedTableElement.row);
    const isCellInDOM = document.contains(selectedTableElement.cell);
    
    if (!isTableInDOM || !isRowInDOM || !isCellInDOM) {
      console.warn("Table elements not in DOM anymore!");
      return false;
    }
    
    return true;
  };

  // Update the context menu handlers to use this check
  const handleContextAddRow = () => {
    if (verifyTableSelection()) {
      handleAddRow();
    }
    handleTableContextMenuClose();
  };

  const handleContextAddColumn = () => {
    if (verifyTableSelection()) {
      handleAddColumn();
    }
    handleTableContextMenuClose();
  };

  const handleContextDeleteRow = () => {
    if (selectedTableElement.table && selectedTableElement.row) {
      selectedTableElement.table.deleteRow(selectedTableElement.row.rowIndex);
      updateContent();
    }
    handleTableContextMenuClose();
  };

  const handleContextDeleteColumn = () => {
    if (selectedTableElement.table && selectedTableElement.cell) {
      const table = selectedTableElement.table;
      const cellIndex = selectedTableElement.cell.cellIndex;

      // Delete the cell at this index from each row
      for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        if (cellIndex >= 0 && cellIndex < row.cells.length) {
          row.deleteCell(cellIndex);
        }
      }

      updateContent();
    }
    handleTableContextMenuClose();
  };

  const handleContextDeleteTable = () => {
    if (selectedTableElement.table && selectedTableElement.table.parentNode) {
      selectedTableElement.table.parentNode.removeChild(
        selectedTableElement.table
      );
      updateContent();
    }
    handleTableContextMenuClose();
  };

  // Functions for selection saving and restoring
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedSelection(range.cloneRange());
      return true;
    }
    return false;
  };

  const restoreSelection = () => {
    if (savedSelection && editorRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
        return true;
      }
    }
    return false;
  };

  const handleHighlightColorClick = (event: React.MouseEvent<HTMLElement>) => {
    saveSelection();
    saveSelectionRange();
    setHighlightColorDialogAnchorEl(event.currentTarget);
  };

  const handleHighlightColorClose = () => {
    setHighlightColorDialogAnchorEl(null);
  };

  const handleFontColorClick = (event: React.MouseEvent<HTMLElement>) => {
    saveSelection();
    saveSelectionRange();
    setFontColorDialogAnchorEl(event.currentTarget);
  };

  const handleFontColorClose = () => {
    setFontColorDialogAnchorEl(null);
  };

  const handleFontSizeClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    saveSelection();
    setFontSizeMenuAnchorEl(event.currentTarget);
  };

  const handleFontSizeMenuClose = () => {
    setFontSizeMenuAnchorEl(null);
  };

  const handleFontSizeSelect = (size: string) => {
    handleFontSizeMenuClose();

    if (restoreSelection()) {
      document.execCommand("fontSize", false, size);
    }

    updateContent();
  };

  // Add this after the verifyTableSelection function
  const ensureTableBodyExists = (table: HTMLTableElement): HTMLTableSectionElement => {
    // Check if the table already has a tbody
    let tbody = table.querySelector('tbody');
    
    // If no tbody exists, create one and move all rows (except those in thead) to it
    if (!tbody) {
      tbody = document.createElement('tbody');
      
      // Get all direct tr children of the table that aren't in a thead
      const directRows = Array.from(table.children).filter(
        child => child.tagName === 'TR' && 
        (!child.parentElement || child.parentElement.tagName !== 'THEAD')
      ) as HTMLElement[];
      
      // Move these rows to the tbody
      directRows.forEach(row => {
        tbody!.appendChild(row);
      });
      
      // Add the tbody to the table
      table.appendChild(tbody);
    }
    
    return tbody as HTMLTableSectionElement;
  };

  // Add a minimal usage of the handleAddTablePartClick and handleDelete functions
  // Make unused functions used for table operations
  useEffect(() => {
    // Add this comment to fix unused variable warning
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlersForDebugging = {
      handleAddTablePartClick,
      handleDelete,
    };

    return () => {
      // Cleanup
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add back the highlight color handling functions
  const applyDirectHighlight = (color: string): boolean => {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed)
        return false;

      const range = selection.getRangeAt(0);

      // Handle already highlighted text
      const parentSpan = findAncestorByTagName(
        range.commonAncestorContainer,
        "span"
      );
      if (
        parentSpan &&
        parentSpan.style.backgroundColor &&
        parentSpan.style.backgroundColor !== "" &&
        range.startContainer === range.endContainer
      ) {
        // Just change the background color of the existing span
        parentSpan.style.backgroundColor = color;
        return true;
      }

      // Create a new span with the highlight color
      const highlightSpan = document.createElement("span");
      highlightSpan.style.backgroundColor = color;

      // Apply the formatting
      range.surroundContents(highlightSpan);

      // Restore selection to new span
      selection.removeAllRanges();
      selection.addRange(range);

      return true;
    } catch (error) {
      console.error("Error applying highlight:", error);
      return false;
    }
  };

  const handleHighlightColorSelect = (color: string) => {
    // Try to apply highlight with our modern method first
    let success = false;

    if (restoreSelectionRange()) {
      if (color === "transparent") {
        // Remove highlight by applying removeFormat command
        document.execCommand("removeFormat", false, "");
        success = true;
      } else {
        success = applyDirectHighlight(color);
      }
    }

    if (!success && color !== "transparent") {
      // Fallback to execCommand
      if (restoreSelection()) {
        document.execCommand("hiliteColor", false, color);
      }
    }

    updateContent();
    handleHighlightColorClose();
  };

  // Add back the font color handling functions
  const applyDirectFontColor = (color: string): boolean => {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed)
        return false;

      const range = selection.getRangeAt(0);

      // Handle already colored text
      const parentSpan = findAncestorByTagName(
        range.commonAncestorContainer,
        "span"
      );
      if (
        parentSpan &&
        parentSpan.style.color &&
        parentSpan.style.color !== "" &&
        range.startContainer === range.endContainer
      ) {
        // Just change the color of the existing span
        parentSpan.style.color = color;
        return true;
      }

      // Create a new span with the font color
      const colorSpan = document.createElement("span");
      colorSpan.style.color = color;

      // Apply the formatting
      range.surroundContents(colorSpan);

      // Restore selection to new span
      selection.removeAllRanges();
      selection.addRange(range);

      return true;
    } catch (error) {
      console.error("Error applying font color:", error);
      return false;
    }
  };

  const handleFontColorSelect = (color: string) => {
    // Try to apply font color with our modern method first
    let success = false;

    if (restoreSelectionRange()) {
      if (color === "currentColor") {
        // Remove color formatting by applying removeFormat command
        document.execCommand("removeFormat", false, "");
        success = true;
      } else {
        success = applyDirectFontColor(color);
      }
    }

    if (!success && color !== "currentColor") {
      // Fallback to execCommand
      if (restoreSelection()) {
        document.execCommand("foreColor", false, color);
      }
    }

    updateContent();
    handleFontColorClose();
  };

  // Add handler for emoji button click
  const handleEmojiClick = (event: React.MouseEvent<HTMLElement>) => {
    // Focus the editor first to ensure selection is in the editor
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    // Save both selection methods for better reliability
    saveSelection();
    saveSelectionRange();
    
    // Then open the emoji dialog
    setEmojiDialogAnchorEl(event.currentTarget);
    setEmojiDialogOpen(true);
  };

  // Add handler for emoji dialog close
  const handleEmojiClose = () => {
    setEmojiDialogOpen(false);
    setEmojiDialogAnchorEl(null);
  };

  // Add handler for emoji selection
  const handleEmojiSelect = (emoji: string) => {
    // First try with our manual selection restoration
    if (restoreSelectionRange()) {
      document.execCommand('insertText', false, emoji);
      updateContent();
      return;
    }
    
    // Then try with the React-managed selection
    if (restoreSelection()) {
      document.execCommand('insertText', false, emoji);
      updateContent();
      return;
    }
    
    // Last resort: if we can't restore the selection, insert at end of editor
    if (editorRef.current) {
      // Focus on the editor first
      editorRef.current.focus();
      
      // If the editor is empty or has only empty paragraphs, clear it first
      if (!editorRef.current.textContent?.trim()) {
        editorRef.current.innerHTML = '';
      }
      
      // Create a text node with the emoji
      const emojiNode = document.createTextNode(emoji);
      
      // Insert at cursor position if possible, otherwise at the end
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        // Try to use current selection
        try {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          range.insertNode(emojiNode);
          
          // Move cursor after the inserted emoji
          range.setStartAfter(emojiNode);
          range.setEndAfter(emojiNode);
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (e) {
          // If that fails, just append to the end
          console.error("Error inserting emoji at selection:", e);
          editorRef.current.appendChild(emojiNode);
        }
      } else {
        // No selection, append to the end
        editorRef.current.appendChild(emojiNode);
      }
      
      updateContent();
    }
  };

  const handleImagePreviewClose = () => {
    setImagePreviewOpen(false);
  };

  return (
    <Box
      sx={{
        width: width,
        border: `1px solid ${borderColor || "#e0e0e0"}`,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Collapse in={isExpanded}>
        <Toolbar
          variant="dense"
          sx={{
            borderBottom: "1px solid #e0e0e0",
            minHeight: "auto",
            padding: "4px",
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Tooltip title="Bold">
            <IconButton size="small" onClick={handleBold}>
              <FormatBoldIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Italic">
            <IconButton size="small" onClick={handleItalic}>
              <FormatItalicIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Underline">
            <IconButton size="small" onClick={handleUnderline}>
              <FormatUnderlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Strikethrough">
            <IconButton size="small" onClick={handleStrikethrough}>
              <FormatStrikethroughIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: "4px" }} />

          <Tooltip title="Bullet List">
            <IconButton size="small" onClick={handleBulletList}>
              <FormatListBulletedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Numbered List">
            <IconButton size="small" onClick={handleNumberList}>
              <FormatListNumberedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Quote">
            <IconButton size="small" onClick={handleQuote}>
              <FormatQuoteIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: "4px" }} />

          <Tooltip title="Font Size">
            <IconButton size="small" onClick={handleFontSizeClick}>
              <FormatSizeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Font color">
            <IconButton onClick={handleFontColorClick} size="small">
              <FormatColorTextIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Text highlight color">
            <IconButton onClick={handleHighlightColorClick} size="small">
              <FormatColorFillIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Insert emoji">
            <IconButton onClick={handleEmojiClick} size="small">
              <EmojiEmotionsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: "4px" }} />

          <Tooltip title="Link">
            <IconButton size="small" onClick={handleLink}>
              <LinkIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Image">
            <IconButton size="small" onClick={handleImage}>
              <ImageIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Table">
            <IconButton size="small" onClick={handleTable}>
              <TableChartIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Code">
            <IconButton size="small" onClick={handleCodeButtonClick}>
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={codeMenuAnchorEl}
            open={codeMenuOpen}
            onClose={handleCodeMenuClose}
          >
            <MenuItem onClick={handleInlineCode}>
              <ListItemIcon>
                <CodeIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Inline Code</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMarkdownCode}>
              <ListItemIcon>
                <GridOnIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Code Block</ListItemText>
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: "4px" }} />

          <Tooltip title="More Formatting">
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleClearFormatting}>
              <ListItemIcon>
                <FormatClearIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Clear Formatting</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDecreaseIndent}>
              <ListItemIcon>
                <FormatIndentDecreaseIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Decrease Indent</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleIncreaseIndent}>
              <ListItemIcon>
                <FormatIndentIncreaseIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Increase Indent</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleHorizontalRule}>
              <ListItemIcon>
                <HorizontalRuleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Horizontal Rule</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClearAll}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Clear All</ListItemText>
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={fontSizeMenuAnchorEl}
            open={fontSizeMenuOpen}
            onClose={handleFontSizeMenuClose}
          >
            <MenuItem onClick={() => handleFontSizeSelect("1")}>
              <ListItemText>Small</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFontSizeSelect("3")}>
              <ListItemText>Normal</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFontSizeSelect("5")}>
              <ListItemText>Large</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleFontSizeSelect("7")}>
              <ListItemText>Huge</ListItemText>
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={imageMenuAnchorEl}
            open={imageMenuOpen}
            onClose={handleImageMenuClose}
          >
            <MenuItem onClick={() => handleQuickAlign("left")}>
              <ListItemIcon>
                <FormatAlignLeftIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Align Left</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleQuickAlign("center")}>
              <ListItemIcon>
                <FormatAlignCenterIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Align Center</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleQuickAlign("right")}>
              <ListItemIcon>
                <FormatAlignRightIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Align Right</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleOpenImageOptions}>
              <ListItemIcon>
                <CropIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Image Options</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleImageDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete Image</ListItemText>
            </MenuItem>
          </Menu>

          <TableContextMenu
            anchorEl={tableContextMenuAnchorEl}
            open={tableContextMenuOpen}
            onClose={handleTableContextMenuClose}
            onAddRow={handleContextAddRow}
            onAddColumn={handleContextAddColumn}
            onDeleteRow={handleContextDeleteRow}
            onDeleteColumn={handleContextDeleteColumn}
            onDeleteTable={handleContextDeleteTable}
          />

          <EmojiDialog
            open={emojiDialogOpen}
            anchorEl={emojiDialogAnchorEl}
            onClose={handleEmojiClose}
            onEmojiSelect={handleEmojiSelect}
          />
        </Toolbar>
      </Collapse>

      <Box sx={{ display: "flex", position: "relative" }}>
        <CustomEditable
          contentEditable
          ref={editorRef}
          data-placeholder={placeholder}
          isExpanded={isExpanded}
          fontSize={typeof fontSize === 'number' ? `${fontSize}px` : fontSize}
          fontFamily={fontFamily}
          onInput={updateContent}
          sx={{
            minHeight: isExpanded ? "200px" : "40px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            display: "flex",
            gap: "4px",
          }}
        >
          <Tooltip title="Expand/Collapse">
            <IconButton
              size="small"
              onClick={toggleExpanded}
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Attach">
            <IconButton size="small">
              <AttachFileIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Send">
            <IconButton size="small" color="primary" onClick={handleSend}>
              <SendIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Dialogs */}
      <LinkDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onConfirm={handleLinkConfirm}
      />

      <ImageDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onConfirm={handleImageConfirm}
      />

      <ImageOptionsDialog
        open={imageOptionsDialogOpen}
        onClose={() => setImageOptionsDialogOpen(false)}
        imageElement={selectedImageElement}
        onResize={handleImageResize}
        onAlign={handleImageAlign}
        onDelete={handleImageDelete}
      />

      <TableDialog
        open={tableDialogOpen}
        onClose={() => setTableDialogOpen(false)}
        onConfirm={handleTableConfirm}
      />

      <CodeDialog
        open={codeDialogOpen}
        onClose={() => setCodeDialogOpen(false)}
        onConfirm={handleMarkdownCodeConfirm}
      />

      <HighlightColorDialog
        open={highlightColorDialogOpen}
        anchorEl={highlightColorDialogAnchorEl}
        onClose={handleHighlightColorClose}
        onSelect={handleHighlightColorSelect}
      />

      <FontColorDialog
        open={fontColorDialogOpen}
        anchorEl={fontColorDialogAnchorEl}
        onClose={handleFontColorClose}
        onSelect={handleFontColorSelect}
      />

      <AddTablePartDialog
        open={addTablePartDialogOpen}
        onClose={() => setAddTablePartDialogOpen(false)}
        onAddColumn={() => {
          if (verifyTableSelection()) {
            handleAddColumn();
          }
        }}
        onAddRow={() => {
          if (verifyTableSelection()) {
            handleAddRow();
          }
        }}
      />

      <ImagePreviewDialog
        open={imagePreviewOpen}
        onClose={handleImagePreviewClose}
        imageElement={selectedImageElement}
      />
    </Box>
  );
}
