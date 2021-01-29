import React from "react";
import { Link } from "react-router-dom";
import { Col } from "antd";

function GridCrews(props) {
  return (
    <Col lg={6} md={8} xs={24}>
      <div>      
          <img
            src={props.image}
            alt={props.crewname}
            style={{ width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              font: "1rem",
              fontWeight: 'bold',
              color: "black",
              marginBottom: "0.5vh",
            }}
          >
            {props.crewName} / {props.crewCharacter}
          </div>
      </div>
    </Col>
  );
}

export default GridCrews;
