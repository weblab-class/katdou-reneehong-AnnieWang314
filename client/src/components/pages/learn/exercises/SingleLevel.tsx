import React from "react";
import "./SingleLevel.css";

type Props = {
  currentWords: string[];
  progress: number;
  level: number;
};

const SingleLevel = (props: Props) => {
  return (
    <div className="SingleLevel-container">
      <div className="SingleLevel-top">
        <div className="SingleLevel-level u-bold">{"level " + props.level}</div>
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
          <div>{word}</div>
        ))}
        <div className="u-bold">START</div>
      </div>
    </div>
  );
};

export default SingleLevel;
