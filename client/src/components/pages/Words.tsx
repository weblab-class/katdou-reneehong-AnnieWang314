import React from "react";
import "./Words.css";
import Unauth from "./Unauth";

type Props = {
  userId: string | undefined;
};

const Words = (props: Props) => {
  if (!props.userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }
  return (
    <div className="Words-container">
      <form action="/search" method="get" className="Words-searchBar-container">
        <input
          className="Words-searchBar"
          type="text"
          name="query"
          placeholder="find your words..."
        />
      </form>

      <div className="Words-list-container">
        <div className="Words-listTitle">hot and trending</div>
        <div className="Words-list">
          <div className="Words-word">lit: describes something fun and exciting</div>
          <div className="Words-word">shook: to be surprised or shocked</div>
          <div className="Words-word">lowkey: being discreet</div>
          <div className="Words-word">woke: being aware of various societal issues</div>
          <div className="Words-word">basic: boring, average, or unoriginal</div>
          <div className="Words-word">savage: describes something badass</div>
        </div>
      </div>
    </div>
  );
};

export default Words;
