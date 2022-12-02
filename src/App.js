/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Input from "./Components/Input/Input";
import ShowTickets from "./Components/ShowTickets/ShowTickets";
import Train from "./Components/Train/Train";

function App() {
  const [showTrain, setShowTrain] = useState(true);
  const [showInput, setShowInput] = useState(true);
  const [showTickets, setShowTickets] = useState(false);
  const [input, setInput] = useState(0);  
  const [noOfBookedSeats, setNoOfBookedSeats] = useState(0);     

  const bookedSeats = useRef([]);         // this will store seat numbers of booked seats
  const seatsLeftInRow = useRef([7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3]);

  useEffect(() => {
    setNoOfBookedSeats(noOfBookedSeats + input);
  }, [input]);

  return (
    <div className="App">
      {showTrain && <Train />}
      {showInput && (
        <Input
          setInput={setInput}
          setShowInput={setShowInput}
          setShowTrain={setShowTrain}
          setShowTickets={setShowTickets}
          noOfBookedSeats={noOfBookedSeats}
        />
      )}
      {showTickets && (
        <ShowTickets
          seatsLeftInRow={seatsLeftInRow}
          bookedSeats={bookedSeats}
          input={input}
          setShowInput={setShowInput}
          setShowTrain={setShowTrain}
          setShowTickets={setShowTickets}
        />
      )}
    </div>
  );
}

export default App;
