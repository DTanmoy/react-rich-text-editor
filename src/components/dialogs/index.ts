/**
 * React Rich Text Editor
 * Dialog Components Index
 * @author Tanmoy Bhadra
 */

/**
 * @file Exports all dialog components used in the rich text editor
 * @module dialogs
 */

/** Dialog for adding a new row or column to a table */
export { default as AddTablePartDialog } from './AddTablePartDialog';

/** Dialog for inserting and editing code blocks with syntax highlighting */
export { default as CodeDialog } from './CodeDialog';

/** Dialog for selecting font colors for text */
export { default as FontColorDialog } from './FontColorDialog';

/** Dialog for selecting highlight colors for text */
export { default as HighlightColorDialog } from './HighlightColorDialog';

/** Dialog for inserting images by URL */
export { default as ImageDialog } from './ImageDialog';

/** Dialog for adjusting image properties (size, alignment) */
export { default as ImageOptionsDialog } from './ImageOptionsDialog';

/** Dialog for inserting hyperlinks */
export { default as LinkDialog } from './LinkDialog';

/** Context menu for tables (appears on right-click) */
export { default as TableContextMenu } from './TableContextMenu';

/** Dialog for creating new tables with specified rows and columns */
export { default as TableDialog } from './TableDialog';

/** Dialog for selecting and inserting emoji characters */
export { default as EmojiDialog } from './EmojiDialog';

/** Dialog for previewing images in larger size */
export { default as ImagePreviewDialog } from './ImagePreviewDialog';

/** Dialog for uploading and attaching files */
export { default as AttachmentDialog } from './AttachmentDialog'; 