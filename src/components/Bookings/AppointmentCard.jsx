/* eslint-disable react/prop-types */
import { formateDate } from "../../utils/formateDate";

const AppointmentCard = ({ appointment }) => {
    let gender = appointment.user.gender;
    if(gender === 'male') {
        gender = 'Masculino'
    } 
    
    if(gender === 'female') {
        gender = 'Feminino'
    }

    if(gender === 'other') {
      gender = 'Outros'
    }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={appointment.user.photo}
          className="w-12 h-12 rounded-full"
          alt=""
        />
        <div className="ml-4">
          <div className="text-lg font-semibold">{appointment.user.name}</div>
          <div className="text-sm text-gray-500">{appointment.user.email}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="text-sm">
          <span className="font-semibold">Gênero:</span> {gender}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Pagamento:</span>{" "}
          {appointment.isPaid ? (
            <span className="text-green-500 font-semibold">Pago</span>
          ) : (
            <span className="text-red-500 font-semibold">À pagar</span>
          )}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Preço:</span> R${appointment.ticketPrice}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Marcado em:</span>{" "}
          {formateDate(appointment.createdAt)}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Horário:</span>{" "}
          {formateDate(appointment.date)} as {appointment.time} -{" "}
          {appointment.isTelemedicine ? "Online" : "Presencial"}
        </div>
        {appointment.isTelemedicine && (
          <div className="text-sm">
            <a
              className="text-primary font-semibold"
              href={appointment.startMeetingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consulta Online via Zoom
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
