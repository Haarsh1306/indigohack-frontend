import { format, parseISO } from "date-fns";
import { UpdateModal } from "./UpdateModal";
import { useState } from "react";

export const Table = ({ data, onClick, subscriptionList, role }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleUpdateModal = (flight) => {
    setSelectedFlight(flight);
    setUpdateModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return format(parseISO(dateString), "MMM d, yyyy HH:mm");
  };

  return (
    <div className="">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-3 px-4 text-left">Flight ID</th>
            <th className="py-3 px-4 text-left">Airline</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Departure Gate</th>
            <th className="py-3 px-4 text-left">Arrival Gate</th>
            <th className="py-3 px-4 text-left">Scheduled Departure</th>
            <th className="py-3 px-4 text-left">Actual Departure</th>
            <th className="py-3 px-4 text-left">Scheduled Arrival</th>
            <th className="py-3 px-4 text-left">Actual Arrival</th>
            <th className="py-3 px-4 text-left">
              {role === "user" ? "Email Alert" : "Action"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((flight, index) => (
            <tr key={index} className="border-b border-muted">
              <td className="py-3 px-4 text-left">{flight.flight_id}</td>
              <td className="py-3 px-4 text-left">{flight.airline}</td>
              <td className="py-4 px-4 text-left">
                <span
                  className={`whitespace-nowrap text-white px-2 py-1 rounded-md ${
                    flight.status === "Delayed"
                      ? "bg-yellow-500"
                      : flight.status === "On Time"
                      ? "bg-green-500"
                      : flight.status === "Cancelled"
                      ? "bg-red-500"
                      : ""
                  }`}
                >
                  {flight.status}
                </span>
              </td>
              <td className="py-3 px-4 text-left">{flight.departure_gate}</td>
              <td className="py-3 px-4 text-left">{flight.arrival_gate}</td>
              <td className="py-3 px-4 text-left">
                {formatDate(flight.scheduled_departure)}
              </td>
              <td className="py-3 px-4 text-left">
                {flight.actual_departure
                  ? formatDate(flight.actual_departure)
                  : "N/A"}
              </td>
              <td className="py-3 px-4 text-left whitespace-nowrap">
                {formatDate(flight.scheduled_arrival)}
              </td>
              <td className="py-3 px-4 text-left">
                {flight.actual_arrival
                  ? formatDate(flight.actual_arrival)
                  : "N/A"}
              </td>
              <td className="py-3 px-4 text-left">
                {role === "user" && (
                  <button
                    disabled={subscriptionList.includes(flight.flight_id)}
                    onClick={() => onClick(flight.flight_id)}
                    className={
                      subscriptionList.includes(flight.flight_id)
                        ? "bg-black text-white rounded-md p-2 cursor-not-allowed"
                        : "bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
                    }
                  >
                    {subscriptionList.includes(flight.flight_id)
                      ? "Subscribed"
                      : "Subscribe"}
                  </button>
                )}

                {role === "admin" && (
                  <button
                    onClick={() => handleUpdateModal(flight)}
                    className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        data={selectedFlight}
      />
    </div>
  );
};

Table.defaultProps = {
  data: [],
  onClick: () => {},
  subscriptionList: [],
  role: "user",
};
