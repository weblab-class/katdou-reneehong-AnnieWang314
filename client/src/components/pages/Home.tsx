import React from "react";
import homeLogoUrl from "../../assets/homeLogo.svg";
import logoUrl from "../../assets/logo.svg";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home-container">
      <div className="Home-top-container">
        <div className="Home-top-left">
          <img src={homeLogoUrl} alt="LOGO" className="Home-logo" />
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
