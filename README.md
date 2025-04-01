# React Rich Text Editor

A powerful and feature-rich React component for rich text editing with a modern Material-UI interface.

## Features

- 📝 Rich text formatting (bold, italic, underline, strikethrough)
- 📋 Lists (bullet and numbered)
- 🖼️ Image support with resizing and alignment
- 📊 Table support with context menu
- 🔗 Link insertion
- 💻 Code blocks (inline and markdown)
- 🎨 Text and background colors
- 📏 Font size control
- 😊 Emoji picker
- 📎 File attachments
- ⌨️ Keyboard shortcuts
- 🔄 Expandable/collapsible toolbar
- 🎯 Responsive design
- 🎨 Material-UI theming support

## Installation

```bash
npm install tanmoy-react-rich-text-editor
# or
yarn add tanmoy-react-rich-text-editor
```

## Usage

```jsx
import { Editor } from 'tanmoy-react-rich-text-editor';

function App() {
  const handleChange = (content) => {
    console.log('Editor content:', content);
  };

  const handleSend = () => {
    // Handle send action
    console.log('Send clicked');
  };

  return (
    <Editor
      width="100%"
      placeholder="Type a message..."
      value=""
      onChange={handleChange}
      onSend={handleSend}
      borderColor="#e0e0e0"
      fontSize="14px"
      fontFamily="Arial, sans-serif"
      defaultExpanded={false}
      attachments={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | string | "100%" | Width of the editor container |
| `placeholder` | string | "Type a message" | Placeholder text when editor is empty |
| `value` | string | "" | Initial content of the editor |
| `onChange` | function | - | Callback fired when content changes |
| `onSend` | function | - | Callback fired when send button is clicked |
| `borderColor` | string | - | Custom border color (falls back to theme) |
| `fontSize` | string/number | - | Custom font size |
| `fontFamily` | string | - | Custom font family |
| `defaultExpanded` | boolean | false | Whether editor starts expanded |
| `attachments` | boolean | true | Whether to show attachment button |
| `onDelete` | function | - | Callback fired when clear all is clicked |

## Keyboard Shortcuts

- `Ctrl/Cmd + B`: Bold
- `Ctrl/Cmd + I`: Italic
- `Ctrl/Cmd + U`: Underline
- `Ctrl/Cmd + K`: Insert Link

## Image Features

- Drag handles for resizing
- Context menu (right-click) for alignment and options
- Ctrl/Cmd + Click for quick options
- Click to preview
- Support for custom alignment and sizing

## Table Features

- Context menu for table operations
- Add/remove rows and columns
- Delete entire table
- Responsive design

## Code Block Features

- Inline code formatting
- Markdown code blocks with language support
- Syntax highlighting support

## Styling

The editor uses Material-UI theming and can be customized through:

1. Theme provider
2. Custom CSS
3. Component props

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this component in your projects.

## Author

Tanmoy Bhadra

## Support

If you encounter any issues or have questions, please open an issue in the GitHub repository. 