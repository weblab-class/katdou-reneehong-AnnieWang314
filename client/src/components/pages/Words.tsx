import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../utilities";
import Term from "../../../../shared/Term";
import "./Words.css";
import Unauth from "./Unauth";
import SingleWord from "../SingleWord";

type Props = {
  userId: string | undefined;
};

const Words = (props: Props) => {
  const navigate = useNavigate();
  const [words, setWords] = useState<Term[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!props.userId) {
      navigate("/unauth");
    }
  }, [props.userId, navigate]);

  useEffect(() => {
    get("/api/terms")
      .then((data) => {
        setWords(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const filteredWords = words.filter((word) => word.term.toLowerCase().startsWith(searchQuery));

  return (
    <div className="Words-container">
      <form
        action="/search"
        method="get"
        className="Words-searchBar-container"
        onSubmit={handleFormSubmit}
      >
        <input
          className="Words-searchBar"
          type="text"
          name="query"
          placeholder="find your words..."
          onChange={handleSearchChange}
          autoComplete="off"
        />
      </form>

      <div className="Words-list-container">
        <div className="Words-list">
          {filteredWords.map((word) => (
            <SingleWord key={word._id} term={word.term} meaning={word.meaning} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Words;
