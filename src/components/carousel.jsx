import React from "react";
import slider1 from '../logos/slider1.jpeg'
import slider2 from '../logos/slider2.jpg'
import slider3 from '../logos/slider3.jpeg'
export default function Carousel() {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
      style={{objectFit:"contain"}}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner" id="carousel">
        <div className="carousel-caption" style={{zIndex:10}}>
          <form className="d-flex">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0 text-white bg-success"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="carousel-item active">
          <img
            src={slider1}
            className="d-block w-100 min-w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src={slider2}
            className="d-block w-100 min-w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src={slider3}
            className="d-block w-100 min-w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
