import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import MainImage from "./Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCrews from "./Sections/GridCrews";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../config/config";

import { Button, Row } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;

  const [movie, setMovie] = useState([]);
  const [crews, setCrews] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });
    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCrews(response.cast);
        console.log(crews);
      });
  }, []);

  return (
    <div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          description={movie.overview}
        />
        <MovieInfo movie={movie} />
        <br />
        {/* Actor Grid */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<DownSquareOutlined />}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            Toggle Actor View
          </Button>
        </div>
        {toggle && (
          <Row gutter={[16, 16]}>
            {crews &&
              crews.map((crew, index) => (
                <GridCrews
                  key={index}
                  image={
                    crew.profile_path
                      ? `${IMAGE_BASE_URL}w500${crew.profile_path}`
                      : null
                  }
                  movieId={crew.id}
                  crewName={crew.name}
                  crewCharacter={crew.character}
                />
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default withRouter(MovieDetail);
