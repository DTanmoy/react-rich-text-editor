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

interface DropZoneProps {
  isDragActive: boolean;
}

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

interface FileWithPreview extends File {
  id: string;
  previewUrl?: string;
}

interface AttachmentDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (files: FileWithPreview[]) => void;
}

const AttachmentDialog = ({ open, onClose, onConfirm }: AttachmentDialogProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

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

  const handleConfirm = () => {
    setUploading(true);
    
    // Simulate file upload - in a real application, you would implement actual file upload logic here
    setTimeout(() => {
      setUploading(false);
      onConfirm(files);
      onClose();
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
          sx={{ mb: 2 }}
        >
          <FileUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop Files Here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to browse
          </Typography>
          <VisuallyHiddenInput
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
          />
        </DropZone>
        
        {uploading && (
          <Box sx={{ my: 2 }}>
            <LinearProgress />
          </Box>
        )}
        
        {files.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1">Selected Files ({files.length})</Typography>
              <Button size="small" onClick={clearAll} startIcon={<DeleteIcon />} color="error">
                Clear All
              </Button>
            </Box>
            
            <Divider />
            
            <List>
              {files.map((file, index) => (
                <React.Fragment key={file.id}>
                  <ListItem>
                    <ListItemIcon>
                      {getFileIcon(file)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={file.name} 
                      secondary={formatFileSize(file.size)} 
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => removeFile(file.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < files.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          disabled={files.length === 0 || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachmentDialog; 