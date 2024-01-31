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
      setChoices(response.choices);
    });
  }, []);

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
          {/* {choices[0].term} */}
        </div>
        <div onClick={handleWord2Click} className="SingleMC-button black-link">
          {/* {choices[1].term} */}
        </div>
        <div onClick={handleWord3Click} className="SingleMC-button black-link">
          {/* {choices[2].term} */}
        </div>
        <div onClick={handleWord4Click} className="SingleMC-button black-link">
          {/* {choices[3].term} */}
        </div>
      </div>
    </div>
  );
};

export default SingleMC;
