import React from "react";
import "./SingleWord.css";

type Props = {
  key: string;
  term: string;
  meaning: string;
};

const SingleWord = (props: Props) => {
  return <div className="SingleWord-word">{props.term + ": " + props.meaning}</div>;
};

export default SingleWord;
