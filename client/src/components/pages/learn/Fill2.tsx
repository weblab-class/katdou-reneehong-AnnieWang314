import React, { useState, useEffect } from "react";
import "./Fill2.css";

type Props = {
  term: string;
  meaning: string;
  example: string;
};

const Fill2 = (props: Props) => {
  const [display, setDisplay] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const replaceTermWithBlanks = (example: string, term: string): string => {
    const regex = new RegExp(term, "gi");
    return example.replace(regex, "_____");
  };

  const exampleWithBlanks = replaceTermWithBlanks(props.example, props.term);

  useEffect(() => {
    setDisplay(exampleWithBlanks);
  }, [props.meaning]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.term.toLowerCase() == searchTerm.toLowerCase()) {
      setResult("correct!");
    } else {
      setResult("try again");
    }
  };

  return (
    <div className="Fill2-container">
      <div className="Fill2-card">
        <div className="Fill2-content">{display}</div>
      </div>
      <form onSubmit={handleSearch} className="Fill2-searchBar-container">
        <input
          className="Fill2-searchBar"
          type="text"
          name="query"
          placeholder="find your words..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="Fill2-enter">
          enter
        </button>
        <div className="Fill2-result">{result}</div>
      </form>
    </div>
  );
};

export default Fill2;
