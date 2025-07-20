import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
function About() {
  return (
    <div className="m-4">
      <h3 className="text-center my-2">
        <i>
          Welcome to <b>MM Garments</b>
        </i>
      </h3>
      <div className="d-flex justify-content-end gap-4">
        <div className="d-flex justify-content-center flex-column align-items-end">
          <Avatar sx={{ bgcolor: "green"}} alt="Remy Sharp">A</Avatar>
          <p className="small">Muhammad Ali (CEO)</p>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-end">
          <Avatar alt="Remy Sharp" sx={{ bgcolor: "white", color:"green", border:"1px solid black"}}>MF</Avatar>
          <p className="small">Mohsin & Farzan (COO)</p>
        </div>
      </div>

      <p className="small">
        MM Traders was founded in 2000 with a vision to simplify sourcing and
        supply for small and large businesses alike. With humble beginnings in
        Karachi, we’ve grown into a trusted name in the trading industry
      </p>
      <p className="small">
        We not only want to make you look different, but also feel different
        because our vision at MM Garments is clothing with power! Founded by an
        enthusiasm for fashion and a dedication to excellence, we have been
        serving both local as well as international markets from Pakistan since
        the year 2000.
      </p>
      <h6>
        <b>Our Story</b>
      </h6>
      <p className="small">
        It started out with a simple yet bold mission: to make clothing at the
        intersection of comfort, style, and durability. What was once a humble
        workshop has since blossomed into a productive business, all due to the
        unwavering loyalty of those who patron us.
      </p>
      <h6>
        <b>Our Mission</b>
      </h6>
      <p className="small">
        Our mission is powered by a passion for creativity and ingenuity to
        provide you with select apparel that not only meets but exceeds the
        measure. We put thought into every piece of both our fabric choices and
        our stitches; we are committed to the utmost quality and excellence.{" "}
      </p>
      <p className="small">
        Our clientele includes retailers, wholesalers, and businesses across
        Pakistan — and we are expanding into export markets across worldwide.
      </p>
      <h6>
        <b>What we Offer</b>
      </h6>
      <p className="small">
        We are working in flannel fabric from past 30+ years both locally and
        export We do shipments of flannel night dress in Canada and dusters in
        Germany. In past We have major focus in flannel fabric items.Recently we
        expand our work in Cotton PC Twill and hosiery and towel items We work
        in following mentioned items
        <ul className="mt-2">
          <li className="mt-2">
            <span className="fw-bolder">Flannel</span>
            <ol>
              <li>Bedsheet , Fitted , Bed Cover , Pillow and Cushion</li>
              <li>Night Dress</li>
              <li>Garments</li>
              <li>Dusters</li>
              <li>Weapon Cleaning fabric</li>
            </ol>
          </li>
          <li className="mt-2">
            <span className="fw-bolder">Cotton PC</span>
            <ol>
              <li>Bedsheet , Fitted , Bed Cover , Pillow and Cushion</li>
              <li>Garments</li>
            </ol>
          </li>
          <li className="mt-2">
            <span className="fw-bolder">Hosirey</span>
            <ol>
              <li>Bedsheet , Fitted , Bed Cover , Pillow and Cushion</li>
              <li>Garments</li>
            </ol>
          </li>
          <li className="mt-2">
            <span className="fw-bolder">Others</span>
            <ol>
              <li>Towels</li>
              <li>Kitchen Towels</li>
            </ol>
          </li>
        </ul>
      </p>
      <p className="medium">
        Interested in working with MM Traders?{" "}
        <Link to="/contactus">Contact us </Link> today or browse our product
        range to get started.
      </p>
    </div>
  );
}

export default About;
