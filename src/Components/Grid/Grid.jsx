import React from "react";
import { useState, useEffect, useCallback } from "react";
import Seat from "../Seat/Seat";
import "./Grid.css";
const app_base_url = "https://train-booking-backend.herokuapp.com/";

const Grid = ({ data, requiredSeats }) => {
  const [reqSeats, setReqSeats] = useState(requiredSeats);
  useEffect(() => {
    setReqSeats(requiredSeats);
    findSeats(data, reqSeats);
  }, [requiredSeats]);

  const findSeats = (d) => {
    const len = Object.keys(data).length;
    var r = requiredSeats === "" ? 0 : requiredSeats;
    var bookingSeats = [];
    for (let i = 0; i < len; i++) {
      if (bookingSeats.length === parseInt(r)) {
        break;
      } else {
        if (d[i].booked === false) {
          bookingSeats.push(d[i].seatNo);
        } else {
          bookingSeats = [];
        }
      }
    }
    if (bookingSeats.length < r) {
      console.log("No possible combination: ", []);
      return [];
    } else {
      console.log("Seats: ", bookingSeats);
      return bookingSeats;
    }
  };

  let bookingSeats = findSeats(data);

  const isSelected = (seatNo) => {
    if (bookingSeats.includes(seatNo)) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = () => {
    if (bookingSeats != []) {
      for (let seatNo of bookingSeats) {
        console.log(seatNo);
        onSubmitHelper(seatNo);
      }
    }
  };
  const onSubmitHelper = async (seatNo) => {
    return await fetch(app_base_url + "update-seat/" + seatNo, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  };
  return (
    <div className="container">
      <h2>Seats</h2>
      <table className="grid">
        <tbody>
          <tr>
            {data.map((row) => (
              <Seat
                seat={row}
                selected={isSelected(row.seatNo)}
                requiredSeats={reqSeats}
              />
            ))}
          </tr>
        </tbody>
      </table>
      <form className="submit-form" onSubmit={onSubmit}>
        <input className="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Grid;
