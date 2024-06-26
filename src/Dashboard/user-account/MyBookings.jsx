import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import BookingCard from "../../components/Bookings/BookingCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && (
        <Error errMessage="Você ainda não tem nada agendado!" />
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {sortedAppointments?.map((appointment) => (
            <BookingCard booking={appointment} key={appointment._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-8 text-center leading-7 text-[20px] font-semibold text-primaryBgColor">
          Você ainda não tem nada agendado!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;


