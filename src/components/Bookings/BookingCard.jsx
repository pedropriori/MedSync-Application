/* eslint-disable react/prop-types */
import { formateDate } from "@/utils/formateDate";
import { Button } from "@/components/ui/button";

const BookingCard = ({ booking }) => {
  const { doctor, ticketPrice, date, time } = booking;

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
          <p className="text-[14px] leading-6 font-[500] text-textColor">
            Em <span className="font-bold">*Address*</span>
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
        <Button
          type="button"
          variant="outline"
          className="text-red-500 border-red-500 w-full mt-4 p-3 text-[16px] leading-7 hover:bg-red-600 hover:text-white"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default BookingCard;
