import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleMC from "./SingleMC";
import Term from "../../../../../../shared/Term";
import { get, post } from "../../../../utilities";
import "./MCs.css";

type Props = {
  userId: string | undefined;
};

const MCs = (props: Props) => {
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
    return <div className="MCs-container"></div>;
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
    <div className="MCs-container">
      <div
        onClick={handlePrevTerm}
        className={`MCs-button-nav ${currentIndex > 0 ? "visible" : ""}`}
      >
        back
      </div>
      <div className="MCs-middle">
        <div className="MCs-middle-top">
          <div>
            {currentIndex + 1} / {flashcardsOrder.length}
          </div>
          <div onClick={handleStartOver} className="MCs-start-over black-link">
            start over
          </div>
        </div>
        {flashcardsOrder.length > 0 && (
          <SingleMC
            key={flashcardsOrder[currentIndex]._id}
            definition={"definition"}
            word1={"word1"}
            word2={"word2"}
            word3={"word3"}
            word4={"word4"}
          />
        )}
      </div>
      <div
        onClick={handleNextTerm}
        className={`MCs-button-nav ${currentIndex < flashcardsOrder.length - 1 ? "visible" : ""}`}
      >
        next
      </div>
    </div>
  );
};
export default MCs;
