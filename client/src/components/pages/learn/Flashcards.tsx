import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleFlashcard from "./SingleFlashcard";
import Term from "../../../../../shared/Term";
import "./Flashcards.css";

type Props = {
  userId: string | undefined;
  words: Term[];
};

const Flashcards = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  useEffect(() => {
    if (shuffledTerms.length === 0) {
      const shuffleTerms = (terms: Term[]) => {
        let array = [...terms];
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      setShuffledTerms(shuffleTerms(props.words));
    }
  }, [props.words]);

  const handleNextTerm = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 < shuffledTerms.length) {
        return prevIndex + 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handlePrevTerm = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex - 1 >= 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };

  return (
    <div className="Flashcards-container">
      <div
        onClick={handlePrevTerm}
        className={`Flashcards-button-nav ${currentIndex === 0 ? "hidden" : ""}`}
      >
        back
      </div>
      {shuffledTerms.length > 0 && (
        <SingleFlashcard
          key={shuffledTerms[currentIndex]._id}
          term={shuffledTerms[currentIndex].term}
          meaning={shuffledTerms[currentIndex].meaning}
          example={shuffledTerms[currentIndex].example}
        />
      )}
      <div
        onClick={handleNextTerm}
        className={`Flashcards-button-nav ${currentIndex === shuffledTerms.length - 1 ? "hidden" : ""}`}
      >
        next
      </div>
    </div>
  );
};
export default Flashcards;
