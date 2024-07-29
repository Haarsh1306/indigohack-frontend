import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getme } from "../utils/getme";
import { Table } from "../components/Table";
import { Loader } from "../components/Loader";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);
  const [isPageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await getme();
      if (!isAuthenticated) {
        navigate("/signin");
      }
    };

    checkAuth();
  }, [navigate]);

  const getFlight = async () => {
    const result = await axios.get("http://localhost:3000/api/v1/flight");
    console.log(result.data);
    setFlightData(result.data);
    setPageLoading(false);
  };

  useEffect(() => {
    getFlight();
  }, []);

  return (
    isPageLoading ? (
      <div className="h-screen flex justify-center items-center bg-black"><Loader /></div>
    ) : (
      <div className="bg-black p-10">
        <Table data={flightData} />
      </div>
    )
  );
};
