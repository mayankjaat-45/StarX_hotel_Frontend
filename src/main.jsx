import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./Context/AuthContext.jsx";
import { BookingProvider } from "./Context/BookingContext.jsx";

const ToastContainer = lazy(() =>
  import("react-toastify").then((m) => ({ default: m.ToastContainer })),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
);
