function JSONMatcher({ jsonData, setCommandList, userCommand }) {
  const matchedValue = jsonData[userCommand];

  if (matchedValue) {
    // Format the matched JSON value as a readable string with indentation
    const formattedResult = `Result for "${userCommand}":\n${JSON.stringify(
      matchedValue,
      null,
      2
    )}`;

    // Append the formatted result to the command list
    setCommandList((prevList) => [...prevList, formattedResult]);

    // Return the matched JSON value
    return matchedValue;
  } else {
    // Format the list of valid keys with newlines for each key
    const allKeysMessage = `Key not found. Valid keys are:\n- ${Object.keys(
      jsonData
    ).join("\n- ")}`;

    // Append the message with all valid keys to the command list
    setCommandList((prevList) => [...prevList, allKeysMessage]);

    // Return an empty JSON object if no match is found
    return {};
  }
}

export default JSONMatcher;
