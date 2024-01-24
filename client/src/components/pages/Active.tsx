import React from "react";
import "./Active.css";
import Unauth from "./Unauth";

type Props = {
  userId: string | undefined;
};
const Active = (props: Props) => {
    if (!props.userId) {
        window.location.replace("/unauth");
        return <Unauth />;
      }
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
export default Active;