import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../../config/config";

import CarouselCards from "./Sections/CarouselCards";
import GridCards from "./Sections/GridCards";

import { Row, Button, Carousel } from "antd";
import { DownSquareOutlined } from "@ant-design/icons";

function LandingPage(props) {
  const [movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const onLoadMoreMovies = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko_KR&page=${
      currentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko_KR&page=1`;
    fetchMovies(endpoint);
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main image Carousel*/}
      <Carousel autoplay>
        {movies &&
          movies.map((movie, index) => (
            <CarouselCards
              key={index}
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                  : null
              }
              movieId={movie.id}
              title={movie.original_title}
              description={movie.overview}
            />
          ))}
      </Carousel>
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        {/* movie grid cards */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, index) => (
              <GridCards
                key={index}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<DownSquareOutlined />}
          onClick={onLoadMoreMovies}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
