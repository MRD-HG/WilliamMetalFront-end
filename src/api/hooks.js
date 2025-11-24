import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./axios";

/* Products */
export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: () => api.get("/products").then(r => r.data) });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: p => api.post("/products", p).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: id => api.delete(`/products/${id}`).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] })
  });
};

/* ProductVariants */
export const useVariants = () =>
  useQuery({ queryKey: ["variants"], queryFn: () => api.get("/productvariants").then(r => r.data) });

export const useCreateVariant = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: p => api.post("/productvariants", p).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["variants"] })
  });
};

export const useUpdateVariant = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => api.put(`/productvariants/${id}`, payload).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["variants"] });
      qc.invalidateQueries({ queryKey: ["stock"] });
    }
  });
};

/* Purchases */
export const useCreatePurchase = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: p => api.post("/purchases", p).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["variants"] });
      qc.invalidateQueries({ queryKey: ["stock"] });
      qc.invalidateQueries({ queryKey: ["purchases"] });
    }
  });
};

/* Invoices */
export const useCreateInvoice = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: p => api.post("/invoices", p).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["variants"] });
      qc.invalidateQueries({ queryKey: ["invoices"] });
      qc.invalidateQueries({ queryKey: ["stock"] });
    }
  });
};

export const useInvoices = () =>
  useQuery({ queryKey: ["invoices"], queryFn: () => api.get("/invoices").then(r => r.data) });

/* Stock & adjustments */
export const useStock = () =>
  useQuery({ queryKey: ["stock"], queryFn: () => api.get("/productvariants").then(r => r.data) });

export const useAdjustStock = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: payload => api.post("/stock/adjust", payload).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["stock"] });
      qc.invalidateQueries({ queryKey: ["variants"] });
    }
  });
};

/* Dashboard metrics (optional backend) */
export const useDashboardMetrics = () =>
  useQuery({ queryKey: ["metrics"], queryFn: () => api.get("/dashboard/metrics").then(r => r.data), retry: false });

export const useSalesChart = () =>
  useQuery({ queryKey: ["salesChart"], queryFn: () => api.get("/dashboard/sales-chart").then(r => r.data), retry: false });
