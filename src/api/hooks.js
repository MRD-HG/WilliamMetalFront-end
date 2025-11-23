import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

/* Products */
export const useProducts = () => useQuery(["products"], () => api.get("/products").then(r => r.data));
export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation(p => api.post("/products", p).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["products"]) });
};
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation(id => api.delete(`/products/${id}`).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["products"]) });
};

/* ProductVariants */
export const useVariants = () => useQuery(["variants"], () => api.get("/productvariants").then(r => r.data));
export const useCreateVariant = () => {
  const qc = useQueryClient();
  return useMutation(p => api.post("/productvariants", p).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["variants"]) });
};
export const useUpdateVariant = () => {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => api.put(`/productvariants/${id}`, payload).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["variants","stock"]) });
};

/* Purchases */
export const useCreatePurchase = () => {
  const qc = useQueryClient();
  return useMutation(p => api.post("/purchases", p).then(r => r.data), {
    onSuccess: () => { qc.invalidateQueries(["variants"]); qc.invalidateQueries(["stock"]); qc.invalidateQueries(["purchases"]); }
  });
};

/* Invoices */
export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation(p => api.post("/invoices", p).then(r => r.data), {
    onSuccess: () => { qc.invalidateQueries(["variants"]); qc.invalidateQueries(["invoices"]); qc.invalidateQueries(["stock"]); }
  });
};
export const useInvoices = () => useQuery(["invoices"], () => api.get("/invoices").then(r => r.data));

/* Stock & adjustments */
export const useStock = () => useQuery(["stock"], () => api.get("/productvariants").then(r => r.data));
export const useAdjustStock = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/stock/adjust", payload).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["stock","variants"]) });
};

/* Dashboard metrics (optional backend) */
export const useDashboardMetrics = () => useQuery(["metrics"], () => api.get("/dashboard/metrics").then(r => r.data), { retry: false });
export const useSalesChart = () => useQuery(["salesChart"], () => api.get("/dashboard/sales-chart").then(r => r.data), { retry: false });
