import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        borderRadius: "24px",
        backgroundImage: `url('${props.image}')`,
        backgroundSize: "100%, cover",
        backgroundPosition: "center ,center  ",
        backgroundRepeat: "no-repeat",
        height: "50vh",
        position: "relative"       
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
        <h2 style={{ color: "white", fontSize: "2rem" }}>{props.title}</h2>
        <p style={{ color: "white", fontSize: "1rem" }}>{props.description}</p>
      </div>
    </div>
  );
}

export default MainImage;
