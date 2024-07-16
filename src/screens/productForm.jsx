import React, { useEffect } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { ProductTypes } from "../enums/enums";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytes,
  list,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  FilledInput,
  Input,
  Button,
} from "@mui/material";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
function ProductForms() {
  const [inputValue, setInputValue] = useState("");
  const [hideSize, setHideSize] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  const imagesListRef = ref(storage, "images/");

  const [selectedProduct, setselectedProduct] = useState({
    Name: "",
    quantity: 0,
    price: 0,
    description: "",
    sizes: [],
    imageURL: "",
    type: "",
  });
  const [productCat, setProductCat] = useState({});
  const [productCatArr, setProductCatArr] = useState([]);

  function onChange(e) {
    if (e.target.name == "quantity" || e.target.name == "price")
      setselectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value.replace(/\D/g, ""),
      });
    else {
      setselectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    }
  }
  const onSelecteProduct = (e) => {
    switch (e.target.value) {
      case "bedsheet":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["king", "queen", "twin"],
          type: e.target.value,
        });
        break;
      case "towel":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["sm", "md", "large"],
          type: e.target.value,
        });
        break;
      case "garment":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["sm", "md", "large"],
          type: e.target.value,
        });
        break;
    }
    setHideSize(true);
  };
  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload === null) {
      //   toastifyError("Please select an image");
      return;
    }
    // const imageRef = ref(storage, `${selectedProduct?.name}/${imageUpload.name + v4()}`);
    const imageRef = ref(storage, `productImages/${imageUpload?.name}`);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        console.log(snapshot, "snapshot.ref");
        setselectedProduct({
          ...selectedProduct,
          imageURL: snapshot.ref?._location?.path_,
        });
        // listAll(imagesListRef).then((response) => {
        //   response.items.forEach((item) => {
        //     getDownloadURL(item).then((url) => {
        //       setImageUrls((prev) => [...prev, url]);
        //     });
        //   });
        // });
      })
      .catch((error) => {
        console.log(error, "error");
        // toastifyError(error.message);
      });
  };
  useEffect(() => {
    getProductCategory();
  }, []);
  useEffect(() => {
    const findProduct = productCatArr.find(
      (x) => x?.name == selectedProduct?.name
    );
    if (findProduct)
      return setselectedProduct({
        ...selectedProduct,
        sizes: findProduct?.sizes,
      });
  }, []);
  // useEffect(()=>{
  //   listAll(imagesListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, [])
  const addProduct = () => {
    console.log("Finaal Pro", selectedProduct);
    const id = Math.round(Math.random() * 1000);
    const cityRef = doc(db, "products", JSON.stringify(id));
    setDoc(cityRef, selectedProduct);
  };
  const addProductCat = () => {
    const id = Math.round(Math.random() * 1000);
    const productCatRef = doc(db, "productsCategory", JSON.stringify(id));
    setDoc(productCatRef, productCat);
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
  return (
    <>
      <div className="m-4">
        <div>
          <h5>Add Product Category</h5>
        </div>

        <div className="d-flex gap-2 my-4">
          <TextField
            id="outlined-number"
            onChange={(e) =>
              setProductCat({ CategoryName: e.target.value.toLowerCase() })
            }
            value={productCat?.CategoryName}
            label="Product Category"
            name="productCategory"
            type="text"
          />
          <Button variant="outlined" color="success" onClick={addProductCat}>
            Add Category
          </Button>
        </div>
        <hr
          id="hr-success"
          style={{
            height: "4px",
            backgroundImage:
              "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
          }}
        />
        <h5>Add Product</h5>
        <Box
          component="form"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Type"
                onChange={(e) => onSelecteProduct(e)}
              >
                {productCatArr.map((x) => {
                  return (
                    <MenuItem value={x?.CategoryName}>
                      {x?.CategoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              required
              id="outlined-required"
              label="Required"
              name="Name"
              onChange={onChange}
            />
            <TextField
              id="outlined-number"
              onChange={onChange}
              value={selectedProduct?.quantity}
              label="Quantity"
              name="quantity"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[d]{0,11}",
                maxlength: 2,
              }}
            />
            <FormControl sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                onChange={onChange}
                value={selectedProduct?.price}
                name="price"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[d]{0,11}",
                  maxlength: 3,
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </FormControl>

            <Input
              label="Image"
              placeholder="Choose image"
              accept="image/png,image/jpeg"
              type="file"
              className="m-2"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
            <Button
              onClick={uploadFile}
              variant="outlined"
              startIcon={<UploadFileIcon />}
              color="success"
            >
              Upload
            </Button>
            {/* {
            hideSize ? 
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Sizes</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                  value={selectedProduct?.sizes}
                label="Size"
              onChange={onChange}
                //   onChange={handleChange}
              >
                {selectedProduct.sizes &&
                  selectedProduct?.sizes?.map((x) => {
                    return <MenuItem value={x}>{x}</MenuItem>;
                  })}
              </Select>
            </FormControl>
            :
            null
          } */}
            <TextField
              id="outlined-multiline-static"
              label="Product description"
              name="description"
              multiline
              rows={4}
              onChange={onChange}
              fullWidth
            />
          </div>
        </Box>
        <div className="d-flex justify-content-end">
          <Button variant="outlined" color="success" onClick={addProduct}>
            Add Product
          </Button>
        </div>
      </div>
    </>
  );
}

export default ProductForms;
