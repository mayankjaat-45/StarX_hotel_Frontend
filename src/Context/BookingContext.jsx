import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(null);

  /* 🏁 Start booking */
  const startBooking = useCallback(({ hotel, room }) => {
    setBooking({
      hotel,
      room,

      stayMode: "NIGHT", // NIGHT | HOURLY
      checkIn: "",
      checkOut: "",
      checkInTime: "",

      hours: 1,
      totalPrice: room?.price_per_night || 0,

      paymentOrderId: null,
      status: "INIT", // INIT | PAYMENT_CREATED | PAID
    });
  }, []);

  /* 🔄 Update booking (IMMUTABLE + SAFE) */
  const updateBooking = useCallback((updates) => {
    setBooking((prev) => {
      if (!prev) return prev;

      const stayMode = updates.stayMode ?? prev.stayMode;
      const room = updates.room ?? prev.room;
      const hours = updates.hours ?? prev.hours;

      const totalPrice =
        stayMode === "HOURLY"
          ? (room?.price_per_hour || 0) * (hours || 1)
          : room?.price_per_night || 0;

      return {
        ...prev,
        ...updates,
        totalPrice,
      };
    });
  }, []);

  const resetBooking = useCallback(() => {
    setBooking(null);
  }, []);

  /* 🧪 Debug (safe) */
  useEffect(() => {
    if (booking) {
      console.log("BOOKING CONTEXT:", booking);
    }
  }, [booking]);

  const value = useMemo(
    () => ({
      booking,
      startBooking,
      updateBooking,
      resetBooking,
    }),
    [booking, startBooking, updateBooking, resetBooking],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
