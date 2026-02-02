// HOTEL 1 IMAGES
import hotel1Image from "../assets/images/hotel1.jpeg";
import h1r1 from "../assets/images/hotel1/room1.jpeg";
import h1r2 from "../assets/images/hotel1/room2.jpeg";
import h1r3 from "../assets/images/hotel1/room3.jpeg";
import h1r4 from "../assets/images/hotel1/room4.jpeg";
import h1r5 from "../assets/images/hotel1/room5.jpeg";

// HOTEL 2 IMAGES
import hotel2Image from "../assets/images/hotel2.jpeg";
import h2r1 from "../assets/images/hotel2/room1.jpeg";
import h2r2 from "../assets/images/hotel2/room2.jpeg";
import h2r3 from "../assets/images/hotel2/room3.jpeg";
import h2r4 from "../assets/images/hotel2/room4.jpeg";
import h2r5 from "../assets/images/hotel2/room5.jpeg";

// HOTEL 3 IMAGES
import hotel3Image from "../assets/images/hotel3.jpeg";
import h3r1 from "../assets/images/hotel3/room1.jpeg";
import h3r2 from "../assets/images/hotel3/room2.jpeg";
import h3r3 from "../assets/images/hotel3/room3.jpeg";
import h3r4 from "../assets/images/hotel3/room4.jpeg";
import h3r5 from "../assets/images/hotel3/room5.jpeg";

export const hotelsData = [
  {
    id: 1,
    title: "StarX Grand Palace",
    location: "Mumbai, India",
    rating: 4.8,
    reviews: 1240,

    description:
      "All rooms are identical luxury category with premium facilities. Choose hourly or full-day stay and enjoy unmatched comfort.",

    images: [hotel1Image, h1r1, h1r2, h1r3, h1r4, h1r5],

    facilities: [
      "King Size Bed",
      "Luxury Bathroom",
      "Smart TV",
      "High-Speed WiFi",
      "Air Conditioning",
      "Room Service",
      "Power Backup",
      "Secure Parking",
    ],

    pricing: {
      hourly: 999,
      fullDay: 4999,
    },
  },

  {
    id: 2,
    title: "StarX City Comfort",
    location: "Delhi, India",
    rating: 4.6,
    reviews: 980,

    description:
      "Premium city hotel designed for comfort and privacy. Ideal for hourly breaks or full-day luxury stays.",

    images: [hotel2Image, h2r1, h2r2, h2r3, h2r4, h2r5],

    facilities: [
      "Queen Size Bed",
      "Modern Bathroom",
      "Smart TV",
      "High-Speed WiFi",
      "Air Conditioning",
      "24×7 Front Desk",
      "Power Backup",
      "Secure Parking",
    ],

    pricing: {
      hourly: 899,
      fullDay: 4599,
    },
  },

  {
    id: 3,
    title: "StarX Mountain Retreat",
    location: "Manali, India",
    rating: 4.7,
    reviews: 740,

    description:
      "Luxury retreat surrounded by mountains. Enjoy peaceful hourly stays or a full 24-hour escape.",

    images: [hotel3Image, h3r1, h3r2, h3r3, h3r4, h3r5],

    facilities: [
      "Luxury Bed",
      "Mountain View",
      "Smart TV",
      "High-Speed WiFi",
      "Room Heater",
      "Room Service",
      "Power Backup",
      "Free Parking",
    ],

    pricing: {
      hourly: 799,
      fullDay: 4299,
    },
  },
];
