import { createProduct, getSellerProduct, getAllProducts, getProductDetails } from "../service/product.api.js"
import { useDispatch} from "react-redux";
import { setSellerProduct, setProducts } from "../state/product.slice";

const useProduct = () => {

    const dispatch = useDispatch()
     
    async function handleCreateProduct(formData) {
        const data = await createProduct(formData);
        return data.product
    }

    async function handlegetSellerProduct() {
        const data = await getSellerProduct();
        dispatch(setSellerProduct(data.products))
        return data.products
    }

    async function handlegetAllProducts() {
            const data = await getAllProducts();
        dispatch(setProducts(data.products))
    }

    async function handleGetProductDetails( productId) {
        const data = await getProductDetails(productId)
        
        return data.productDetails
    }

    return {handleCreateProduct, handlegetSellerProduct, handlegetAllProducts , handleGetProductDetails} 
}

export default useProduct