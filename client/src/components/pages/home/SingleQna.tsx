import React, { useState, useEffect } from "react";
import "./SingleQna.css";

type Props = {
  question: string;
  answer: string;
};

const SingleQna = (props: Props) => {
  return (
    <div className="SingleQna-container">
      <div className="SingleQna-q">{"Q: " + props.question}</div>
      <div className="SingleQna-a">&gt; {"A: " + props.answer}</div>
    </div>
  );
};

export default SingleQna;
