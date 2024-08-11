import React, { useEffect } from "react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { ProductTypes } from "../enums/enums";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import CircularIndeterminate from "../components/spinner";
import { deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SimpleAlert from "../components/alertBox";
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
  const Navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [hideSize, setHideSize] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [fileUpload, setFileUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  const imagesListRef = ref(storage, "images/");

  const [selectedProduct, setselectedProduct] = useState({
    Name: "",
    quantity: 0,
    price: 0,
    description: "",
    sizes: [],
    imageURL: [],
    type: "",
  });
  const [productCat, setProductCat] = useState({});
  const [productCatArr, setProductCatArr] = useState([]);
  const [productLoader, setProductLoader] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [unitType, setunitType] = useState([]);


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
  const onSelectImage = (e) => {
    if (e.target.files.length > 4) {
      alert("Only 4 file Can be uplaoded");
      setImageUpload([]);
      e.target.value = "";
      return;
    } else {
      setImageUpload(e.target.files);
    }
  };
  const onSelecteProduct = (e) => {
    // console.log('Switch',productCatArr)
    switch (e.target.value) {
      case "bedsheet":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["king", "queen", "twin"],
          type: e.target.value,
        });
        setunitType(['Kg','Pcs'])
        break;
      case "towel":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["sm", "md", "large"],
          type: e.target.value,
        });
        setunitType(['Kg','Pcs'])
        break;
      case "garment":
        setselectedProduct({
          ...selectedProduct,
          sizes: ["sm", "md", "large"],
          type: e.target.value,
        });
        setunitType(['Kg','Pcs'])
        break;
      case "fabric":
        setselectedProduct({
          ...selectedProduct,
          // sizes: ["sm", "md", "large"],
          type: e.target.value,
        });
        setunitType(['Kg','Metre','Yard'])

        break;
    }
    setHideSize(true);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    if (imageUpload === null) {
      //   toastifyError("Please select an image");
      return;
    }
    // const imageRef = ref(storage, `${selectedProduct?.name}/${imageUpload.name + v4()}`);
    console.log("Image Upload", imageUpload);
    let imageURLs = [];
    for (let i = 0; i < imageUpload.length; i++) {
      const imageRef = ref(storage, `productImages/${imageUpload[i]?.name}`);

      await uploadBytes(imageRef, imageUpload[i])
        .then((snapshot) => {
          imageURLs.push(snapshot.ref?._location?.path_);
          // console.log(snapshot, "snapshot.ref");
          // console.log(imageURLs, "imageURLs");
          setselectedProduct({
            ...selectedProduct,
            imageURL: imageURLs,
          });
        })
        .catch((error) => {
          console.log(error, "error");
          // toastifyError(error.message);
        });
    }
    setFileUpload(true);
    // listAll(imagesListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       setImageUrls((prev) => [...prev, url]);
    //     });
    //   });
    // });
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
  const addProduct = async () => {
    setProductLoader(true);
    console.log("Finaal Pro", selectedProduct);
    const id = Math.round(Math.random() * 1000);
    // setselectedProduct({...selectedProduct,id:id})
    let obj = { ...selectedProduct, id: id };

    const cityRef = doc(db, "products", JSON.stringify(id));
    await setDoc(cityRef, obj);
    setProductLoader(true);
    Navigate("/");
  };
  const addProductCat = async () => {
    setLoading(true);
    setDelLoading(true);
    if(productCat?.CategoryName){
      const id = Math.round(Math.random() * 1000);
      let obj = { ...productCat, id: id };
      const productCatRef = doc(db, "productsCategory", JSON.stringify(id));
      await setDoc(productCatRef, obj);
      setIsAlert(true);
      setAlertMessage("Added Category Successfully");
      await getProductCategory();
      setIsAlert(false);
    }
    setDelLoading(false);
    setLoading(false);
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
  const deleteCategory = async (id) => {
    setDelLoading(true);
    await deleteDoc(doc(db, "productsCategory", JSON.stringify(id)));
    setIsAlert(true);
    setAlertMessage("Deleted Category Successfully");
    await getProductCategory();
    console.log("productCatArr", productCatArr);
    // setProductCatArr(productCatArr.filter((obj)=>obj?.id != id))
    // alert("Deleted your selected Category");
    setDelLoading(false);
    setIsAlert(false);
  };
  useEffect(() => {}, [delLoading]);
  return (
    <>
      <div className="m-4">
        <div>
          <h5>Add Product Category</h5>
        </div>

        <div className="d-flex flex-md-row flex-column gap-2 my-4">
          <TextField
            id="outlined-number"
            onChange={(e) =>
              setProductCat({ CategoryName: e.target.value.toLowerCase() })
            }
            value={productCat?.CategoryName}
            label="Product Category Name"
            name="productCategory"
            type="text"
          />
          <Button
            variant="outlined"
            color="success"
            onClick={addProductCat}
            disabled={loading}
          >
            Add Category
            {loading ? <i class="fa fa-refresh fa-spin"></i> : null}
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              showCategory ? setShowCategory(false) : setShowCategory(true);
            }}
          >
            {showCategory ? "Hide" : "Show"} All Category
          </Button>
        </div>
        {showCategory ? (
          <div className="maxWidthCat">
            {!delLoading ? (
              <ul className="list-group">
                {productCatArr.map((category) => {
                  return (
                    // d-flex align-items-center justify-content-between maxWidthCat
                    <div>
                      <li className="list-group-item d-flex align-items-center justify-content-between">
                        {category?.CategoryName.slice(0, 1).toUpperCase() +
                          category?.CategoryName.slice(1)}
                        <Button
                          onClick={() => {
                            deleteCategory(category?.id);
                          }}
                        >
                          <ClearIcon />
                        </Button>
                      </li>
                    </div>
                  );
                })}
              </ul>
            ) : (
              <CircularIndeterminate />
            )}
          </div>
        ) : null}
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
          // className="my-1"
          noValidate
          autoComplete="off"
        >
          <div className="row">
            <div className="col-sm-12 col-md-3 my-2">
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Type"
                  fullWidth
                  // className="w-sm-100"
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
            </div>

            <div className="col-sm-12 col-md-3">
              <TextField
                required
                id="outlined-required"
                label="Title"
                name="Name"
                className="my-2 mx-0"
                onChange={onChange}
                fullWidth
                // className="my-2 mx-0 w-100 w-md-25"
              />
            </div>
            <div className="col-sm-12 col-md-3">
              <TextField
                id="outlined-number"
                className="my-2 mx-0"
                fullWidth
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
                  maxlength: 5,
                }}
              />
            </div>
            <div className="col-sm-12 col-md-3 my-2">
              <FormControl sx={{ minWidth: "100%" }}>
                <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  disabled={!selectedProduct?.type}
                  id="demo-simple-select"
                  // value={age}
                  label="Type"
                  fullWidth
                  // className="w-sm-100"
                  onChange={(e) => {        
                    setselectedProduct({
                    ...selectedProduct,
                    unit: e.target.value,
                  });}}
                >
                  {unitType.map((x) => {
                    return (
                      <MenuItem value={x}>
                        {x}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-sm-12 col-md-3">
              <FormControl
                sx={{ minWidth: "100%" }}
                className="mt-md-2"
                variant="filled"
              >
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="filled-adornment-amount"
                  onChange={onChange}
                  value={selectedProduct?.price}
                  name="price"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[d]{0,11}",
                    maxlength: 5,
                  }}
                  startAdornment={
                    <InputAdornment position="start">Rs</InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="col-12 mt-md-0 mt-2">
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="col-sm-12 col-md-9 p-1">
                    <input
                      label="Image"
                      placeholder="Choose image"
                      accept="image/png,image/jpeg"
                      type="file"
                      multiple
                      className="w-100 m-2"
                      onChange={(e) => onSelectImage(e)}
                    />
                  </div>
                  <div className="col-sm-12 col-md-2 d-flex justify-content-end">
                    <Button
                      onClick={uploadFile}
                      variant="outlined"
                      startIcon={<UploadFileIcon />}
                      color="success"
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="col-12 p-1">
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
          </div>
        </Box>
        <div className="d-flex justify-content-end align-items-center">
          <Button
            variant="contained"
            color="success"
            onClick={addProduct}
            disabled={!fileUpload || productLoader}
          >
            Add Product
          </Button>
          {productLoader ? (
            <div className="d-flex align-items-center">
              <div
                class="spinner-border productLoader text-success"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {isAlert != "" ? (
        <div className="alertBox">
          <SimpleAlert message={alertMessage} />
        </div>
      ) : null}
    </>
  );
}

export default ProductForms;
