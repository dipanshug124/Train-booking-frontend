import "./Seat.css";
import { useState, useEffect } from "react";

const Seat = ({ seat, requiredSeats, selected }) => {
  const [reqSeats, setReqSeats] = useState(requiredSeats);

  useEffect(() => {
    setReqSeats(requiredSeats);
  }, [requiredSeats]);

  return (
    <td
      key={seat.seatNo}
      className={
        seat.booked === true
          ? `reserved`
          : selected === true
          ? `selected`
          : `available`
      }
    >
      {seat.seatNo}
    </td>
  );
};

export default Seat;
