import React, { useEffect, useState } from "react";
import axios from "axios";
import { IMAGE_BASE_URL } from "../../../config/config";

import { Button, Popover } from "antd";
import "./favorite.css";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavoriteMovie = () => {
    axios
    .post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    })
    .then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("Fail to Load My Favorites");
      }
    });
  }

    const onClickDelete = (movieId, userFrom) => {
        axios.post('./api/favorite/removeFavorite',{userFrom, movieId}).then(response => {
            if(response.data.success) {
                fetchFavoriteMovie()
            }else {
                alert('Fail to Load My Favorites')
            }
        })
    }

  const favoriteTable = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          "NO IMAGE"
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime}</td>
        <td>
          <Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
   fetchFavoriteMovie()
  }, []); 

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove From Favorites</td>
          </tr>
        </thead>
        <tbody>{favoriteTable}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
