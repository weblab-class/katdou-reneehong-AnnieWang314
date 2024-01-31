import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../../../utilities";
import Term from "../../../../../../shared/Term";
import SingleLevel from "./SingleLevel";
import "./Exercises.css";

type Props = {
  userId: string | undefined;
};

type Level = {
  level: number;
  words: Term[];
  progress: number;
  questionsOrder: number[];
};

const Exercises = (props: Props) => {
  const [levels, setLevels] = useState<Level[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  useEffect(() => {
    get("/api/levels")
      .then((response) => {
        setLevels(response.levels);
        console.log("HEREEEE");
        console.log(response.levels);
      })
      .catch((error) => {
        console.error("Error fetching levels:", error);
      });
  }, []);

  const handleClickLevel = (level: Level) => {
    console.log(level);
    navigate("questions", {
      state: {
        level: level.level,
        words: level.words,
        progress: level.progress,
        questionsOrder: level.questionsOrder,
      },
    });
  };

  return (
    <div className="Exercises-container">
      <div className="Exercises-levels-container">
        <div className="Exercises-levels-scroll">
          {levels.map((level) => {
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
