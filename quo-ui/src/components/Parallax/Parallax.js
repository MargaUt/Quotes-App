import "./Parallax.css";
import React from "react";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import screen from "./../../screen-1.jpg";


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
      <h1 style={{
          marginTop: '15px',
      }}>Dashboard</h1>
<div className="card" style={{
    width: "18rem",
    marginTop: "4rem"
}}>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

</div>

<div class="card" style={{
          marginTop: '15px',
      }}>
  <div class="card-header">
    Quote
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
  </div>
</div>

<div class="row"
style={{
          marginTop: '30px',
      }}>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>

<div class="jumbotron"
style={{
          marginTop: '30px',
      }}>
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr class="my-4"/>
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
  </p>
</div>

      {/* Make space to scroll */}
      <section className="overflow" />
    </div>
  );
}

  export default withRouter(Parallax);