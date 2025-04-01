/**
 * React Rich Text Editor
 * App Component
 * @author Tanmoy Bhadra
 */

import Editor from "./components/Editor";

function App() {

  return (
    <Editor 
    value={''} 
    onChange={() => {}}
    placeholder="Type your message here..."
    borderColor="#ccc"
    fontSize={16}
    fontFamily="Arial, sans-serif"
    onSend={() => {}}
    onDelete={() => {
      // Handle the delete operation
      console.log('Editor content cleared');
    }}
    // attachments={false}
  />
  );
}

export default App;
