import React, { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Box,
  styled,
  Divider,
  LinearProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideocamIcon from '@mui/icons-material/Videocam';

/**
 * Visually hidden input component for file uploads
 * Used to create a custom file input that can be triggered by other UI elements
 */
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

/**
 * Props for the file drop zone
 * @interface DropZoneProps
 */
interface DropZoneProps {
  /** Whether a file is currently being dragged over the drop zone */
  isDragActive: boolean;
}

/**
 * Styled drop zone component for drag-and-drop file uploads
 * Changes appearance based on whether a file is being dragged over it
 */
const DropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isDragActive',
})<DropZoneProps>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginBottom: theme.spacing(2),
}));

/**
 * Extended File interface with preview image URL and unique ID
 * @interface FileWithPreview
 * @extends File
 */
interface FileWithPreview extends File {
  /** Unique identifier for the file */
  id: string;
  /** URL for previewing the file (for images) */
  previewUrl?: string;
}

/**
 * Props for the AttachmentDialog component
 * @interface AttachmentDialogProps
 */
interface AttachmentDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback for when the dialog is closed */
  onClose: () => void;
  /** Callback for when files are confirmed, with the selected files */
  onConfirm: (files: FileWithPreview[]) => void;
}

/**
 * Dialog component for uploading file attachments
 * 
 * Features:
 * - Drag and drop file uploads
 * - File preview
 * - Multiple file selection
 * - File type icons
 * - File size formatting
 * 
 * @component
 * @param {AttachmentDialogProps} props - The component props
 */
const AttachmentDialog = ({ open, onClose, onConfirm }: AttachmentDialogProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Determines the appropriate icon to display based on file type
   * 
   * @param {File} file - The file to get an icon for
   * @returns {JSX.Element} The icon component to display
   */
  const getFileIcon = (file: File) => {
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
   * Handles the drag enter event, activating the drop zone
   * 
   * @param {React.DragEvent} e - The drag event
   */
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  /**
   * Handles the drag leave event, deactivating the drop zone
   * 
   * @param {React.DragEvent} e - The drag event
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  /**
   * Handles the drag over event, preventing default browser handling
   * 
   * @param {React.DragEvent} e - The drag event
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handles the drop event, processing dropped files
   * 
   * @param {React.DragEvent} e - The drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  /**
   * Handles file input change, processing selected files
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  /**
   * Processes newly added files, adding IDs and creating preview URLs
   * 
   * @param {FileList} fileList - The list of files to process
   */
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => {
      const newFile = file as FileWithPreview;
      newFile.id = Math.random().toString(36).substring(2, 9);
      
      // Generate preview URLs for images
      if (file.type.startsWith('image/')) {
        newFile.previewUrl = URL.createObjectURL(file);
      }
      
      return newFile;
    });
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  /**
   * Removes a file from the selected files list
   * Also revokes any object URLs to prevent memory leaks
   * 
   * @param {string} fileId - The ID of the file to remove
   */
  const removeFile = (fileId: string) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(file => file.id !== fileId);
      
      // Revoke URLs for any removed image files to prevent memory leaks
      const removedFile = prevFiles.find(file => file.id === fileId);
      if (removedFile?.previewUrl) {
        URL.revokeObjectURL(removedFile.previewUrl);
      }
      
      return updatedFiles;
    });
  };

  /**
   * Handles the confirm button click, simulating file upload
   * In a real application, this would send files to a server
   */
  const handleConfirm = () => {
    setUploading(true);
    
    // Simulate file upload - in a real application, you would implement actual file upload logic here
    setTimeout(() => {
      setUploading(false);
      onConfirm(files);
      onClose();
    }, 1000);
  };

  /**
   * Formats a file size in bytes to a human-readable string with appropriate units
   * 
   * @param {number} bytes - The file size in bytes
   * @returns {string} Formatted file size with units (e.g., "2.5 MB")
   */
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  /**
   * Clears all selected files and revokes any object URLs
   * to prevent memory leaks
   */
  const clearAll = () => {
    // Revoke all preview URLs before clearing
    files.forEach(file => {
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });
    setFiles([]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Upload Attachments</div>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <DropZone 
          isDragActive={isDragActive}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FileUploadIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
          <Typography variant="h6" gutterBottom>
            Drop files here or click to upload
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Supported file types: Images, PDFs, Documents, Audio, Video
          </Typography>
          <VisuallyHiddenInput
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            multiple
          />
        </DropZone>
        
        {files.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1">
                {files.length} {files.length === 1 ? 'file' : 'files'} selected
              </Typography>
              <Button 
                size="small" 
                onClick={clearAll}
                startIcon={<DeleteIcon />}
                color="error"
              >
                Clear All
              </Button>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <List>
              {files.map((file) => (
                <ListItem key={file.id} divider>
                  <ListItemIcon>
                    {getFileIcon(file)}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  {file.type.startsWith('image/') && file.previewUrl && (
                    <Box 
                      component="img" 
                      src={file.previewUrl} 
                      alt={file.name}
                      sx={{
                        height: 40,
                        width: 40,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mr: 1
                      }}
                    />
                  )}
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => removeFile(file.id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}
        
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Uploading files...
            </Typography>
            <LinearProgress />
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          color="primary"
          disabled={files.length === 0 || uploading}
          variant="contained"
        >
          {uploading ? 'Uploading...' : 'Add Attachments'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachmentDialog; 