import { useState, useEffect } from "react";
import "./App.css";
import { FaArrowUp } from "react-icons/fa";
import CommandExecutor from "./server_hooks/CallServer";
import JSONMatcher from "./server_hooks/ValidateCommand";

function CommandInput({ commandList, setCommandList }) {
  const [command, setCommand] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [jsonCommands, setJsonCommands] = useState(null);

  useEffect(() => {
    // Load JSON file on component mount
    fetch("src/server_hooks/server_data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("JSON file loaded successfully:", data);
        setJsonData(data);
      })
      .catch((error) => console.error("Error loading JSON file:", error));
  }, []);

  const handleSendCommand = async () => {
    if (command.trim() !== "" && jsonData) {
      // Append the user's command to the command list
      setCommandList((prevList) => [...prevList, `User: ${command}`]);
      setCommand("");

      // Call JSONMatcher with the loaded JSON data
      const response = await JSONMatcher({
        jsonData,
        setCommandList,
        userCommand: command,
      });

      console.log(response); // Debugging valid value return

      // Check if a valid JSON object was returned
      if (Object.keys(response).length > 0) {
        // Set jsonCommands to trigger CommandExecutor rendering
        setJsonCommands([response]);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendCommand();
    }
  };

  return (
    <div className="command-container">
      <div className="command-input-wrapper">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your command and press Enter"
          className="command-input"
        />
        <button onClick={handleSendCommand} className="send-button">
          <FaArrowUp />
        </button>
      </div>

      <div className="command-history">
        {commandList.map((item, index) => (
          <div key={index} className="command-entry">
            {item}
          </div>
        ))}
      </div>

      {/* Conditionally render CommandExecutor if there are commands to execute */}
      {jsonCommands && (
        <CommandExecutor
          jsonCommands={jsonCommands}
          setCommands={setCommandList}
          onComplete={() => setJsonCommands(null)} // Reset jsonCommands after execution
        />
      )}
    </div>
  );
}

export default CommandInput;
