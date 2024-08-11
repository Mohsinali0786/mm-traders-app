import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import ClearIcon from "@mui/icons-material/Clear";
// import ImageListComponent from "../components/imageList";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { MakeCapitalFirstLetter } from "../commonFunctions/makeFirstLetterCap";
function Card({ product, imageURL }) {
  console.log("imageURL", imageURL);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const deleteProduct = async () => {
    await deleteDoc(doc(db, "products", JSON.stringify(product?.id)));
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("loginData"));
    if (user?.role == "admin") {
      setIsUserAdmin(true);
    }
  }, []);
  console.log(product, "products");
  return (
    <div className="mobView-card-InnerMainDiv">
      <div className="card mt-3" style={{ width: "18rem", height: "300px" }}>
        <div className="w-100">
          {isUserAdmin ? (
            <div className="d-flex justify-content-between align-items-center">
                <span className="badge badge-pill bg-success">
                Category  {MakeCapitalFirstLetter(product.type)}
                </span>
              <span className="badge badge-pill bg-success">
                <ClearIcon sx={{ color: "whiite" }} onClick={deleteProduct} />
              </span>
            </div>
          ) : null}
          {/* <div> */}
          {/* <div className="cancelBtn-pos">
              <ClearIcon sx={{ color: "white" }}  onClick = {deleteProduct} />
            </div> */}
          {/* </div> */}
          <div className="d-flex justify-content-between m-2">
            <span className="badge badge-pill bg-success">
              Quantity {product.quantity} {product.unit}
            </span>
            <span className="badge badge-pill bg-success">
              Price {product.price} Rs
            </span>
          </div>
          {product?.sizes && product?.sizes.length > 0 ? (
            <div className="d-flex justify-content-between align-items-center  m-2 ">
              <span className="">Sizes</span>
              <div className="d-flex gap-2">
                {product?.sizes.map((x) => (
                  <span className="badge badge-pill bg-success">{x}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="text-center">
          {/* <img
            className="card-img-top w-50 productImage"
            src={imageURL}
            alt="Card image cap"
          /> */}
          {/* <ImageListComponent imageURLS={product?.imageURL}/> */}
          <ImageList cols={4} rowHeight={50}>
            {imageURL?.map((item) => {
              // console.log('item?.url',item)
              return (
                <ImageListItem key={item?.url}>
                  <img
                    srcSet={`${item?.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item?.url}?w=164&h=164&fit=crop&auto=format`}
                    // alt={item.title}
                    loading="lazy"
                    className="btn h50"
                    onClick={() => window.open(`${item?.url}`, "_blank")}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <div>
              <h5 className="card-title">{product.Name}</h5>
            </div>
            {/* <div className="d-flex flex-column gap-1 text-align-end">
              <span className="badge badge-pill bg-success">
                Quantity {product.quantity} Pcs
              </span>
              <span className="badge badge-pill bg-success">
                Price {product.price} $
              </span>
            </div> */}
            {/* <div className="d-inline h-100 fs-12"> {product.price}</div> */}
          </div>
          <p className="card-text descriptionHeight">
            <span>
              <b>Description</b>
              <br />
            </span>
            <span className="fs-13">{product.description}</span>
          </p>

          {/* <div className="container w-100">
            Select Quantity
            <select name="" id="" className="m-2 h-100  bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            Select Size
            <select name="" id="" className="m-2 h-100  bg-success rounded">
              {product?.sizes.map((e, i) => {
                return (
                  <option key={i + 1} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
