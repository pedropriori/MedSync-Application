import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../config";
import { ptBR } from "date-fns/locale";

const BookAppointment = ({ doctorId }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 18; i++) {
      const hour = i < 10 ? `0${i}` : i;
      timeList.push({
        time: `${hour}:00`,
      });
      if (i < 18) {
        timeList.push({
          time: `${hour}:30`,
        });
      }
    }
    setTimeSlot(timeList);
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };

  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date,
            time: selectedTimeSlot,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Por favor, tente novamente");
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="btn px-2 w-full rounded-md">
        <button className="">Agendar Consulta</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agendar Consulta</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-3 items-center">
                    <CalendarDays className="text-primaryBgColor h-5 w-5" />
                    Selecione a data
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={isPastDay}
                    locale={ptBR}
                  />
                </div>
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primaryBgColor h-5 w-5" />
                    Selecione o horário
                  </h2>
                  <div className="grid grid-cols-4 gap-2 border rounded-lg p-5">
                    {timeSlot?.map((item, index) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        key={index}
                        className={`p-2 border rounded-full text-center hover:bg-primaryBgColor hover:text-white cursor-pointer ${
                          item.time == selectedTimeSlot &&
                          "bg-primaryBgColor text-white"
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500"
            >
              Fechar
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!(date && selectedTimeSlot)}
            onClick={bookingHandler}
          >
            Marcar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
