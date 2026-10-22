import express from "express"
import { sellerAuthenticate } from "../middleware/auth.middleware.js";
import multer, { memoryStorage } from "multer";
import { createProduct, getProductBySeller , getAllProduct, getProductDetails } from "../controller/product.controller.js";
import { validationProduct } from "../validator/product.validator.js";

const ProductRouter = express.Router();

const upload = multer({
    storage: memoryStorage(),
    file: {
        fieldSize: 5 * 1024 * 1024 //maximum 5 MB data
    }
})

// @routes /api/product/create
//@description to create a product

ProductRouter.post(
  "/create",
  sellerAuthenticate,
  upload.array("images", 7),
  validationProduct,
  createProduct,
);


ProductRouter.get("/seller", sellerAuthenticate, getProductBySeller)

ProductRouter.get("/getProducts", getAllProduct)

ProductRouter.get("/details/:id", getProductDetails)

export default ProductRouter