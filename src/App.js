import React from "react";
import "./App.css";
import Dictionary from "./Dictionary";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("bot");
  const [searchTarget, setSearchTarget] = React.useState(searchTerm);

  const handleKeyDown = function (e) {
    if (e.key === "Enter") {
      setSearchTarget(searchTerm);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <main>
          <input
            value={searchTerm}
            onKeyDown={handleKeyDown}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button
            onClick={() => {
              setSearchTarget(searchTerm);
            }}
          >
            Search
          </button>

          <Dictionary keyWord={searchTarget} />
        </main>
        <footer>
          Coded by{" "}
          <a
            href="https://www.linkedin.com/in/s-khin/"
            target="_blank"
            rel="noreferrer"
          >
            Asma Sadiq
          </a>{" "}
          and open sourced on{" "}
          <a
            href="https://github.com/Asmasa1588"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
