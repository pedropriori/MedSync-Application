/* eslint-disable react/prop-types */
// import { toast } from "react-toastify";
// import { BASE_URL, token } from "../../../config";
import convertTime from "../../utils/convertTime";
import BookAppointment from "./BookAppointment";

const SidePanel = ({
  doctorId,
  doctor,
  ticketPrice,
  // timeSlots,
  // weekDayTimeSlots,
}) => {
  // const bookingHandler = async () => {
  //   try {
  //     const res = await fetch(
  //       `${BASE_URL}/bookings/checkout-session/${doctorId}`,
  //       {
  //         method: "post",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message + "Por favor, tente novamente");
  //     }

  //     if (data.session.url) {
  //       window.location.href = data.session.url;
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };
  const timeSlots = doctor?.timeSlots?.length
    ? doctor.timeSlots
    : doctor?.weekDayTimeSlots;

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Preço da Consulta</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          R${ticketPrice}
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text__para mt-0 font-semibold">Atende Telemedicina</p>
        <span className="text-[16px] leading-7 lg:text-[20px] lg:leading-8 text-headingColor font-bold">
          {doctor?.isAvailableForTelemedicine ? "Sim" : "Não"}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Disponibilidade:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Agendar Consulta
      </button> */}
      <BookAppointment doctorId={doctorId} doctor={doctor} />
    </div>
  );
};

export default SidePanel;
