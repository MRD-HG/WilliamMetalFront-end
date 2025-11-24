import api from "./axios";

export const fetchProducts = () => api.get("/products").then(r => r.data);
export const createProduct = (payload) => api.post("/products", payload).then(r => r.data);
export const updateProduct = (id, payload) => api.put(`/products/${id}`, payload).then(r => r.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(r => r.data);

export const fetchVariants = () => api.get("/products/variants").then(r => r.data);
export const fetchVariant = (id) => api.get(`/products/variants/${id}`).then(r => r.data);
export const createVariant = (productId, payload) => api.post(`/products/${productId}/variants`, payload).then(r => r.data);
export const updateVariant = (id, payload) => api.put(`/products/variants/${id}`, payload).then(r => r.data);
export const deleteVariant = (id) => api.delete(`/products/variants/${id}`).then(r => r.data);
