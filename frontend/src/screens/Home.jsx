import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "./card";
import Footer from "../components/Footer";
// import {products} from '../data'
import EnhancedTable from "../components/table";
import ContactUs from "./contactUs";
import slider1 from "../logos/slider1.jpeg";
import slider2 from "../logos/slider2.jpg";
import slider3 from "../logos/slider3.jpeg";
import SearchIcon from "@mui/icons-material/Search";
// =============================================
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState } from "react";
function Home() {
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "productImages/");
  const [allProducts, setAllProducts] = useState([]);
  const [productCatArr, setProductCatArr] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    getData();
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        // item.location.path
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [
            ...prev,
            { location: item?._location?.path, url: url },
          ]);
        });
      });
    });
    getProductCategory();
  }, []);
  useEffect(() => {}, [localStorage.getItem("loginData")]);
  const getData = async () => {
    setAllProducts([]);
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArray = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        productsArray.push(doc.data());
      });
      setAllProducts(productsArray);
    }
  };
  const sizes = ["small", "medium", "large", "x-large"];
  const getImageUrl = (product) => {
    // let imageURLSARR= []
    let reqImagesUrl = product?.imageURL?.map((y)=>(
      imageUrls.find((x) => x?.location == y)))
      // console.log('reqImagesUrl',reqImagesUrl)
      // imageURLSARR.push(reqImagesUrl)
      return reqImagesUrl 
    // console.log('imageURLSARR',imageURLSARR)
    // return imageURLSARR;
  };
  const getProductCategory = async () => {
    setProductCatArr([]);
    const querySnapshot = await getDocs(collection(db, "productsCategory"));
    const productsCatArray = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        productsCatArray.push(doc.data());
      });
      setProductCatArr(productsCatArray);
    }
  };

  console.log('allProducts' , allProducts)

  return (
    <div>
      {/* <div>
        <Navbar />
      </div> */}
      <div>
        {/* <Carousel /> */}
        {/* Carousel Start */}
        <div
          id="carouselExampleCaptions "
          className="carousel slide carouselHide"
          data-bs-ride="false"
          style={{ objectFit: "contain" }}
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
            <div className="carousel-caption d-none d-sm-inline" style={{ zIndex: 10 }}>
              <form className="d-flex">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearchProduct(e.target.value)}
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
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Carousel End */}
      </div>
      <div className="m-2 mobView-card-mainDiv">
        <div className="d-flex justify-content-between w-100">
        <h4>All Products</h4>
        <div className="d-sm-none border w-50 d-flex align-items-center">
          <input className="mb-searchInp  border-0 w-100" placeholder="Search"  onChange={(e) => setSearchProduct(e.target.value)}/>
          <SearchIcon/>
        </div>
        </div>
        <div className="container m-0">
          {productCatArr?.map((data) => {
            return (
              <div className="row">
                {allProducts.some((e, i) => e?.type == data?.CategoryName) ? (
                  <>
                    <div className="fs-3 m-3">
                      {data.CategoryName.toUpperCase()}
                    </div>
                    <hr
                      id="hr-success"
                      style={{
                        height: "4px",
                        backgroundImage:
                          "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                      }}
                    />
                  </>
                ) : null}

                {allProducts
                  .filter(
                    (e, i) =>
                      e?.type == data?.CategoryName &&
                      e.Name.toLowerCase().includes(searchProduct.toLowerCase())
                  )
                  .map((product) => {
                    {
                      return (
                        <div className="col-12 col-md-6 col-lg-4">
                          <Card
                            product={product}
                            imageURL={getImageUrl(product)}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            );
          })}
          {/* {allProducts.map((e, i) => {
            return <Card product={e} imageURL={getImageUrl(e)} />;
          })} */}
        </div>
        {/* {        imageUrls.map((x)=>{
  return(
    <>
    <p>{x.location}</p>
    <img src={x?.url}/>
    </>
  )
})
} */}
      </div>
      {/* <div id="contactus">
        <ContactUs/> 
      </div> */}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
