import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [chipsData, setChipsData] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const trimmedText = inputText.trim();

    if (trimmedText === "") {
      setError("Chip cannot be empty!");
      return;
    }

    if (
      chipsData.some((chip) => chip.toLowerCase() === trimmedText.toLowerCase())
    ) {
      setError("Chip with similar name is already exist!");
      return;
    }

    setChipsData((prev) => [...prev, inputText]);
    setInputText("");
    setError("");
  };

  const handleDeleteChip = (delId: number) => {
    setChipsData((prev) => prev.filter((_, idx) => idx !== delId));
  };

  return (
    <section className="chips-container">
      <div style={{display: "flex", flexDirection: "column"}}>
        <input
          type="text"
          value={inputText}
          className="chip-input"
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your chip here"
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <span className="error-message">{error}</span>
      </div>
      <div className="chip-list">
        {chipsData.map((data, idx) => (
          <div className="chip" key={idx}>
            <span className="chip-text">{data}</span>
            <span className="chip-remove" onClick={() => handleDeleteChip(idx)}>
              X
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default App;
