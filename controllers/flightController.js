const Flights = require("../models/Flight.json");
const fs = require("fs");
const { response } = require("express");

/* flight id(fid), date and time constants */
const fid = (() => ((id = 1), () => id++))();

const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const current_date =
  currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

const current_time = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const flights = Flights;

// 1. add/book new flight
exports.addFlight = async (request, response) => {
  try {
    const { title, price } = await request.body;

    var flight = {
      id: fid(),
      title,
      time: current_time,
      price,
      date: current_date,
    };

    flights.push(flight);

    let stringedData = JSON.stringify(flights, null, 2);
    fs.writeFile("./models/Flight.json", stringedData, function (err) {
      if (err) {
        return response.status(500).json({ message: err });
      }
    });

    response.status(200).json({
      message: "new flight booked",
    });

    console.log(flight);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

// 2. get all flights
exports.getFlights = async (request, response) => {
  try {
    response.status(200).json(flights);
  } catch (err) {
    response.status(500).json({ message: err });
  }
};

// 3. get single flight
exports.getFlight = async (request, response) => {
  try {
    let id = request.params.id;
    let foundId = flights.find((flight) => {
      return String(flight.id) === id;
    });
    if (foundId) {
      console.log(foundId);
      return response.status(200).json({ flight: foundId });
    } else {
      return response.status(400).json({ message: "flight not found" });
    }
  } catch (err) {
    return err;
  }
};

// 4. update/edit flight
exports.updateFlight = async (request, response) => {
  try {
    let id = request.params.id;
    let selectedId = flights.find((flight) => {
      return String(flight.id) == id;
    });
    const { title, price } = await request.body;
    selectedId.title = title;
    selectedId.price = price;

    response.status(200).json({ message: "flight updated" });
    console.log(selectedId);
    console.log(flights);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

// 5. delete flight
exports.deleteFlight = async (request, response) => {
  try {
    let id = request.params.id;
    let flight = flights.find((flight) => {
      return String(flight.id) == id;
    });
    flights.splice(flights.indexOf(flight), 1);
    response.status(200).json({ message: "User deleted", flight });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};
