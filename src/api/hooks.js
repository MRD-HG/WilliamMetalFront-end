import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

/* Products */
export const useProducts = () => useQuery(["products"], () => api.get("/products").then(r => r.data));
export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/products", payload).then(r => r.data), {
    onSuccess: () => qc.invalidateQueries(["products"])
  });
};
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation(id => api.delete(`/products/${id}`), { onSuccess: () => qc.invalidateQueries(["products"]) });
};

/* Variants */
export const useVariants = () => useQuery(["variants"], () => api.get("/productvariants").then(r => r.data));
export const useCreateVariant = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/productvariants", payload).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["variants"]) });
};

/* Purchases */
export const useCreatePurchase = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/purchases", payload).then(r => r.data), {
    onSuccess: () => { qc.invalidateQueries(["variants"]); qc.invalidateQueries(["stock"]); }
  });
};

/* Invoices */
export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/invoices", payload).then(r => r.data), {
    onSuccess: () => { qc.invalidateQueries(["variants"]); qc.invalidateQueries(["invoices"]); qc.invalidateQueries(["stock"]); }
  });
};
export const useInvoices = () => useQuery(["invoices"], () => api.get("/invoices").then(r => r.data));

/* Stock */
export const useStock = () => useQuery(["stock"], () => api.get("/productvariants").then(r => r.data));
export const useAdjustStock = () => {
  const qc = useQueryClient();
  return useMutation(payload => api.post("/stock/adjust", payload).then(r => r.data), { onSuccess: () => qc.invalidateQueries(["stock","variants"]) });
};

/* Dashboard metrics - implement API endpoints or compute in frontend */
export const useDashboardMetrics = () => useQuery(["metrics"], () => api.get("/dashboard/metrics").then(r => r.data));
export const useSalesChart = () => useQuery(["salesChart"], () => api.get("/dashboard/sales-chart").then(r => r.data));
