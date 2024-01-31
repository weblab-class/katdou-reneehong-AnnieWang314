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
};

const Questions = (props: Props) => {
  const location = useLocation();
  const { level, words, progress, questionsOrder } = location.state;
  console.log(questionsOrder);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  const numToComponent = (number: number, words: Term[]) => {
    let index = Math.floor((number - 1) / 4);
    let word = words[index];

    // Render the appropriate question component based on the number
    switch (
      number % 4 // Use modulo to determine the type of question component for each word
    ) {
      case 1:
        return <SingleMC word={word} />;
      case 2:
        return <SingleFill word={word} />;
      case 3:
        return <SingleDefine word={word} />;
      case 0:
        return <SingleWrite word={word} />;
    }
  };

  // const handleNextTerm = () => {
  //   post("/api/updateCurrentIndex", { newIndex: currentIndex + 1 }).then((response) => {
  //     setCurrentIndex(response.currentIndex);
  //   });
  // };

  // const handlePrevTerm = () => {
  //   post("/api/updateCurrentIndex", { newIndex: currentIndex - 1 }).then((response) => {
  //     setCurrentIndex(response.currentIndex);
  //   });
  // };

  const handleStartOver = () => {
    console.log("start over");
  };

  return (
    <div className="Questions-container">
      <div
        // onClick={handlePrevTerm}
        className={`Questions-button-nav`}
      >
        back
      </div>
      <div className="Questions-middle">
        <div className="Questions-middle-top">
          <div>asdf / asdf</div>
          <div onClick={handleStartOver} className="Questions-start-over black-link">
            start over
          </div>
        </div>
        {questionsOrder.map((number: number) => {
          return numToComponent(number, words);
        })}
      </div>
      <div
        // onClick={handleNextTerm}
        className={`Questions-button-nav`}
      >
        next
      </div>
    </div>
  );
};
export default Questions;
