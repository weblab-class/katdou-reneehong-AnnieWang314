import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SingleMC from "./SingleMC";
import SingleFill from "./SingleFill";
import SingleDefine from "./SingleDefine";
import SingleWrite from "./SingleWrite";
import Term from "../../../../../../shared/Term";
import { get, post } from "../../../../utilities";
import "./Questions.css";

type Props = {
  userId: string | undefined;
  level: number;
  words: Term[];
  progress: number;
  questionsOrder: number[];
};

const Questions = (props: Props) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(props.progress);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  useEffect(() => {
    setCurrentQuestionIndex(props.progress);
    if (props.words.length > 0 && props.questionsOrder.length > 0) {
      setLoaded(true); // Indicates that the component is ready to render
    }
  }, [props.progress, props.words, props.questionsOrder]);

  const numToComponent = (number: number, words: Term[]) => {
    let index = Math.floor((number - 1) / 2);
    let word = words[index];

    // Render the appropriate question component based on the number
    switch (
      number % 2 // Use modulo to determine the type of question component for each word
    ) {
      // case 1:
      //   return <SingleMC word={word} />;
      case 1:
        return <SingleFill word={word} />;
      case 0:
        return <SingleDefine word={word} />;
      // case 0:
      //   return <SingleWrite word={word} />;
    }
  };

  const handleNextTerm = () => {
    let newIndex = currentQuestionIndex + 1;
    // If newIndex is greater than or equal to the length of props.questionsOrder,
    // set it to the length of props.questionsOrder - 1
    newIndex = Math.min(newIndex, props.questionsOrder.length - 1);

    post("/api/updateProgress", {
      newIndex: newIndex,
      currentLevel: props.level,
    })
      .then((response) => {
        setCurrentQuestionIndex(response.currentQuestionIndex);
      })
      .catch((error) => {
        console.error("Error updating progress:", error);
      });
  };

  const handlePrevTerm = () => {
    let newIndex = currentQuestionIndex - 1;
    // If newIndex is less than 0, set it to 0
    newIndex = Math.max(newIndex, 0);

    post("/api/updateProgress", {
      newIndex: newIndex,
      currentLevel: props.level,
    })
      .then((response) => {
        setCurrentQuestionIndex(response.currentQuestionIndex);
      })
      .catch((error) => {
        console.error("Error updating progress:", error);
      });
  };
  const handleBack = () => {
    navigate("/learn/exercises");
  };

  if (!loaded) {
    return <div className="Questions-container"></div>; // Or any other loading indicator
  }

  return (
    <div className="Questions-container">
      <div
        onClick={handlePrevTerm}
        className={`Questions-button-nav ${currentQuestionIndex !== 0 ? "visible" : ""}`}
      >
        back
      </div>
      <div className="Questions-middle">
        <div className="Questions-middle-top">
          <div onClick={handleBack} className="Questions-reset black-link">
            all sets
          </div>
          <div>
            set {props.level}: {currentQuestionIndex + 1} of {props.questionsOrder.length}
          </div>
        </div>
        {numToComponent(props.questionsOrder[currentQuestionIndex], props.words)}
      </div>
      <div
        onClick={handleNextTerm}
        className={`Questions-button-nav ${currentQuestionIndex !== props.questionsOrder.length - 1 ? "visible" : ""}`}
      >
        next
      </div>
    </div>
  );
};
export default Questions;
