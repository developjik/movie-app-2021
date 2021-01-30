import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";

import axios from "axios";

import MainImage from "./Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCrews from "./Sections/GridCrews";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../config/config";

import { Button, Row, BackTop } from "antd";
import {
  DownSquareOutlined,
  StarOutlined,
  StarTwoTone,
} from "@ant-design/icons";

function MovieDetail(props) {
  const movieId = props.match.params.movieId;
  const userData = {
    userFrom: window.localStorage.getItem("userId"),
    movieId: props.match.params.movieId,
  };

  const [movie, setMovie] = useState([]);
  const [crews, setCrews] = useState([]);
  const [toggle, setToggle] = useState(false);

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const onClickFavorite = () => {
    const data = {
      ...userData,
      movieTitle: movie.title,
      moviePost: movie.backdrop_path,
      movieRunTime: movie.runtime,
    };

    if (favorited) {
      axios.post("/api/favorite/removeFavorite", data).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber - 1);
          setFavorited(!favorited);
        } else {
          alert("Fail to remove Favorite");
        }
      });
    } else {
      axios.post("/api/favorite/addFavorite", data).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("Fail to remove Favorite");
        }
      });
    }
  };

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
      });

    axios.post("/api/favorite/favoriteNumber", userData).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("Fail to load Movie Data");
      }
    });

    axios.post("/api/favorite/favorited", userData).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("Fail to load My Favorite Movie Data");
      }
    });
  }, []);

  return (
    <div>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Image */}
        {movie !== undefined && (
          <MainImage
            image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
            title={movie.original_title}
            description={movie.overview}
          />
        )}
        {/* facorite button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1vh 1vh",
          }}
        >
          <Button
            type="default"
            shape="round"
            size="large"
            icon={favoriteNumber ? <StarTwoTone /> : <StarOutlined />}
            onClick={onClickFavorite}
          >
            {""}
            {favoriteNumber}
          </Button>
        </div>
        {/* Movie Info */}
        <MovieInfo movie={movie} />
        <br />

        {/* Actor Grid + Button */}
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
        <BackTop />
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
