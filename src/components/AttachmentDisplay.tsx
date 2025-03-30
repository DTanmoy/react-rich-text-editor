/**
 * React Rich Text Editor
 * Attachment Display Component
 * @author Tanmoy Bhadra
 */
import React from "react";
import { Box, Paper, Typography, styled, IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * Styled container for displaying an attachment
 * Provides a paper-like appearance with appropriate spacing and styling
 */
const AttachmentContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  maxWidth: '100%',
  wordBreak: 'break-word',
}));

/**
 * Styled container for the file type icon
 * Centers the icon and applies appropriate sizing and spacing
 */
const FileIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  '& svg': {
    fontSize: '2rem',
  },
}));

/**
 * Represents a file attachment with its metadata
 * @interface AttachmentFile
 */
export interface AttachmentFile {
  /** Unique identifier for the attachment */
  id: string;
  /** Filename of the attachment */
  name: string;
  /** MIME type of the attachment (e.g., 'image/png', 'application/pdf') */
  type: string;
  /** File size in bytes */
  size: number;
  /** URL to access the file (could be a blob URL or network URL) */
  url: string;
}

/**
 * Props for the AttachmentDisplay component
 * @interface AttachmentDisplayProps
 */
interface AttachmentDisplayProps {
  /** The attachment file to display */
  file: AttachmentFile;
  /** Optional callback for when the user wants to delete the attachment */
  onDelete?: (id: string) => void;
  /** Whether editing actions (like delete) are allowed on this attachment */
  isEditable?: boolean;
}

/**
 * Formats a file size in bytes to a human-readable string with appropriate units
 * 
 * @param {number} bytes - The file size in bytes
 * @returns {string} A formatted string (e.g., "2.5 MB")
 */
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Component to display a file attachment with icon, name, size, and action buttons
 * 
 * @component
 * @example
 * // Display an image attachment with delete capability
 * <AttachmentDisplay 
 *   file={{id: '123', name: 'photo.jpg', type: 'image/jpeg', size: 1024000, url: 'https://example.com/photo.jpg'}}
 *   onDelete={handleDeleteAttachment}
 * />
 */
const AttachmentDisplay: React.FC<AttachmentDisplayProps> = ({ 
  file, 
  onDelete,
  isEditable = true
}) => {
  /**
   * Determines which icon to show based on the file's MIME type
   * 
   * @returns {JSX.Element} The appropriate Material-UI icon component
   */
  const getFileIcon = () => {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <ImageIcon />;
      case 'application':
        if (file.type.includes('pdf')) {
          return <PictureAsPdfIcon />;
        }
        return <DescriptionIcon />;
      case 'audio':
        return <AudioFileIcon />;
      case 'video':
        return <VideocamIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  /**
   * Handles the download button click by creating a temporary anchor element
   * and programmatically clicking it to trigger the download
   */
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Handles the delete button click by calling the onDelete callback with the file ID
   */
  const handleDelete = () => {
    if (onDelete) {
      onDelete(file.id);
    }
  };

  return (
    <AttachmentContainer elevation={1}>
      <FileIcon>
        {getFileIcon()}
      </FileIcon>
      
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography variant="subtitle2" component="div" noWrap>
          {file.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {formatFileSize(file.size)}
        </Typography>
      </Box>
      
      <Box>
        <Tooltip title="Download">
          <IconButton size="small" onClick={handleDownload}>
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        {isEditable && onDelete && (
          <Tooltip title="Remove">
            <IconButton size="small" onClick={handleDelete} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </AttachmentContainer>
  );
};

export default AttachmentDisplay; 