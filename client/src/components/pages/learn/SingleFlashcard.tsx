import React, { useState, useRef, useEffect } from "react";
import "./SingleFlashcard.css";

type Props = {
  term: string;
  meaning: string;
  example: string;
};

const SingleFlashcard = (props: Props) => {
  const [display, setDisplay] = useState(props.term);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const checkForOverflow = (): boolean => {
    const container = containerRef.current;
    if (container) {
      return (
        container.scrollHeight > container.clientHeight ||
        container.scrollWidth > container.clientWidth
      );
    }
    return false;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const isOverflowing = checkForOverflow();
      container.style.alignItems = isOverflowing ? "flex-start" : "center";
    }
  });

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
        <div ref={containerRef} className="SingleFlashcard-content">
          {display}
        </div>
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
