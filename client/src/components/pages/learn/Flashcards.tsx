import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Flashcards.css";

type Props = {
  userId: string | undefined;
};
const Flashcards = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  return (
    <div className="Active-container">
      <div className="Active-card">
        <div className="Active-cardtext"> learn bitch</div>
      </div>
      <div className="Active-all-buttons">
        <div className="Active-button-nav"> back</div>
        <div className="Active-button-group">
          <div className="Active-button"> word </div>
          <div className="Active-button"> definition </div>
          <div className="Active-button"> origin</div>
          <div className="Active-button"> example</div>
        </div>
        <div className="Active-button-nav"> next</div>
      </div>
    </div>
  );
};
export default Flashcards;
