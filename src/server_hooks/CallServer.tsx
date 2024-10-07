import { useEffect } from "react";
import axios from "axios";

const CommandExecutor = ({ jsonCommands, setCommands, onComplete }) => {
  useEffect(() => {
    const executeCommands = async () => {
      for (const commandSet of jsonCommands) {
        // Process each command in the command set
        for (const command of commandSet) {
          const { name, args } = command[0];

          console.log(command);
          console.log("Args:", args); // Debugging to verify args are passed correctly

          if (!name) {
            // Log an error and skip this command if name is undefined
            console.error("Command name is undefined:", command);
            setCommands((prevCommands) => [
              ...prevCommands,
              `Error: Command name is undefined in ${JSON.stringify(command)}`,
            ]);
            continue;
          }

          try {
            // Make the API call to the specified endpoint
            const response = await axios.post(
              `http://localhost:3002/${name}`,
              args // Pass args as the POST request body
            );

            // Append the response text to `setCommands`
            setCommands((prevCommands) => [
              ...prevCommands,
              `Command: ${name}, Response: ${JSON.stringify(response.data)}`,
            ]);
          } catch (error) {
            // Handle any errors and append to `setCommands`
            setCommands((prevCommands) => [
              ...prevCommands,
              `Command: ${name}, Error: ${error.message}`,
            ]);
          }
        }
      }
      // Call onComplete to clear jsonCommands after execution
      onComplete();
    };

    executeCommands();
  }, [jsonCommands, setCommands, onComplete]);

  return null;
};

export default CommandExecutor;
