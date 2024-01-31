import React, { useEffect, useState } from "react";
import Term from "../../../../../../shared/Term";
import { get } from "../../../../utilities";
import "./SingleLevel.css";

type Props = {
  currentWords: Term[];
  progress: number;
  level: number;
};

const SingleLevel = (props: Props) => {
  const [prog, setProg] = useState(props.progress);

  useEffect(() => {
    get("/api/getProgress", { level: props.level }).then((response) => {
      setProg(response.totalQuestionsAnswered);
    });
  });

  return (
    <div className="SingleLevel-container">
      <div className="SingleLevel-top">
        <div className="SingleLevel-level u-bold">{"set " + props.level}</div>
        <div className="SingleLevel-progress">{prog + "/" + props.currentWords.length * 2}</div>
      </div>
      <div className="SingleLevel-bar-container">
        <div
          className="SingleLevel-bar"
          style={{ width: `${(prog / (props.currentWords.length * 2)) * 100}%` }}
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
