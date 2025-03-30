/**
 * React Rich Text Editor
 * App Component
 * @author Tanmoy Bhadra
 */
import Box from "@mui/material/Box";
import Editor from "./components/Editor";
import { useState } from "react";
import { Typography } from "@mui/material";

function App() {
  const [content, setContent] = useState("<p>Hello World! This is a rich text editor.</p>");
  
  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        React Rich Text Editor
      </Typography>
      
      <Editor 
        value={content} 
        onChange={handleChange}
        placeholder="Type your message here..."
        borderColor="#ccc"
        fontSize={16}
        fontFamily="Arial, sans-serif"
        onSend={() => console.log("Content sent:", content)}
      />
      
      <Typography variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
        Try out the different formatting options in the toolbar above.
      </Typography>
    </Box>
  );
}

export default App;
