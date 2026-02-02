import React from "react";
import Hero from "./Hero";
import HotelSection from "../Hotels/HotelSection";
import FeaturedRooms from "./FeaturedRooms";
import WhyStarX from "./WhyStarX";
import GuestReviews from "./GuestsReview";
import CallToAction from "./CallToAction";
import MotionProvider from "../../MotionProvider";

const Home = () => {
  return (
    <div>
      <MotionProvider>
        <Hero />
        <HotelSection />
        <FeaturedRooms />
        <WhyStarX />
        <GuestReviews />
        <CallToAction />
      </MotionProvider>
    </div>
  );
};

export default Home;
