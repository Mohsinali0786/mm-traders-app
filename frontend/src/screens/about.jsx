import React, { useEffect } from "react";
function About() {
  return (
    <div className="m-4">
      <h3 className="text-center my-2">
        <i>
          Welcome to <b>MM Garments</b>
        </i>
      </h3>
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
    </div>
  );
}

export default About;
