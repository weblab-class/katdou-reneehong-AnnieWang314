import React from "react";
import Term from "../../../../../../shared/Term";
import "./SingleLevel.css";

type Props = {
  currentWords: Term[];
  progress: number;
  level: number;
};

const SingleLevel = (props: Props) => {
  return (
    <div className="SingleLevel-container">
      <div className="SingleLevel-top">
        <div className="SingleLevel-level u-bold">{"set " + props.level}</div>
        <div className="SingleLevel-progress">
          {props.progress + "/" + props.currentWords.length * 4}
        </div>
      </div>
      <div className="SingleLevel-bar-container">
        <div
          className="SingleLevel-bar"
          style={{ width: `${(props.progress / (props.currentWords.length * 4)) * 100}%` }}
        ></div>
      </div>
      <div className="SingleLevel-bottom">
        {props.currentWords.map((word) => (
          <div className="SingleLevel-word">{word.term}</div>
        ))}
      </div>
    </div>
  );
};

export default SingleLevel;
