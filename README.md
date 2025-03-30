# React Rich Text Editor

**Author:** Tanmoy Bhadra

A comprehensive, feature-rich text editor built with React and Material-UI. This editor provides an intuitive interface for creating and editing formatted content with a wide range of styling options and capabilities.

## ✨ Features

- **Rich Text Formatting**
  - Basic formatting (bold, italic, underline, strikethrough)
  - Text color and highlight color options
  - Font size adjustment
  - Quote blocks with proper styling
  - Clear formatting option

- **Lists and Structure**
  - Bullet lists with customizable styling
  - Numbered lists with proper formatting
  - Indentation control (increase/decrease)
  - Tab key support for nested lists

- **Media Integration**
  - Image insertion with URL
  - Image resizing with interactive handles
  - Image alignment options
  - File attachments with preview and download options

- **Advanced Components**
  - Table insertion and editing
  - Table context menu for easy manipulation
  - Code blocks with syntax highlighting
  - Horizontal rule insertion

- **Interactive Experience**
  - Emoji selector
  - Link creation and management
  - Selection-aware formatting
  - Format indication (active state for formatting buttons)
  - Send button for content submission

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/username/react-rich-text-editor.git

# Navigate to the project directory
cd react-rich-text-editor

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 💻 Usage

```jsx
import { Editor } from 'react-rich-text-editor';

function MyComponent() {
  const [content, setContent] = useState("<p>Hello World!</p>");
  
  const handleChange = (newContent) => {
    setContent(newContent);
    console.log("Content updated:", newContent);
  };
  
  const handleSend = () => {
    console.log("Sending content:", content);
    // Process the content as needed
  };

  return (
    <Editor 
      value={content}
      onChange={handleChange}
      placeholder="Type your message here..."
      borderColor="#ccc"
      fontSize={16}
      fontFamily="Arial, sans-serif"
      onSend={handleSend}
    />
  );
}
```

## 📝 Editor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | string \| number | '100%' | Width of the editor |
| `placeholder` | string | 'Type a message' | Placeholder text when editor is empty |
| `value` | string | '' | HTML content for the editor |
| `onChange` | function | - | Callback when editor content changes |
| `borderColor` | string | - | Border color of the editor container |
| `fontSize` | string \| number | - | Font size for editor content |
| `fontFamily` | string | - | Font family for editor content |
| `onSend` | function | - | Callback when send button is clicked |

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview

# Run linting
npm run lint
```

## 📋 Browser Support

The editor is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📚 Credits

- Built with [React](https://reactjs.org/)
- UI components from [Material-UI](https://mui.com/)
- Developed by Tanmoy Bhadra 