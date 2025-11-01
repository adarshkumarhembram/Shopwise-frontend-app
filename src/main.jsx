// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./app/store";
import "./index.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { setUser, clearUser } from "./features/auth/authSlice";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Firebase auth listener (outside render)
onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, email, displayName } = user;
    store.dispatch(setUser({ uid, email, name: displayName }));
  } else {
    store.dispatch(clearUser());
  }
});
