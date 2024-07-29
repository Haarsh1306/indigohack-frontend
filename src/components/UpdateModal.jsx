import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const UpdateModal = ({ isOpen, onClose, data }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [status, setStatus] = useState(data?.status || "On Time");

  useEffect(() => {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16);
    };

    if (data) {
      setValue("flight_id", data.flight_id);
      setValue("status", data.status || "On Time");
      setValue("departure_gate", data.departure_gate || "");
      setValue("arrival_gate", data.arrival_gate || "");
      setValue("scheduled_departure", formatDate(data.scheduled_departure));
      setValue("scheduled_arrival", formatDate(data.scheduled_arrival));
      setStatus(data.status || "On Time");
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    onClose();
  };

  // Watch the status field to enable/disable the date fields
  const currentStatus = watch("status", "On Time");
  const isDisabled = currentStatus === "On Time" || currentStatus === "Cancelled";

  return (
    <div
      id="crud-modal"
      aria-hidden={!isOpen}
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 className="text-lg font-semibold text-white">
              Update Flight Details
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <span className="sr-only">Close modal</span>
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="flight_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight ID
                </label>
                <input
                  disabled
                  type="text"
                  name="flight_id"
                  id="flight_id"
                  {...register("flight_id")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  {...register("status")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="departure_gate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departure Gate
                </label>
                <input
                  type="text"
                  name="departure_gate"
                  id="departure_gate"
                  {...register("departure_gate")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="arrival_gate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Arrival Gate
                </label>
                <input
                  type="text"
                  name="arrival_gate"
                  id="arrival_gate"
                  {...register("arrival_gate")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="scheduled_departure"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Scheduled Departure
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_departure"
                  id="scheduled_departure"
                  {...register("scheduled_departure")}
                  disabled={isDisabled}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="scheduled_arrival"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Scheduled Arrival
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_arrival"
                  id="scheduled_arrival"
                  {...register("scheduled_arrival")}
                  disabled={isDisabled}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
