import React from "react";
import "./Words.css";

const Words = () => {
  return (
    <div className="All">
      <div className="SearchBar">
        {" "}
        {/* Note: class -> className */}
        <form action="/search" method="get">
          <input type="text" name="query" placeholder="find your words..." />
        </form>
      </div>

      <div className="WordList">
        <div id="ListTitle">hot and trending</div>
        <div className="Words">
          <div className="Word">lit: describes something fun and exciting</div>
          <div className="Word">shook: to be surprised or shocked</div>
          <div className="Word">lowkey: being discreet</div>
          <div className="Word">woke: being aware of various societal issues</div>
          <div className="Word">basic: boring, average, or unoriginal</div>
          <div className="Word">savage: describes something badass</div>
        </div>
      </div>
    </div>
  );
};

export default Words;
