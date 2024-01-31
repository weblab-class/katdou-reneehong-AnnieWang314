import React, { useState, useEffect } from "react";
import "./Fill.css";

type Props = {
  term: string;
  meaning: string;
  example: string;
};

const Fill = (props: Props) => {
  const [display, setDisplay] = useState(props.meaning);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setDisplay(props.meaning);
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
    <div className="Fill-container">
      <div className="Fill-card">
        <div className="Fill-content">{display}</div>
      </div>
      <form onSubmit={handleSearch} className="Fill-searchBar-container">
        <input
          className="Fill-searchBar"
          type="text"
          name="query"
          placeholder="find your words..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="Fill-enter">
          enter
        </button>
        <div className="Fill-result">{result}</div>
      </form>
    </div>
  );
};

export default Fill;
