import React, { useState } from "react";

function TESTSwapComponent() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null); // State for handling errors

  const handleSwap = async () => {
    const inputAmount = "1000000"; //
    const inputToken = "eth"; // Source token
    const outputToken = "usdc"; // Target token
    const chainName = "eth"; // Chain name (default: eth)

    // Create the query string for the GET request
    const queryParams = new URLSearchParams({
      inputAmount: inputAmount,
      inputToken: inputToken,
      outputToken: outputToken,
      chainName: chainName,
    });

    try {
      // Send a GET request with query parameters
      const res = await fetch(
        `http://localhost:3002/swap?${queryParams.toString()}`
      );

      if (!res.ok) {
        throw new Error(`Server returned ${res.status} ${res.statusText}`);
      }

      const result = await res.json(); // Parse the JSON response
      setResponse(result); // Set response in state
      setError(null); // Clear error state
    } catch (error) {
      setError(error.message); // Set error in case of failure
      setResponse(null); // Clear response state
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Swap ETH for USDC</h1>
      <button onClick={handleSwap}>Execute Swap</button>

      {/* Display the error message if any */}
      {error && (
        <div style={{ color: "red" }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {/* Display the response if available */}
      {response && (
        <div>
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TESTSwapComponent;
