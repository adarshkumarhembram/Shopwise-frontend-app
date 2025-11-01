// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch 100 products from dummyjson
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("https://dummyjson.com/products?limit=100");
  return res.data.products;
});

const slice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (s, action) => {
        // map to our product shape
        s.items = (action.payload || []).map((p) => ({
          _id: p.id,
          title: p.title,
          description: p.description,
          price: p.price,
          images: p.images && p.images.length ? p.images : [p.thumbnail],
          category: p.category,
          brand: p.brand,
          rating: p.rating,
          stock: p.stock ?? 0,
        }));
        s.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error?.message || "Failed to fetch products";
      });
  },
});

export default slice.reducer;
