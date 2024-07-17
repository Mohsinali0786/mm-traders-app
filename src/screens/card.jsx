import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import ClearIcon from '@mui/icons-material/Clear';
function Card({ product, imageURL }) {
  const deleteProduct = async ()=>{
    await deleteDoc(doc(db, "products", JSON.stringify(product?.id)));
  }
  console.log(product, "products");
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", height: "300px" }}>
        <div className="w-100">
          <div className="d-flex flex-column gap-1 text-align-end">
            <span class="badge badge-pill bg-success">{product.type}</span>
          </div>
          {/* <div> */}
            <div className="cancelBtn-pos">
              <ClearIcon sx={{ color: "white" }}  onClick = {deleteProduct} />
            </div>
          {/* </div> */}
          <div className="d-flex justify-content-between m-2">
            <span class="badge badge-pill bg-success">
              Quantity {product.quantity} Pcs
            </span>
            <span class="badge badge-pill bg-success">
              Price {product.price} $
            </span>
          </div>
        </div>
        <div className="text-center">
          <img
            className="card-img-top w-50 productImage"
            src={imageURL}
            alt="Card image cap"
          />
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
            <div>
              <h5 className="card-title">{product.Name}</h5>
            </div>
            {/* <div className="d-flex flex-column gap-1 text-align-end">
              <span class="badge badge-pill bg-success">
                Quantity {product.quantity} Pcs
              </span>
              <span class="badge badge-pill bg-success">
                Price {product.price} $
              </span>
            </div> */}
            {/* <div className="d-inline h-100 fs-12"> {product.price}</div> */}
          </div>
          <p className="card-text">
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
