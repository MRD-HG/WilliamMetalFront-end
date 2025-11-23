import api from "./axios";

export const fetchProducts = () => api.get("/products");
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const fetchVariants = () => api.get("/products/variants"); // adjust if endpoint is different
export const createVariant = (productId, payload) => api.post(`/products/${productId}/variants`, payload);
