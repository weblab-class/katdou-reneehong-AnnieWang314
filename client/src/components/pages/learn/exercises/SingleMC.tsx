import React, { useState, useEffect } from "react";
import Term from "../../../../../../shared/Term";
import { get } from "../../../../utilities";
import "./SingleMC.css";

type Props = {
  word: Term;
};

const SingleMC = (props: Props) => {
  const [choices, setChoices] = useState<Term[]>([]);
  useEffect(() => {
    get("/api/randomMC").then((response) => {
      const updatedChoices = [...response.choices, props.word];
      setChoices(updatedChoices);
    });
  }, []);

  function shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap array[i] with the element at the random index
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const array = Array.from({ length: 4 }, (_, index) => index);
  const shuffledArray = shuffleArray(array);

  const handleWord1Click = () => {
    console.log("click1");
  };

  const handleWord2Click = () => {
    console.log("click2");
  };

  const handleWord3Click = () => {
    console.log("click3");
  };

  const handleWord4Click = () => {
    console.log("click4");
  };

  return (
    <div className="SingleMC-container">
      <div className="SingleMC-card">
        <div className="SingleMC-content">{props.word.meaning}</div>
      </div>
      <div className="SingleMC-buttons">
        <div onClick={handleWord1Click} className="SingleMC-button black-link">
          {choices[0].term}
        </div>
        <div onClick={handleWord2Click} className="SingleMC-button black-link">
          {choices[1].term}
        </div>
        <div onClick={handleWord3Click} className="SingleMC-button black-link">
          {choices[2].term}
        </div>
        <div onClick={handleWord4Click} className="SingleMC-button black-link">
          {choices[3].term}
        </div>
      </div>
    </div>
  );
};

export default SingleMC;
