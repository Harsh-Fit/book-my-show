import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function MovieListing() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    let result = await fetch("http://localhost:5000/movies", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    let data = await result.json();
    console.log("Movie List -", data);
    setMovie(data);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setMovie(result);
      }
    } else {
      getMovies();
    }
  };

  const bookMyShow = async (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="product-table">
      <h4>MOVIES</h4>
      <input
        className="searchbox"
        type="search"
        placeholder="Search Movies"
        onChange={searchHandle}
      />
      <div className="cards">
        {movie.map((item, i) => (
          <Card
            style={{
              width: "20rem",
              border: "1px solid black",
              margin: "20px",
            }}
            key={i}
          >
            <Card.Img variant="top" src={item.moviePoster} alt="ProductImg" />
            <Card.Body>
              <Card.Title>{item.movieName}</Card.Title>
              <Card.Text>Category : {item.category}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Release : {item.releaseDate}</ListGroup.Item>
              <ListGroup.Item>Genre : {item.genre}</ListGroup.Item>
              <ListGroup.Item>Rating : {item.rating}</ListGroup.Item>
              <ListGroup.Item>
                {/* <h5>Price : {item.price.toLocaleString("en-IN")} ₹</h5> */}
              </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary" onClick={() => bookMyShow(item._id)}>
                Book Tickets
              </Button>{" "}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MovieListing;
