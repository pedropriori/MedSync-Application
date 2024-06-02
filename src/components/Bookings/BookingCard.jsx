/* eslint-disable react/prop-types */

import { useState } from "react";
import { formateDate } from "@/utils/formateDate";
import { Button } from "@/components/ui/button";
import { BASE_URL, token } from "./../../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const { doctor, ticketPrice, date, time, isTelemedicine } = booking;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const address = doctor.address
    ? `${doctor.address.logradouro}, ${doctor.address.numero}, ${doctor.address.bairro}, ${doctor.address.cidade} - ${doctor.address.estado}`
    : "Endereço Indisponível";

  const handleCancelClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmCancel = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setShowConfirmation(false);
        window.location.reload();
        toast.success("Agendamento cancelado com sucesso.");
      } else {
        const data = await response.json();
        toast.error(`Erro ao cancelar agendamento: ${data.message}`);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Erro ao cancelar agendamento.");
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="p-3 lg:p-5 mt-5 border">
      <div>
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full rounded-md"
        />
      </div>

      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
        {doctor.name}
      </h2>

      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {doctor.specialization}
        </span>
        <span className="bg-green-500 text-white py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          R${ticketPrice}
        </span>
      </div>

      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          {isTelemedicine ? (
            <Link
              className="text-[14px] leading-6 font-[500] text-primary"
              to={
                "https://us05web.zoom.us/meeting/schedule?amp_device_id=79a92275-0a5b-421a-a8a6-b0cbe0c7ba0a"
              }
            >
              Consulta Online via Zoom
            </Link>
          ) : (
            <p className="text-[14px] leading-6 font-[500] text-textColor">
              Consulta Presencial
            </p>
          )}
          <p className="text-[14px] leading-6 font-[500] text-textColor">
            Em <span className="font-bold">{address}</span>
          </p>
          <p className="text-[14px] leading-6 font-bold text-irisBlueColor">
            <span className="text-textColor font-[500]">Marcado para</span>{" "}
            {formateDate(date)}{" "}
            <span className="text-textColor font-[500]">as </span>
            <span className="font-bold text-irisBlueColor">{time}</span>
          </p>
        </div>
      </div>

      <div className="">
        {showConfirmation ? (
          <div className="mt-4">
            <p className="text-red-500 font-bold">
              Tem certeza que deseja cancelar o agendamento?
            </p>
            <div className="flex justify-between mt-2">
              <Button
                type="button"
                variant="outline"
                className="text-green-500 border-green-500 w-full mr-2 p-3 text-[16px] leading-7 hover:bg-green-600 hover:text-white"
                onClick={handleConfirmCancel}
              >
                Confirmar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-gray-500 border-gray-500 w-full p-3 text-[16px] leading-7 hover:bg-gray-600 hover:text-white"
                onClick={handleCancelConfirmation}
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="text-red-500 border-red-500 w-full mt-4 p-3 text-[16px] leading-7 hover:bg-red-600 hover:text-white"
            onClick={handleCancelClick}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
