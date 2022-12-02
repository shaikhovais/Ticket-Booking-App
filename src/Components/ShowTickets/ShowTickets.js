/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styles from "./showTickets.module.css";

const ShowTickets = (props) => {
  const {
    input,
    setShowTrain,
    setShowInput,
    setShowTickets,
    bookedSeats,
    seatsLeftInRow,
  } = props;

  function getRowsLeft() {                            // to get how many seats are left in each row  
    let seats = document.querySelectorAll(".seat");
    let rowNumber = 0;
    let availableSeat = 7;
    seats.forEach((seat) => {
      if (
        seat.classList.contains(styles.selectedSeat) ||
        seat.classList.contains(styles.bookedSeat)
      ) {
        availableSeat--;
      }
      if (seat.innerHTML.charAt(1) === "7") {
        seatsLeftInRow.current[rowNumber] = availableSeat;
        rowNumber++;
        availableSeat = 7;
        if (rowNumber === 11) {
          availableSeat = 3;
        }
      }
    });
    seatsLeftInRow.current[rowNumber] = availableSeat;
  }

  function assignSeats() {                      // assigning already booked seats and currently selected seats
    let seats = document.querySelectorAll(".seat");
    seats.forEach((seat) => {
      if (bookedSeats.current.includes(seat.innerHTML)) {       // checking if curr seat already booked
        seat.classList.add(styles.bookedSeat);
      }
    });
    getRowsLeft();
    let rowNumber = -1;
    for (let index = 0; index < seatsLeftInRow.current.length; index++) {
      if (seatsLeftInRow.current[index] >= input) {   // checking if any single row can accommodate all tickets
        rowNumber = index;
        break;
      }
    }
    if (rowNumber !== -1) {
      let currRowNumber = -1;
      let seatsBooked = 0;
      seats.forEach((seat) => {
        if (seat.innerHTML.charAt(1) === "1") {
          currRowNumber++;
        }
        if (
          currRowNumber === rowNumber &&
          !seat.classList.contains(styles.bookedSeat) &&
          seatsBooked < input
        ) {
          seat.classList.add(styles.selectedSeat);
          seatsBooked++;
          bookedSeats.current.push(seat.innerHTML);
        }
      });
    } else {          // if a single row can't accommodate then looking for a row that can accommodate maximum
      let seatsBooked = 0;
      let rowNumber = -1;
      let maximumSeatAvailableInARow = 1;
      for (let index = 0; index < seatsLeftInRow.current.length; index++) {
        if (seatsLeftInRow.current[index] >= maximumSeatAvailableInARow) {
          rowNumber = index;
        }
      }
      if (rowNumber !== -1) {
        let currRowNumber = -1;
        seats.forEach((seat) => {
          if (seat.innerHTML.charAt(1) === "1") {
            currRowNumber++;
          }
          if (
            currRowNumber === rowNumber &&
            !seat.classList.contains(styles.bookedSeat) &&
            seatsBooked < input
          ) {
            seat.classList.add(styles.selectedSeat);
            seatsBooked++;
            bookedSeats.current.push(seat.innerHTML);
          }
        });
        fillLeftSeats(seatsBooked);
      } else {
        fillLeftSeats(seatsBooked);
      }
    }
  }

  function fillLeftSeats(seatsBooked) {                 // filling up single seats if any booking is left
    let seats = document.querySelectorAll(".seat");
    seats.forEach((seat) => {
      if (!seat.classList.contains(styles.bookedSeat) && seatsBooked < input) {
        seat.classList.add(styles.selectedSeat);
        seatsBooked++;
        bookedSeats.current.push(seat.innerHTML);
      }
    });
  }

  useEffect(() => {
    let train = document.getElementById("seat-container");
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

    let rowsIndex = -1;
    if (train) {
      for (let index = 1; index <= 80; index++) {         // generating 80 seats
        if (index % 7 === 1) {
          rowsIndex++;
        }
        let seat = document.createElement("div");
        if (index % 7 === 0) {
          seat.innerHTML = `${rows[rowsIndex]}7`;
        } else {
          seat.innerHTML = `${rows[rowsIndex]}${index % 7}`;
        }
        seat.classList.add(`${styles.emptySeat}`);
        seat.classList.add("seat");
        train.appendChild(seat);
      }
      assignSeats();                                      // assigning them class as per their status
    }

    return () => {
      train.innerHTML = " ";
    };
  }, []);

  function bookingConfirmation() {
    setShowTickets(false);
    setShowTrain(true);
    setShowInput(true);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.seatContainer} id="seat-container"></div>
      <button onClick={bookingConfirmation}>Confirm</button>
    </div>
  );
};

export default ShowTickets;
