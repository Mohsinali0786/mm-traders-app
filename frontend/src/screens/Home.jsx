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
import ClearIcon from "@mui/icons-material/Clear";
// =============================================
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useState } from "react";
import { MakeCapitalFirstLetter } from "../commonFunctions/makeFirstLetterCap";
import { RemoveDuplicates } from "../commonFunctions/removeDuplicateArray";
import Documents from "../components/hisabKitab/hisabkitab";
function Home() {
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "productImages/");
  const [allProducts, setAllProducts] = useState([]);
  const [productCatArr, setProductCatArr] = useState([]);
  const [productCatArrForFilter, setProductCatArrForFilter] = useState([]);
  const [filtersArray, setFiltersArray] = useState([]);
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
  useEffect(() => {
    let filterdData = [];
    filtersArray.map((x) => {
      let data = allProducts.filter((y) => y?.type == x.toLowerCase());
      for (let i = 0; i < data.length; i++) {
        filterdData.push(data[i]);
      }
    });
    setAllProducts(filterdData);
    if (filtersArray.length < 1) {
      setAllProducts(productCatArrForFilter);
    }
  }, [filtersArray]);
  const getData = async () => {
    setAllProducts([]);
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsArray = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        productsArray.push(doc.data());
      });
      setAllProducts(productsArray);
      setProductCatArrForFilter(productsArray); // Make copy for filter purpose
    }
  };
  const sizes = ["small", "medium", "large", "x-large"];
  const getImageUrl = (product) => {
    // let imageURLSARR= []
    let reqImagesUrl = product?.imageURL?.map((y) =>
      imageUrls.find((x) => x?.location == y)
    );
    // console.log('reqImagesUrl',reqImagesUrl)
    // imageURLSARR.push(reqImagesUrl)
    return reqImagesUrl;
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

  console.log("filtersArray", filtersArray);

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
            <div
              className="carousel-caption d-none d-sm-inline"
              style={{ zIndex: 10 }}
            >
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
                style={{height:'350px'}}
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
            <input
              className="mb-searchInp  border-0 w-100"
              placeholder="Search"
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <SearchIcon />
          </div>
        </div>
        <div className="d-flex">
          <div className="container m-2 productScroll">
            {productCatArr?.map((data, i) => {
              return (
                <div className="row" key={i}>
                  {/* {allProducts.some((e, i) => e?.type == data?.CategoryName) ? (
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
                ) : null} */}

                  {allProducts
                    .filter(
                      (e, i) =>
                        e?.type == data?.CategoryName &&
                        e.Name.toLowerCase().includes(
                          searchProduct.toLowerCase()
                        )
                    )
                    .map((product, i) => {
                      {
                        return (
                          <div className="col-12 col-md-6 col-lg-4" key={i}>
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
          <div className="border p-2 rounded maxWidthFIltered d-none d-lg-block">
            <div className="mb-4 ">
              {filtersArray.length > 0 ? (
                <>
                  <p class="ribbon bg-success text-white">Filtered By</p>
                  <div className="d-flex flex-wrap gap-1">
                    {filtersArray?.map((x) => (
                      <span className="border border-2 rounded mx-1 p-1 d-flex align-items-center">
                        {/* <div className="d-flex align-items-center "> */}
                          {MakeCapitalFirstLetter(x)}
                          <ClearIcon
                            sx={{ fontSize: "15px", marginLeft: "2px" }}
                            className="pointer"
                            onClick={(e) => {
                              setFiltersArray(
                                filtersArray.filter((y) => y != x)
                              );
                            }}
                          />
                        {/* </div > */}
                      </span>
                    ))}
                  </div>
                  {/* <p>Filtered By</p> */}
                  <hr />
                </>
              ) : null}
            </div>
            {/* <p>Category Name</p> */}
            <p class="ribbon bg-success text-white">Category Name</p>
            <div className="d-flex flex-wrap gap-1">

            {productCatArr?.map((x, i) => {
              return (
                // <div>
                  <span
                    className="border border-2 p-1 pointer"
                    onClick={(e) => {
                      console.log(filtersArray);
                      setFiltersArray(
                        RemoveDuplicates([...filtersArray, e.target.innerText])
                      );
                      setAllProducts(productCatArrForFilter);
                    }}
                    key={i}
                  >
                    {MakeCapitalFirstLetter(x?.CategoryName)}
                  </span>
                // </div>
              );
            })}
            </div>
          </div>

        </div>
      {/* <Documents/> */}

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
