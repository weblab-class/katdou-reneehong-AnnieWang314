import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../utilities";
import Term from "../../../../../../shared/Term";
import SingleLevel from "./SingleLevel";
import "./Exercises.css";

type Props = {
  userId: string | undefined;
  levels: Level[];
  setCurrentLevel: Dispatch<SetStateAction<Level | undefined>>;
};

type Level = {
  level: number;
  words: Term[];
  progress: number;
  questionsOrder: number[];
};

const Exercises = (props: Props) => {
  const navigate = useNavigate();
  const [levelsProgress, setLevelsProgress] = useState({});
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    } else {
      props.levels.forEach((level) => {
        get("/api/getProgress", { level: level.level })
          .then((response) => {
            setLevelsProgress((prevState) => ({
              ...prevState,
              [level.level]: response.totalQuestionsAnswered,
            }));
            setLoaded(true);
          })
          .catch((error) => console.error("Failed to fetch level progress:", error));
      });
    }
  }, [props.userId, props.levels, navigate]);

  const handleClickLevel = (level: Level) => {
    props.setCurrentLevel(level);
    navigate("questions");
  };

  if (!loaded) {
    return <div className="Exercises-container"></div>; // Or any other loading indicator
  }

  return (
    <div className="Exercises-container">
      <div className="Exercises-levels-container">
        <div className="Exercises-levels-scroll">
          {props.levels.map((level) => {
            return (
              <div key={level.level} onClick={() => handleClickLevel(level)}>
                <SingleLevel
                  currentWords={level.words}
                  progress={level.progress}
                  level={level.level}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
