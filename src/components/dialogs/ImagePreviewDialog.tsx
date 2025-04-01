/**
 * React Rich Text Editor
 * Image Preview Dialog Component
 * @author Tanmoy Bhadra
 */

import React from 'react';

// Material UI
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Icons
import {
  CloseIcon,
  DownloadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '../icons';

const PreviewContainer = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  minHeight: '300px',
  maxHeight: '90vh',
  overflow: 'auto',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  display: 'flex',
  gap: theme.spacing(1),
  zIndex: 2,
}));

const StyledImage = styled('img')({
  maxWidth: '100%',
  maxHeight: 'calc(90vh - 48px)',
  objectFit: 'contain',
  transition: 'transform 0.3s ease',
});

interface ImagePreviewDialogProps {
  open: boolean;
  onClose: () => void;
  imageElement: HTMLImageElement | null;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({ open, onClose, imageElement }) => {
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const imageSrc = imageElement?.src || '';
  const imageAlt = imageElement?.alt || 'Image preview';

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleDownload = () => {
    if (imageSrc) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = imageAlt || 'image';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset zoom level when dialog opens
  React.useEffect(() => {
    if (open) {
      setZoomLevel(1);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 300 }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          margin: 0,
          width: '100%',
          maxWidth: '100%',
        }
      }}
    >
      <PreviewContainer>
        <ControlsContainer>
          <IconButton 
            size="small" 
            onClick={handleZoomIn} 
            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleZoomOut} 
            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={handleDownload} 
            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <DownloadIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={onClose} 
            sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <CloseIcon />
          </IconButton>
        </ControlsContainer>
        
        {imageSrc && (
          <StyledImage 
            src={imageSrc} 
            alt={imageAlt} 
            style={{ transform: `scale(${zoomLevel})` }}
          />
        )}
      </PreviewContainer>
    </Dialog>
  );
};

export default ImagePreviewDialog; 