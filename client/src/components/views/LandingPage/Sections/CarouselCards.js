import React from "react";
import { Link } from "react-router-dom";

function CarouselCards(props) {
  return (
    <div
      style={{
        borderRadius: "24px",
        backgroundImage: `url('${props.image}')`,
        backgroundSize: "100%, cover",
        backgroundPosition: "center ,center  ",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        position: "relative",
        margin: " 1vh 5vh ",
      }}
    >
      <div
        style={{
          position: "absolute",
          maxWidth: "20vw",
          bottom: "2rem",
          marginLeft: "2rem",
        }}
      >
        <Link to={`/movie/${props.movieId}`}>
          <h2 style={{ color: "white", fontSize: "2rem" }}>{props.title}</h2>
        </Link>
        <p style={{ color: "white", fontSize: "1rem" }}>{props.description}</p>
      </div>
    </div>
  );
}

export default CarouselCards;
