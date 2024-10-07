import "./App.css";

function CommandHistory({ commandList }) {
  return (
    <div className="command-container">
      <div className="command-history">
        <ul className="chat-history">
          {commandList
            .slice()
            .reverse()
            .map((cmd, index) => {
              const isUser = cmd.startsWith("User:");
              const message = cmd.replace(/^(User:|Server:)/, "").trim();
              return (
                <li
                  key={index}
                  className={`chat-item ${
                    isUser ? "user-message" : "server-message"
                  }`}
                >
                  {!isUser && (
                    <img
                      src="public/ai.png"
                      alt="Server Icon"
                      className="server-icon"
                    />
                  )}
                  <div className="message-content">{message}</div>
                  {isUser && (
                    <img
                      src="public/user.png"
                      alt="User Icon"
                      className="user-icon"
                    />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default CommandHistory;
