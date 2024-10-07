import { useState } from "react";
import CommandInput from "./TextField";
import CommandHistory from "./CommandHistory";
import "./App.css"; // Import global CSS

function App() {
  const [commandList, setCommandList] = useState([]);

  return (
    <div className="app-container">
      <CommandHistory
        commandList={commandList}
        setCommandList={setCommandList}
      />

      <CommandInput commandList={commandList} setCommandList={setCommandList} />
    </div>
  );
}

export default App;
