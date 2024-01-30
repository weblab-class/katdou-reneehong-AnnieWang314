import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleFlashcard from "./SingleFlashcard";
import Term from "../../../../../shared/Term";
import "./Flashcards.css";

type Props = {
  userId: string | undefined;
  words: Term[];
};

const Flashcards = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  return (
    <div className="Flashcards-container">
      <div className="Flashcards-button-nav">back</div>
      <SingleFlashcard
        term="based"
        meaning="originally meaning 'to be yourself and not care about how EEEEEE OIAJFOIAEJOFIJAEOIF JAOEIFJOAE IJFEOAIJFOIAEFJ others view you', the word is now used to indicate an opinion or something that someone agrees with. it is especially common in political slang and discussions and may be used for controversial topics."
        example="i am based."
      />
      <div className="Flashcards-button-nav">next</div>
    </div>
  );
};
export default Flashcards;
