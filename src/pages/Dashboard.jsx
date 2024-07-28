import axios from "axios";
import { get } from "mongoose";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getme } from "../utils/getme";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getme()) navigate("/signin");
  }, []);
  
  const getFlight = async () => {
    const result = await axios.get("http://localhost:3000/api/v1/flight");
    console.log(result.data);
  };
  useEffect(() => {
    getFlight();
  }, []);

  return (
    <div className="bg-background text-foreground p-8 sm:p-12 md:p-16 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Flight Information</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="py-3 px-4 text-left">Flight ID</th>
                <th className="py-3 px-4 text-left">Airline</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Departure Gate</th>
                <th className="py-3 px-4 text-left">Arrival Gate</th>
                <th className="py-3 px-4 text-left">Scheduled Departure</th>
                <th className="py-3 px-4 text-left">Actual Departure</th>
                <th className="py-3 px-4 text-left">Scheduled Arrival</th>
                <th className="py-3 px-4 text-left">Actual Arrival</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-muted">
                <td className="py-4 px-4">AB123</td>
                <td className="py-4 px-4">Acme Airlines</td>
                <td className="py-4 px-4">
                  <span className="bg-green-500 text-green-50 px-2 py-1 rounded-md">
                    On Time
                  </span>
                </td>
                <td className="py-4 px-4">A12</td>
                <td className="py-4 px-4">B34</td>
                <td className="py-4 px-4">10:30 AM</td>
                <td className="py-4 px-4">10:25 AM</td>
                <td className="py-4 px-4">5:45 PM</td>
                <td className="py-4 px-4">5:40 PM</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="py-4 px-4">CD456</td>
                <td className="py-4 px-4">Acme Airlines</td>
                <td className="py-4 px-4">
                  <span className="bg-yellow-500 text-yellow-50 px-2 py-1 rounded-md">
                    Delayed
                  </span>
                </td>
                <td className="py-4 px-4">C56</td>
                <td className="py-4 px-4">D78</td>
                <td className="py-4 px-4">2:00 PM</td>
                <td className="py-4 px-4">2:15 PM</td>
                <td className="py-4 px-4">8:30 PM</td>
                <td className="py-4 px-4">8:45 PM</td>
              </tr>
              <tr className="border-b border-muted">
                <td className="py-4 px-4">EF789</td>
                <td className="py-4 px-4">Acme Airlines</td>
                <td className="py-4 px-4">
                  <span className="bg-red-500 text-red-50 px-2 py-1 rounded-md">
                    Canceled
                  </span>
                </td>
                <td className="py-4 px-4">E90</td>
                <td className="py-4 px-4">F12</td>
                <td className="py-4 px-4">6:00 PM</td>
                <td className="py-4 px-4">-</td>
                <td className="py-4 px-4">11:00 PM</td>
                <td className="py-4 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
