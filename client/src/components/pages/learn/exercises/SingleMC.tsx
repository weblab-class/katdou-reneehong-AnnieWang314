import React, { useState, useEffect } from "react";
import "./SingleMC.css";

type Props = {
  definition: string;
  word1: string;
  word2: string;
  word3: string;
  word4: string;
};

const SingleMC = (props: Props) => {
  const [display, setDisplay] = useState(props.word1);

  useEffect(() => {
    setDisplay(props.word1);
  }, [props.word1]);

  const handleWord1Click = () => {
    setDisplay(props.word1);
  };

  const handleWord2Click = () => {
    setDisplay(props.word2);
  };

  const handleWord3Click = () => {
    setDisplay(props.word3);
  };

  const handleWord4Click = () => {
    setDisplay(props.word4);
  };

  return (
    <div className="SingleMC-container">
      <div className="SingleMC-card">
        <div className="SingleMC-content">{props.definition}</div>
      </div>
      <div className="SingleMC-buttons">
        <div onClick={handleWord1Click} className="SingleMC-button black-link">
          word1
        </div>
        <div onClick={handleWord2Click} className="SingleMC-button black-link">
          word2
        </div>
        <div onClick={handleWord3Click} className="SingleMC-button black-link">
          word3
        </div>
        <div onClick={handleWord4Click} className="SingleMC-button black-link">
          word4
        </div>
      </div>
    </div>
  );
};

export default SingleMC;
