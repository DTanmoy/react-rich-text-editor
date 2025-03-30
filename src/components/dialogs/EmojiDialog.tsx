import React from 'react';
import { 
  Popover,
  Grid, 
  Paper, 
  IconButton, 
  Typography, 
  styled 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const categories = [
  { name: 'Smileys', emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡'] },
  { name: 'Gestures', emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '👐', '🤲', '🤝', '🙏'] },
  { name: 'Animals', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦄', '🦓', '🦍', '🐘', '🦒'] },
  { name: 'Food', emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🌮', '🍕', '🍔', '🍟', '🍦', '🍩'] },
  { name: 'Travel', emojis: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '✈️', '🚀', '🛸', '🚁', '⛵', '🚢', '🚂', '🚆', '🚇', '🚊', '🚉', '🏖️', '🏕️', '🏔️', '🌋'] },
  { name: 'Objects', emojis: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖱️', '🖨️', '🖋️', '📖', '🔋', '🔌', '💡', '🔦', '🕯️', '🧯', '📷', '🎥', '🎞️', '📞', '☎️', '📟', '📠', '📺', '🧭'] },
];

const EmojiGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const EmojiButton = styled(Paper)(({ theme }) => ({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '20px',
  margin: '2px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CategoryTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  fontWeight: 'bold',
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  maxHeight: '400px',
  overflowY: 'auto',
}));

interface EmojiDialogProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiDialog = ({ open, anchorEl, onClose, onEmojiSelect }: EmojiDialogProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        sx: { 
          minWidth: '360px',
          maxWidth: '400px'
        }
      }}
    >
      <TitleContainer>
        <Typography variant="h6">Emojis</Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </TitleContainer>
      <ContentContainer>
        {categories.map((category) => (
          <div key={category.name}>
            <CategoryTitle variant="subtitle1">{category.name}</CategoryTitle>
            <EmojiGrid container>
              {category.emojis.map((emoji, index) => (
                <EmojiButton 
                  key={`${category.name}-${index}`} 
                  onClick={() => {
                    onEmojiSelect(emoji);
                    onClose();
                  }}
                  elevation={0}
                >
                  {emoji}
                </EmojiButton>
              ))}
            </EmojiGrid>
          </div>
        ))}
      </ContentContainer>
    </Popover>
  );
};

export default EmojiDialog; 