import React, { lazy, Suspense } from "react";
import Layout from "./Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import WhyStarX from "./Pages/Home/WhyStarX";
import HotelDetails from "./Pages/Hotels/HotelDetails";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import RoomDetail from "./Pages/RoomDetail";
import ProtectedRoute from "./Routes/ProtectedRoutes";
import ConfirmPage from "./Pages/Hotels/ConfirmPage";

const Home = lazy(() => import("./Pages/Home/Home"));
const HotelSection = lazy(() => import("./Pages/Hotels/HotelSection"));
const Booking = lazy(() => import("./Pages/Hotels/Booking"));

const App = () => {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<HotelSection />} />
          <Route path="/services" element={<WhyStarX />} />
          <Route path="/hotel/:hotelId" element={<HotelDetails />} />

          <Route path="/room/:hotelId/:roomId" element={<RoomDetail />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/booking" element={<Booking />} />
          </Route>

          <Route path="/confirmation" element={<ConfirmPage />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
