export interface EditorProps {
  width?: string | number;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  borderColor?: string;
  fontSize?: string | number;
  fontFamily?: string;
  onSend?: () => void;
}

export interface LinkDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (url: string, text: string) => void;
}

export interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (url: string, alt: string) => void;
}

export interface ImageOptionsDialogProps {
  open: boolean;
  onClose: () => void;
  imageElement: HTMLImageElement | null;
  onResize: (width: string) => void;
  onAlign: (align: string) => void;
  onDelete: () => void;
}

export interface TableDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (rows: number, columns: number) => void;
}

export interface AddTablePartDialogProps {
  open: boolean;
  onClose: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
}

export interface TableContextMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onDeleteTable: () => void;
}

export interface CodeDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (code: string, language: string) => void;
}

export interface HighlightColorDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
}

export interface FontColorDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
}

export interface HandlePosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export type CSSPositionProperty = 'top' | 'left' | 'right' | 'bottom'; 