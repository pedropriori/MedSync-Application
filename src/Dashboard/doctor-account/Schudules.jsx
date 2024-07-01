import { BASE_URL, token } from "./../../../config";
import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { ptBR } from "date-fns/locale";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const ScheduleSchema = Yup.object().shape({
  schedules: Yup.array().of(
    Yup.object().shape({
      date: Yup.date()
        .min(
          new Date(new Date().setDate(new Date().getDate() + 1)),
          "A data deve ser a partir de amanhã"
        )
        .required("Data é obrigatória"),
      times: Yup.array().of(
        Yup.string()
          .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Hora inválida")
          .required("Hora é obrigatória")
          .test(
            "valid-time-range",
            "Horário deve estar entre 06:00 e 23:30",
            (value) => {
              const [hour, minute] = value.split(":").map(Number);
              return (
                (hour > 6 || (hour === 6 && minute >= 0)) &&
                (hour < 23 || (hour === 23 && minute <= 30))
              );
            }
          )
      ),
    })
  ),
});

const Schedules = () => {
  const [schedules, setSchedules] = useState([
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      times: ["06:00"],
    },
  ]);

  const handleSubmit = async (values) => {
    console.log("Submitting values:", values);
    try {
      const formattedSchedules = values.schedules.map((schedule) => ({
        date: schedule.date,
        timeSlots: schedule.times,
      }));

      const response = await fetch(
        `${BASE_URL}/doctors/me/availableTimeSlots`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: formattedSchedules[0].date,
            timeSlots: formattedSchedules[0].timeSlots,
          }),
        }
      );
      toast.success("Horário(s) cadastrados");
      console.log("Horários salvos com sucesso:", response.data);
    } catch (error) {
      toast.error("Informações inválidas", error);
      console.error("Erro ao salvar horários:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
        Escolha suas datas e horários disponíveis
      </h1>
      <Formik
        initialValues={{ schedules }}
        validationSchema={ScheduleSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <FieldArray name="schedules">
              {({ push, remove }) => (
                <div>
                  {values.schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded shadow-md bg-white"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor={`schedules.${index}.date`}
                          className="block font-medium text-headingColor text-[16px]"
                        >
                          Data
                        </label>
                        <div className="relative mt-2 flex items-center">
                          <DatePicker
                            selected={schedule.date}
                            onChange={(date) =>
                              setFieldValue(`schedules.${index}.date`, date)
                            }
                            minDate={
                              new Date(
                                new Date().setDate(new Date().getDate() + 1)
                              )
                            }
                            dateFormat="dd/MM/yyyy"
                            locale={ptBR}
                            isClearable
                            showIcon
                            toggleCalendarOnIconClick
                            placeholderText="dd/mm/YYYY"
                            className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        </div>
                        {errors.schedules &&
                          errors.schedules[index] &&
                          errors.schedules[index].date &&
                          touched.schedules &&
                          touched.schedules[index] &&
                          touched.schedules[index].date && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.schedules[index].date}
                            </div>
                          )}
                      </div>
                      <FieldArray name={`schedules.${index}.times`}>
                        {({ push, remove }) => (
                          <div>
                            {schedule.times.map((time, timeIndex) => (
                              <div
                                key={timeIndex}
                                className="flex items-center mt-2"
                              >
                                <div className="relative mt-1 flex items-center">
                                  <Field
                                    name={`schedules.${index}.times.${timeIndex}`}
                                    type="time"
                                    className="block w-full pl-4 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                  />
                                </div>
                                {errors.schedules &&
                                  errors.schedules[index] &&
                                  errors.schedules[index].times &&
                                  errors.schedules[index].times[timeIndex] &&
                                  touched.schedules &&
                                  touched.schedules[index] &&
                                  touched.schedules[index].times &&
                                  touched.schedules[index].times[timeIndex] && (
                                    <div className="text-red-500 text-sm ml-2">
                                      {errors.schedules[index].times[timeIndex]}
                                    </div>
                                  )}
                                <button
                                  type="button"
                                  className="ml-2 bg-red-500 text-white p-1 rounded"
                                  onClick={() => remove(timeIndex)}
                                >
                                  Remover
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              className="mt-2 bg-blue-500 text-white p-1 rounded"
                              onClick={() => push("06:00")}
                            >
                              Adicionar Horário
                            </button>
                          </div>
                        )}
                      </FieldArray>
                      <button
                        type="button"
                        className="mt-4 bg-red-500 text-white p-2 rounded"
                        onClick={() => remove(index)}
                      >
                        Remover Data
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="mt-4 bg-green-500 text-white p-2 rounded"
                    onClick={() =>
                      push({
                        date: new Date(
                          new Date().setDate(new Date().getDate() + 1)
                        ),
                        times: ["06:00"],
                      })
                    }
                  >
                    Adicionar Data
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Salvar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Schedules;

// import { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import TimePicker from "react-time-picker";
// import { BASE_URL } from "./../../../config";

// const Schudules = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [newTimeSlot, setNewTimeSlot] = useState("");
//   const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

//   useEffect(() => {
//     // Fetch existing time slots for the selected date
//     fetchAvailableTimeSlots(selectedDate);
//   }, [selectedDate]);

//   const fetchAvailableTimeSlots = async (date) => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/doctors/me/availableTimeSlots?date=${date.toISOString()}`
//       );
//       setAvailableTimeSlots(response.data.timeSlots || []);
//     } catch (error) {
//       console.error("Error fetching time slots:", error);
//     }
//   };

//   const addTimeSlot = () => {
//     if (newTimeSlot && !availableTimeSlots.includes(newTimeSlot)) {
//       setTimeSlots([...timeSlots, newTimeSlot]);
//       setNewTimeSlot("");
//     }
//   };

//   const saveTimeSlots = async () => {
//     try {
//       const response = await fetch(
//         `${BASE_URL}/doctors/me/availableTimeSlots`,
//         {
//           date: selectedDate,
//           timeSlots: timeSlots,
//         }
//       );
//       setAvailableTimeSlots(response.data.timeSlots);
//       setTimeSlots([]);
//       alert("Time slots saved successfully!");
//     } catch (error) {
//       console.error("Error saving time slots:", error);
//       alert("Error saving time slots");
//     }
//   };

//   return (
//     <div className="schudules">
//       <h2>Manage Your Schedule</h2>
//       <div className="date-picker">
//         <label>Select Date:</label>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//         />
//       </div>
//       <div className="time-picker">
//         <label>Add Available Time Slot:</label>
//         <TimePicker
//           onChange={setNewTimeSlot}
//           value={newTimeSlot}
//           disableClock
//           format="HH:mm"
//         />
//         <button onClick={addTimeSlot}>Add Time Slot</button>
//       </div>
//       <div className="time-slots">
//         <h3>Available Time Slots</h3>
//         <ul>
//           {availableTimeSlots.map((timeSlot, index) => (
//             <li key={index}>{timeSlot}</li>
//           ))}
//           {timeSlots.map((timeSlot, index) => (
//             <li key={index}>{timeSlot}</li>
//           ))}
//         </ul>
//       </div>
//       <button onClick={saveTimeSlots}>Save Time Slots</button>
//     </div>
//   );
// };

// export default Schudules;
