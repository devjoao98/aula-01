import axios from "axios";

export const axiosInstance = axios.create({baseURL: "http://localhost:3000/api",});


// login
export async function getUsers() {
  const { data } = await axiosInstance.get('/produtos');
  return data;
}


// get all productos
export async function getUsers() {
  const { data } = await axiosInstance.get('/produtos');
  return data;
}

// get single product
export async function getUser(id) {
    const { data } = await axiosInstance.get(`/produtos.details/${id}`);
    return data;
}

// save product
export async function createUser(product) {
    const { data } = await axiosInstance.post('/produtos', product);
    return data;
}

// update entire product
export async function updateUser(product) {
    const { data } = await axiosInstance.put(`/produtos`, product);
    return data;
}

// update entire product
export async function updateUserData(product) {
    const { data } = await axiosInstance.patch(`/produtos`, product);
    return data;
}

// delete product
export async function deleteUser(id) {
    const { data } = await axiosInstance.delete(`/produtos/${id}`);
    return data;
}

export default axiosInstance;