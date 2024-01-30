import React, { useState, useEffect } from "react";
import "./SingleFlashcard.css";

type Props = {
  term: string;
  meaning: string;
  example: string;
};

const SingleFlashcard = (props: Props) => {
  const [display, setDisplay] = useState(props.term);

  useEffect(() => {
    setDisplay(props.term);
  }, [props.term]);

  const handleWordClick = () => {
    setDisplay(props.term);
  };

  const handleDefinitionClick = () => {
    setDisplay(props.meaning);
  };

  const handleExampleClick = () => {
    setDisplay(props.example);
  };

  return (
    <div className="SingleFlashcard-container">
      <div className="SingleFlashcard-card">
        <div className="SingleFlashcard-content">{display}</div>
      </div>
      <div className="SingleFlashcard-buttons">
        <div onClick={handleWordClick} className="SingleFlashcard-button black-link">
          word
        </div>
        <div onClick={handleDefinitionClick} className="SingleFlashcard-button black-link">
          definition
        </div>
        <div onClick={handleExampleClick} className="SingleFlashcard-button black-link">
          example
        </div>
      </div>
    </div>
  );
};

export default SingleFlashcard;
