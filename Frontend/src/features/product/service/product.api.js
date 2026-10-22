import axios from "axios"

const productApi = axios.create({
    baseURL: "/api/product",
    withCredentials:true
})

export async function createProduct(formData) {
    
    const response = await productApi.post("/create", formData)
    
    return response.data;
}

export async function getSellerProduct() {

    const response = await productApi.get("/seller")

    return response.data;
    
}

export async function getAllProducts() {
    const response = await productApi.get("/getProducts")

    // console.log(response.data)

    return response.data;
}

export async function getProductDetails(productId) {
    const response = await productApi.get(`/details/${productId}`)

    return response.data
}