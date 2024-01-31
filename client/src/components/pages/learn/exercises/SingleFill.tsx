import React, { useState, useEffect } from "react";
import Term from "../../../../../../shared/Term";
import "./SingleFill.css";

type Props = {
  word: Term;
};

const SingleFill = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const replaceTermWithBlanks = (example: string, term: string): string => {
    const regex = new RegExp(term, "gi");
    return example.replace(regex, "_________");
  };

  if (!props.word) {
    return <div className="SingleFill-container"></div>;
  }

  const exampleWithBlanks = replaceTermWithBlanks(props.word.example, props.word.term);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.word.term.toLowerCase() === searchTerm.toLowerCase()) {
      setResult("correct!");
    } else {
      setResult("try again");
    }
  };

  return (
    <div className="SingleFill-container">
      <div className="SingleFill-card">
        <div className="SingleFill-content">{exampleWithBlanks}</div>
      </div>
      <form onSubmit={handleSearch} className="SingleFill-searchBar-container">
        <input
          className="SingleFill-searchBar"
          type="text"
          name="query"
          placeholder="guess your word..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="SingleFill-enter">
          enter
        </button>
        <div className="SingleFill-result">{result}</div>
      </form>
    </div>
  );
};

export default SingleFill;
