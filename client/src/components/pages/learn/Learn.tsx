import React from "react";
import "./Learn.css";
import Unauth from "../intermediate/Unauth";

type Props = {
  userId: string | undefined;
};

const Learn = (props: Props) => {
  if (!props.userId) {
    window.location.replace("/unauth");
    return <Unauth />;
  }

  return (
    <div className="Learn-container">
      <div className="Learn-lib">
        <div className="Learn-title">learn all words</div>
        <div className="Learn-libraryWords">
          <div className="Learn-libraryWord">fomo</div>
          <div className="Learn-libraryWord">ngl</div>
          <div className="Learn-libraryWord">goat</div>
          <div className="Learn-libraryWord">iykyk</div>
          <div className="Learn-libraryWord">hangry</div>
          <div className="Learn-libraryWord">cringe</div>
          <div className="Learn-libraryWord">spill the tea</div>
          <div className="Learn-libraryWord">slid into the dms</div>
          <div className="Learn-libraryWord">on fleek</div>
          <div className="Learn-libraryWord">caught in 4k</div>
          <div className="Learn-libraryWord">caught in 4k</div>
          <div className="Learn-libraryWord">caught in 4k</div>
          <div className="Learn-libraryWord">caught in 4k</div>
          <div className="Learn-libraryWord">caught in 4k</div>
        </div>
      </div>
      <div className="Learn-lib">
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
      </div>
    </div>
  );
};

export default Learn;
