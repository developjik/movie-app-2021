import React from "react";
import { Link } from "react-router-dom";
import { Col } from "antd";

function GridCards(props) {
  return (
    <Col lg={6} md={8} xs={24}>
      <div>
        <Link to={`/movie/${props.movieId}`} style={{ position: "relative" }}>
          <img
            src={props.image}
            alt={props.movieName}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              font: "1rem",
              fontWeight: 'bold',
              color: "black",
              marginBottom: "1vh",
            }}
          >
            {props.movieName}
          </div>
        </Link>
      </div>
    </Col>
  );
}

export default GridCards;
