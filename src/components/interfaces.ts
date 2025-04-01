/**
 * React Rich Text Editor
 * TypeScript Interfaces
 * @author Tanmoy Bhadra
 */

/**
 * Props for the main rich text Editor component
 * @interface EditorProps
 */
export interface EditorProps {
  /** Width of the editor, can be a string (e.g., '100%') or a number of pixels */
  width?: string | number;
  /** Placeholder text shown when the editor is empty */
  placeholder?: string;
  /** Initial HTML content of the editor */
  value?: string;
  /** Callback fired when the editor content changes */
  onChange?: (value: string) => void;
  /** Border color of the editor */
  borderColor?: string;
  /** Font size of the editor content, can be a string (e.g., '16px') or a number of pixels */
  fontSize?: string | number;
  /** Font family for the editor content */
  fontFamily?: string;
  /** Callback fired when the send button is clicked */
  onSend?: () => void;
  /** Default expanded state of the editor */
  defaultExpanded?: boolean;
  /** Callback fired when the delete operation is confirmed */
  onDelete?: () => void;
  /** Whether the editor has attachments */
  attachments?: boolean;
}

/**
 * Props for the link insertion dialog
 * @interface LinkDialogProps
 */
export interface LinkDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when a link is confirmed, providing the URL and display text */
  onConfirm: (url: string, text: string) => void;
}

/**
 * Props for the image insertion dialog
 * @interface ImageDialogProps
 */
export interface ImageDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when an image is confirmed, providing the URL and alt text */
  onConfirm: (url: string, alt: string) => void;
}

/**
 * Props for the image options dialog (resize, align, delete)
 * @interface ImageOptionsDialogProps
 */
export interface ImageOptionsDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** The image element being modified */
  imageElement: HTMLImageElement | null;
  /** Callback fired when the image is resized */
  onResize: (width: string) => void;
  /** Callback fired when the image alignment is changed */
  onAlign: (align: string) => void;
  /** Callback fired when the delete operation is confirmed */
  onDelete: () => void;
}

/**
 * Props for the table insertion dialog
 * @interface TableDialogProps
 */
export interface TableDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when a table creation is confirmed with rows and columns counts */
  onConfirm: (rows: number, columns: number) => void;
}

/**
 * Props for the dialog to add rows or columns to a table
 * @interface AddTablePartDialogProps
 */
export interface AddTablePartDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when adding a column is selected */
  onAddColumn: () => void;
  /** Callback fired when adding a row is selected */
  onAddRow: () => void;
}

/**
 * Props for the table context menu (right-click menu for tables)
 * @interface TableContextMenuProps
 */
export interface TableContextMenuProps {
  /** The HTML element that the context menu should be anchored to */
  anchorEl: HTMLElement | null;
  /** Whether the menu is open */
  open: boolean;
  /** Callback fired when the menu is closed */
  onClose: () => void;
  /** Callback fired when the "Add Row" option is selected */
  onAddRow: () => void;
  /** Callback fired when the "Add Column" option is selected */
  onAddColumn: () => void;
  /** Callback fired when the "Delete Row" option is selected */
  onDeleteRow: () => void;
  /** Callback fired when the "Delete Column" option is selected */
  onDeleteColumn: () => void;
  /** Callback fired when the "Delete Table" option is selected */
  onDeleteTable: () => void;
}

/**
 * Props for the code insertion dialog
 * @interface CodeDialogProps
 */
export interface CodeDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when code insertion is confirmed, with the code and language */
  onConfirm: (code: string, language: string) => void;
}

/**
 * Props for the highlight color selection dialog
 * @interface HighlightColorDialogProps
 */
export interface HighlightColorDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** The HTML element that the dialog should be anchored to */
  anchorEl: Element | null;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when a highlight color is selected */
  onSelect: (color: string) => void;
}

/**
 * Props for the font color selection dialog
 * @interface FontColorDialogProps
 */
export interface FontColorDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** The HTML element that the dialog should be anchored to */
  anchorEl: Element | null;
  /** Callback fired when the dialog is closed */
  onClose: () => void;
  /** Callback fired when a font color is selected */
  onSelect: (color: string) => void;
}

/**
 * Interface defining the position properties for resize handles
 * @interface HandlePosition
 */
export interface HandlePosition {
  /** Top position of the handle (CSS value) */
  top?: string;
  /** Left position of the handle (CSS value) */
  left?: string;
  /** Right position of the handle (CSS value) */
  right?: string;
  /** Bottom position of the handle (CSS value) */
  bottom?: string;
}

/**
 * CSS position property type for typesafe position handling
 * @type CSSPositionProperty
 */
export type CSSPositionProperty = 'top' | 'left' | 'right' | 'bottom'; 