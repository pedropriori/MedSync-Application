/* eslint-disable react/prop-types */
import AppointmentCard from "./../../components/Bookings/AppointmentCard";

const Appointments = ({ appointments }) => {
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-3 gap-4 sm:grid-cols-1 md:grid-cols-2">
      {sortedAppointments?.map((appointment) => (
        <AppointmentCard key={appointment._id} appointment={appointment} />
      ))}
    </div>
  );
};

export default Appointments;

// /* eslint-disable react/prop-types */
// import { formateDate } from "../../utils/formateDate";

// const Appointments = ({ appointments }) => {
//   return (
//     <table className="w-full text-left text-sm text-gray-500">
//       <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//         <tr>
//           <th scope="col" className="px-6 py-3">
//             Nome
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Gênero
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Pagamento
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Preço
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Marcado em
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Horário
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Link consulta online
//           </th>
//         </tr>
//       </thead>

//       <tbody>
//         {appointments?.map((item) => (
//           <tr key={item._id}>
//             <th
//               scope="row"
//               className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
//             >
//               <img
//                 src={item.user.photo}
//                 className="w-10 h-10 rounded-full"
//                 alt=""
//               />
//               <div className="pl-3">
//                 <div className="text-base font-semibold">{item.user.name}</div>
//                 <div className="text-normal text-gray-500">
//                   {item.user.email}
//                 </div>
//               </div>
//             </th>

//             <td className="px-6 py-4">{item.user.gender}</td>
//             <td className="px-6 py-4">
//               {item.isPaid && (
//                 <div className="flex items-center">
//                   <div className="h-.25 w-2.5 rounded-full bg-green-500 mr-2"></div>
//                   Pago
//                 </div>
//               )}

//               {!item.isPaid && (
//                 <div className="flex items-center">
//                   <div className="h-.25 w-2.5 rounded-full bg-red-500 mr-2"></div>
//                   À pagar
//                 </div>
//               )}
//             </td>
//             <td className="px-6 py-4">R${item.ticketPrice}</td>
//             <td className="px-6 py-4 w-auto">{formateDate(item.createdAt)}</td>
//             <td className="px-6 py-4">
//               {formateDate(item.date)} as {item.time} -{" "}
//               {item.isTelemedicine ? "Online" : "Presencial"}
//             </td>
//             <td className="px-6 py-4">
//               {item.isTelemedicine ? (
//                 <a
//                 className="text-[14px] leading-6 font-[500] text-primary"
//                 href={item.meetingLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Consulta Online via Zoom
//               </a>
//               ) : (
//                 "Consulta Presencial"
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Appointments;
