import React, { useState, useEffect } from "react";
import Term from "../../../../../../shared/Term";
import "./SingleDefine.css";

type Props = {
  word: Term;
};

const SingleDefine = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (props.word.term.toLowerCase() === searchTerm.toLowerCase()) {
      setResult("correct!");
    } else {
      setResult("try again");
    }
  };
  return (
    <div className="SingleDefine-container">
      <div className="SingleDefine-card">
        <div className="SingleDefine-content">{props.word.meaning}</div>
      </div>
      <form onSubmit={handleSearch} className="SingleDefine-searchBar-container">
        <input
          className="SingleDefine-searchBar"
          type="text"
          name="query"
          placeholder="find your words..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="SingleDefine-enter">
          enter
        </button>
        <div className="SingleDefine-result">{result}</div>
      </form>
    </div>
  );
};

export default SingleDefine;
