import React, { useEffect } from "react";
import "./Learn.css";
import { useNavigate, Link } from "react-router-dom";

type Props = {
  userId: string | undefined;
};

const Learn = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  return (
    <div className="Learn-container">
      <div className="Learn-left">
        <div className="Learn-title">LEARN</div>
        <div className="Learn-options-container">
          <Link to="flashcards" className="Learn-option black-link">
            flashcards
          </Link>
          <Link to="exercises" className="Learn-option black-link">
            exercises
          </Link>
        </div>
      </div>
      {/* <div className="Learn-lib">
        <div className="Learn-title">learn my lib</div>
        <div className="Learn-libraryWords">
          <div className="Learn-libraryWord">sus</div>
          <div className="Learn-libraryWord">flex</div>
          <div className="Learn-libraryWord">mood</div>
          <div className="Learn-libraryWord">savage</div>
          <div className="Learn-libraryWord">wasted</div>
          <div className="Learn-libraryWord">highkey</div>
          <div className="Learn-libraryWord">basic</div>
          <div className="Learn-libraryWord">lowkey</div>
          <div className="Learn-libraryWord">shook</div>
          <div className="Learn-libraryWord">lit</div>
        </div>
      </div> */}
    </div>
  );
};

export default Learn;
