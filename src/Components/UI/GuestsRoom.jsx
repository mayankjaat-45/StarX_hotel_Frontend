import { useState } from "react";
import { Minus, Plus, Users } from "lucide-react";

const GuestsRooms = () => {
  const [open, setOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  return (
    <div className="relative">
      {/* Pill Input */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          items-center
          justify-between
          gap-2
          bg-(--bg-white)/70
          text-(--text-main)
          p-3
          rounded-xl
          border
          border-(--accent-charcoal)/25
          focus:outline-none
        "
      >
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span className="text-sm sm:text-base font-medium">
            {guests} Guests · {rooms} Room
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            z-20
            mt-2
            w-full
            rounded-xl
            p-4
            backdrop-blur-lg
            bg-(--bg-white)/90
            border
            border-(--accent-charcoal)/20
            shadow-xl
          "
        >
          {/* Guests */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-(--text-main)">Guests</p>
              <p className="text-sm text-(--text-muted)">Ages 13+</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="p-1 rounded-full border border-(--accent-charcoal)/30"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold">{guests}</span>
              <button
                onClick={() => setGuests(guests + 1)}
                className="p-1 rounded-full border border-(--accent-charcoal)/30"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-(--text-main)">Rooms</p>
              <p className="text-sm text-(--text-muted)">Max 4 guests/room</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="p-1 rounded-full border border-(--accent-charcoal)/30"
              >
                <Minus size={16} />
              </button>
              <span className="font-semibold">{rooms}</span>
              <button
                onClick={() => setRooms(rooms + 1)}
                className="p-1 rounded-full border border-(--accent-charcoal)/30"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestsRooms;
