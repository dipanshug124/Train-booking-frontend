import "./App.css";
import Grid from "./Components/Grid/Grid";
// import seats from "./seats.json";
import { useState, useEffect } from "react";

const app_base_url = "https://train-booking-backend.herokuapp.com/";

function App() {
  const [requiredSeats, setRequiredSeats] = useState(0);
  const [seats, setSeats] = useState(null);

  useEffect(() => {
    fetch(app_base_url + "seats")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setSeats(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <div className="app">
      <div className="input-form">
        <form className="form">
          <label className="label">Enter number of seats to book</label>
          <input
            className="input"
            type="number"
            value={requiredSeats}
            onChange={(e) => setRequiredSeats(e.target.value)}
          />
          <input className="submit" type="submit" value="Submit" />
        </form>
      </div>

      <div className="grid-layout">
        {seats && <Grid data={seats} requiredSeats={requiredSeats} />}
      </div>
    </div>
  );
}

export default App;
