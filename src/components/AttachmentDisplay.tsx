import React from 'react';
import { Box, Paper, Typography, styled, IconButton, Tooltip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

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

export interface AttachmentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface AttachmentDisplayProps {
  file: AttachmentFile;
  onDelete?: (id: string) => void;
  isEditable?: boolean;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const AttachmentDisplay: React.FC<AttachmentDisplayProps> = ({ 
  file, 
  onDelete,
  isEditable = true
}) => {
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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