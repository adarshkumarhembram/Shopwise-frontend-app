// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// load from localStorage if exists
const saved = localStorage.getItem("shopwise_cart");
const initialState = saved
  ? JSON.parse(saved)
  : {
      items: [], // each item: { id, title, price, image, qty }
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += item.qty ?? 1;
      } else {
        state.items.push({ ...item, qty: item.qty ?? 1 });
      }
      // persist
      localStorage.setItem("shopwise_cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("shopwise_cart", JSON.stringify(state));
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== id);
      localStorage.setItem("shopwise_cart", JSON.stringify(state));
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty += 1;
      localStorage.setItem("shopwise_cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("shopwise_cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, decreaseQty, increaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
