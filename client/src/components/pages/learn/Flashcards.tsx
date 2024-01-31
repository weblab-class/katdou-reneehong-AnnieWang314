import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleFlashcard from "./SingleFlashcard";
import Term from "../../../../../shared/Term";
import { get, post } from "../../../utilities";
import "./Flashcards.css";

type Props = {
  userId: string | undefined;
};

const Flashcards = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [flashcardsOrder, setFlashcardsOrder] = useState<Term[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flashcardsResponse = await get("/api/flashcardsOrder");
        setFlashcardsOrder(flashcardsResponse.flashcardsOrder);

        const indexResponse = await get("/api/currentIndex");
        setCurrentIndex(indexResponse.currentIndex);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (flashcardsOrder === null || currentIndex === null) {
    return <div className="Flashcards-container"></div>;
  }

  const handleNextTerm = () => {
    post("/api/updateCurrentIndex", { newIndex: currentIndex + 1 }).then((response) => {
      setCurrentIndex(response.currentIndex);
    });
  };

  const handlePrevTerm = () => {
    post("/api/updateCurrentIndex", { newIndex: currentIndex - 1 }).then((response) => {
      setCurrentIndex(response.currentIndex);
    });
  };

  const handleStartOver = () => {
    post("/api/updateCurrentIndex", { newIndex: 0 }).then((response) => {
      setCurrentIndex(response.currentIndex);
    });
    post("/api/updateFlashcardsOrder").then((response) => {
      setFlashcardsOrder(response.flashcardsOrder);
    });
  };

  return (
    <div className="Flashcards-container">
      <div
        onClick={handlePrevTerm}
        className={`Flashcards-button-nav ${currentIndex > 0 ? "visible" : ""}`}
      >
        back
      </div>
      <div className="Flashcards-middle">
        <div className="Flashcards-middle-top">
          <div>
            {currentIndex + 1} / {flashcardsOrder.length}
          </div>
          <div onClick={handleStartOver} className="Flashcards-start-over black-link">
            start over
          </div>
        </div>
        {flashcardsOrder.length > 0 && (
          <SingleFlashcard
            key={flashcardsOrder[currentIndex]._id}
            term={flashcardsOrder[currentIndex].term}
            meaning={flashcardsOrder[currentIndex].meaning}
            example={flashcardsOrder[currentIndex].example}
          />
        )}
      </div>
      <div
        onClick={handleNextTerm}
        className={`Flashcards-button-nav ${currentIndex < flashcardsOrder.length - 1 ? "visible" : ""}`}
      >
        next
      </div>
    </div>
  );
};
export default Flashcards;
