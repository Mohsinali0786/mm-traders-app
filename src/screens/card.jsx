import React from "react";

function Card({ product }) {
  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: "18rem", maxHeight: "360px", alignItems: "center" }}
      >
        <img
          className="card-img-top w-50"
          src="https://tulips.com.pk/cdn/shop/files/1-min_f5ba6174-7e00-4a5b-9695-5b0f565c9c60.jpg?v=1689597904"
          alt="Card image cap"
        />
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title">{product.name}</h5>
            </div>
            <div className="d-flex flex-column gap-1 text-align-end">
              <span class="badge badge-pill bg-success">
                Quantity {product.quantity} Pcs
              </span>
              <span class="badge badge-pill bg-success">
                Price {product.price} Rs
              </span>
            </div>
            {/* <div className="d-inline h-100 fs-12"> {product.price}</div> */}
          </div>
          <p className="card-text">{product.description}</p>
          <div className="container w-100">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
