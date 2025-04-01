import { FC } from 'react';

// Editor component interface
interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  borderColor?: string;
  fontSize?: number;
  fontFamily?: string;
  onSend?: () => void;
}

// Export the Editor component
export declare const Editor: FC<EditorProps>;

// Export other utilities and types
export * from '../components/interfaces';
export * from '../components/EditorUtils'; 