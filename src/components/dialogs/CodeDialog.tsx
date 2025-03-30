import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { CodeDialogProps } from "../interfaces";

export default function CodeDialog({ open, onClose, onConfirm }: CodeDialogProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  
  const handleConfirm = () => {
    onConfirm(code, language);
    // Reset
    setCode("");
    onClose();
  };
  
  const handleDialogClose = () => {
    setCode("");
    onClose();
  };
  
  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={handleDialogClose} 
      aria-labelledby="code-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="code-dialog-title">Insert Code</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2, mt: 1 }}>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            label="Language"
          >
            <MenuItem value="javascript">JavaScript</MenuItem>
            <MenuItem value="typescript">TypeScript</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="csharp">C#</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
            <MenuItem value="php">PHP</MenuItem>
            <MenuItem value="ruby">Ruby</MenuItem>
            <MenuItem value="go">Go</MenuItem>
            <MenuItem value="rust">Rust</MenuItem>
            <MenuItem value="swift">Swift</MenuItem>
            <MenuItem value="kotlin">Kotlin</MenuItem>
            <MenuItem value="html">HTML</MenuItem>
            <MenuItem value="css">CSS</MenuItem>
            <MenuItem value="sql">SQL</MenuItem>
            <MenuItem value="json">JSON</MenuItem>
            <MenuItem value="xml">XML</MenuItem>
            <MenuItem value="markdown">Markdown</MenuItem>
            <MenuItem value="bash">Bash</MenuItem>
            <MenuItem value="plaintext">Plain Text</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Code"
          multiline
          rows={8}
          fullWidth
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
          InputProps={{
            style: { fontFamily: "monospace" }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm}
          color="primary"
          disabled={!code.trim()}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
} 