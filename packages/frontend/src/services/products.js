import axios from "axios";

export const axiosInstance = axios.create({baseURL: "http://localhost:3000/api",});

// get all productos
export async function getProducts() {
  const { data } = await axiosInstance.post('/products');
  return data;
}

// get single product
export async function getProduct(id) {
    const { data } = await axiosInstance.get(`/products.details/${id}`);
    return data;
}

// save product
export async function saveProduct(product) {
    const { data } = await axiosInstance.post('/products', product);
    return data;
}

// update entire product
export async function updateProduct(product) {
    const { data } = await axiosInstance.put(`/products`, product);
    return data;
}

// update entire product
export async function updateProductData(product) {
    const { data } = await axiosInstance.patch(`/products`, product);
    return data;
}

// delete product
export async function deleteProduct(id) {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
}

export default axiosInstance;