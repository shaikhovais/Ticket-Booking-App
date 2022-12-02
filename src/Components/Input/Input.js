import React, { useState } from "react";
import Error from "../Error/Error";
import styles from "./input.module.css";

const Input = (props) => {
  const {
    setShowTrain,
    setShowInput,
    setShowTickets,
    setInput,
    noOfBookedSeats,
  } = props;

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function removeTrain(e) {
    e.preventDefault();
    let input = parseInt(document.getElementById("input").value);

    // Covering all edge cases and displaying the error
    if (input < 1 || isNaN(input)) {
      setErrorMessage("You need to enter the number of tickets you want to book.");
      setShowError(true);
    } else if (input > 7) {
      setErrorMessage("The maximum number of tickets you can reserve is seven.");      
      setShowError(true);
    } else if (noOfBookedSeats === 80) {
      setErrorMessage("We are sorry, but there are no more seats available on this train.");
      setShowError(true);
    } else if (noOfBookedSeats + input > 80) {
      let availableSeat = 80 - noOfBookedSeats;
      let isOrAre = availableSeat === 1 ? "seat is" : "seats are";
      setErrorMessage(
        `Sorry, only ${80 - noOfBookedSeats} ${isOrAre} available.`
      );
      setShowError(true);
    } else {
      let train = document.getElementById("trainImg");
      if (train) {
        train.style.transform = "translateX(200%)";
      }
      setInput(input);

      setTimeout(() => {          // using a setTimeout to show the animation of train leaving
        setShowInput(false);
        setShowTrain(false);
        setShowTickets(true);
      }, 1000);
    }
  }

  return (
    <div className={styles.container}>
      <form autoComplete="off">
        <input id="input" type="number" placeholder="Enter No Of Tickets" />
        <button onClick={removeTrain} type="submit">
          Book Ticket
        </button>
      </form>
      {showError && (
        <Error errorMessage={errorMessage} setShowError={setShowError} />
      )}
    </div>
  );
};

export default Input;
