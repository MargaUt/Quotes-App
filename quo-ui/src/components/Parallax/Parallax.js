import "./Parallax.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import screen from "./../../screen-1.jpg";
import MainPageQuotes from '../MainPageQuotes/MainPageQuotes.js';


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
          alt={screen}
          className="parallax"
          style={{
            transform: `translateY(${offset * 0.5}px)`
          }}
        />
        <div className="text-wrapper">
          <h1 className="headline">Quotes</h1>
        </div>
      </section>

      <div> 
<div className="card" style={{
    width: "18rem",
    marginTop: "4rem"
}}>

</div>


  <MainPageQuotes/>


      {/* Make space to scroll */}
      <section className="overflow" />
    </div>
     </div>
  );
}

  export default withRouter(Parallax);