import productModel from "../model/product.model.js";
import { uploadImage } from "../services/storage.service.js";

export async function createProduct(req, res) {
    

    const { title, description, priceAmount , priceCurrency } = req.body
    try {
        const seller = req.user;
        const sellerName = seller.fullname

        if (!req.files || req.files.length === 0) {
          return res
            .status(400)
            .json({
              success: false,
              message: "At least one image is required",
            });
        }

        const images = await Promise.all(req.files.map(async (file) => {
            const result =  await uploadImage({
                buffer: file.buffer,
                fileName: file.originalname
            })
    
             console.log("upload result:", result);

            return {
                url: result.url,
                alt:result.name
            }
        }))

        const product = await productModel.create({
            title: title,
            description: description,
            price: {
                amount: priceAmount,
                currency: priceCurrency
            },
            images,
            seller: seller._id
        })

        return res.status(201).json({
            message: "product created successfully",
            success: true,
            product
        })
    } catch (err) {
        console.log(err);
    }
}

export async function getProductBySeller(req, res) {
    const seller = req.user

    const products = await productModel.find({ seller: seller._id })
    
    if (!products) {
        return res.status(404).json({
            message: "products not found",
            success: false,
        })
    }

    return res.status(200).json({
        message: "products fetched successfully",
        success: true,
        products
    })

}

export async function getAllProduct(req, res) {
    
    const products = await productModel.find();

    return res.status(200).json({
        message: "products fetched successfully",
        success: true,
        products
    })
}

export async function getProductDetails(req, res) {
    const { id } = req.params
    
    const productDetails = await productModel.findById(id);

    if (!productDetails) {
        return res.status(404).json({
            message:"no product found"
        })
    }

    return res.status(200).json({
        message: "product details fetched successfully",
        success: true,
        productDetails
        
    })
}