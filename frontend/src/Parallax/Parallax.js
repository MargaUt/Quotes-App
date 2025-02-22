import "./Parallax.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import screen from "../screen-1.jpg";
import MainPageQuotes from "../components/Quotes/MainPageQuotes/MainPageQuotes.js";

function Parallax(props) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  return (
    <div className="Parallax">
      <section className="hero">
        <img
          src={screen}
          className="parallax"
          style={{
            transform: `translateY(${offset * 0.5}px)`,
          }}
          alt=""
        />
        <div className="text-wrapper">
          <h1 className="headline">Quotes</h1>
        </div>
      </section>

      <MainPageQuotes />
      <section className="overflow" />
    </div>
  );
}

export default withRouter(Parallax);
