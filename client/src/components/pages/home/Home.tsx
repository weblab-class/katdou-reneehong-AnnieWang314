import React, { useState, useEffect } from "react";
import logoUrl from "../../../assets/logo.svg";
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
            <div>ur path to learning the newest, gen-z language.</div>
            <div>
              have an account?{" "}
              <Link to="/login" className="Home-login purple-link">
                log in.
              </Link>
            </div>
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
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
          <div className="Home-about-qna">
            <div className="Home-about-q">Q: dipsum lorum mom serum arorum</div>
            <div className="Home-about-a">
              &gt; A: bones himpsum disciplus renee is mommy we can add a drawing hehe pookieee
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Home;
