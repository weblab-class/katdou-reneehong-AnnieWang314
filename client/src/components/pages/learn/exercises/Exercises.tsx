import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Term from "../../../../../../shared/Term";
import SingleLevel from "./SingleLevel";
import "./Exercises.css";

type Props = {
  userId: string | undefined;
  words: Term[];
};

const Exercises = (props: Props) => {
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  return (
    <div className="Exercises-container">
      <div className="Exercises-levels-container">
        <div className="Exercises-levels-scroll">
          <SingleLevel
            currentWords={[
              "hihihi hihihihi hihihihi",
              "byebye byebyebyeb",
              "qwerty",
              "asdfAOIFJAPIF",
            ]}
            progress={12}
            level={1}
          />
          <SingleLevel currentWords={["hi", "bye", "qwerty", "asdf"]} progress={0} level={2} />
          <SingleLevel currentWords={["hi", "bye", "qwerty", "asdf"]} progress={10} level={3} />
          <SingleLevel currentWords={["hi", "bye", "qwerty", "asdf"]} progress={14} level={4} />
          <SingleLevel currentWords={["hi", "bye", "qwerty", "asdf"]} progress={3} level={5} />
        </div>
      </div>
    </div>
  );
};

export default Exercises;
