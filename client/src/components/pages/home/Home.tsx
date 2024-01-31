import React, { useState, useEffect } from "react";
import logoUrl from "../../../assets/logo.svg";
import SingleQna from "./SingleQna";
import "./Home.css";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Home = () => {
  const [animation1, setAnimation1] = useState("bounce11");
  const [animation2, setAnimation2] = useState("bounce21");
  const [animation3, setAnimation3] = useState("bounce31");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation1((prevAnimation) => (prevAnimation === "bounce11" ? "bounce12" : "bounce11"));
      setAnimation2((prevAnimation) => (prevAnimation === "bounce21" ? "bounce22" : "bounce21"));
      setAnimation3((prevAnimation) => (prevAnimation === "bounce31" ? "bounce32" : "bounce31"));
    }, 4000); // Change the animation every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        setTimeout(() => aboutSection.scrollIntoView({ behavior: "smooth" }), 0);
      }
    }
  }, []);

  return (
    <div className="Home-container">
      <div className="Home-top-container">
        <div className="Home-top-top">
          <div className="Home-top-left">
            <div className="Home-bounce-container">
              <div className={`Home-bounce circle1 ${animation1}`}></div>
              <div className={`Home-bounce circle2 ${animation2}`}></div>
              <div className={`Home-bounce circle3 ${animation3}`}></div>
            </div>
          </div>
          <div className="Home-top-right">
            <h1>stay connected!</h1>
            <div>ur path to learning the newest gen-z slanguage (pg-13 edition).</div>
            {/* <div>
              have an account?{" "}
              <Link to="/login" className="Home-login purple-link">
                log in.
              </Link>
            </div> */}
          </div>
        </div>
        <a href="/#about" className="purple-link">
          <IoIosArrowDown className="Home-top-arrow" />
        </a>
      </div>
      <div id="about" className="Home-about-container">
        <div className="Home-about-title">
          <h2>about</h2>
          <img src={logoUrl} alt="Logo" className="Home-about-logo" />
        </div>
        <p className="Home-about-qna-container">
          <div className="Home-about-column">
            <SingleQna
              question="who is slangz for?"
              answer="slangz is for people of all ages who want to learn gen z slang!"
            />
            <SingleQna
              question="why was slangz created?"
              answer="slangz was created to provide users with an interactive, customizable way to learn the newest slangz. this website is beginning with gen-z slang, and we hope to expand it to many other types of slang!"
            />
            <SingleQna
              question="what's the goal of slangz?"
              answer="our hope is that slangz will help to bring generations of people together."
            />
            <SingleQna
              question="how will slangz help me learn?"
              answer="slangz has two ways to explore slang: flashcards and practice. in flashcards, you can scroll terms, learn their definitions, and see them in example phrases. in practice, you will match each term to their definition or phrase in a variety of ways."
            />
            
          </div>
          <div className="Home-about-column">
            <SingleQna
              question="where did we get our words from?"
              answer="we sourced our words primarily from the gen z slang wikipedia page and gabb.com, and added some of our own examples as well."
            />
            
            <SingleQna
              question="who are we?"
              answer="we're three mit students who are hella lit and are really outta pocket"
            />
            <SingleQna
              question="how do sets work?"
              answer="sets are groups of four words and are not ordered in increasing level of difficulty. you may start any set at any time. your progress bar reflects the number of sets you have completed."
            />
            <SingleQna
              question="send it? or blend it?"
              answer="we're sending it by flipping the classroom: kids are teaching adults. we're blending by blending generations of people together. "
            />
             <SingleQna
              question="why is everything in lowercase?"
              answer="because gen z never capitalizes."
            />
          </div>
        </p>
      </div>
    </div>
  );
};

export default Home;
