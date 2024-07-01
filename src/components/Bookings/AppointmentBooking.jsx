import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentBooking = ({ doctorId }) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  useEffect(() => {
    async function fetchAvailableTimeSlots() {
      const response = await axios.get(
        `/professionals/${doctorId}/availability`
      );
      setAvailableTimeSlots(response.data);
    }

    fetchAvailableTimeSlots();
  }, [doctorId]);

  const handleBooking = async () => {
    try {
      await axios.post("/appointments", {
        userId: "USER_ID", // replace with actual user id
        doctorId,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
      });
      alert("Appointment booked successfully");
      // Update available time slots after booking
      fetchAvailableTimeSlots();
    } catch (error) {
      alert("Error booking appointment: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <select onChange={(e) => setSelectedDate(e.target.value)}>
        {availableTimeSlots.map((slot, index) => (
          <option key={index} value={slot.date}>
            {new Date(slot.date).toLocaleDateString()}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => setSelectedTimeSlot(e.target.value)}
        disabled={!selectedDate}
      >
        {selectedDate &&
          availableTimeSlots
            .find((slot) => slot.date === selectedDate)
            ?.timeSlots.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
      </select>
      <button
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTimeSlot}
      >
        Book
      </button>
    </div>
  );
};

export default AppointmentBooking;
