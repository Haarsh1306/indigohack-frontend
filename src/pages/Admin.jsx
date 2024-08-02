import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { Appbar } from "../components/Appbar";
import { Table } from "../components/Table";
import axios from "axios";
import { getme } from "../utils/getme";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { backend_url } from "../../config";

export const Admin = () => {
  const [isPageLoading, setPageLoading] = useState(true);
  const [flightData, setFlightData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = (await getme()).success;
      const data = (await getme()).data;
      if (!isAuthenticated) {
        navigate("/signin");
      } else {
        if (data.userRole !== "admin") {
          navigate("/unauthorized");
        }
        dispatch(
          setUser({
            userId: data.userId,
            userEmail: data.userEmail,
            userName: data.userName,
            userRole: data.userRole,
          })
        );
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    getFlight();
  }, []);

  const getFlight = async () => {
    const token = localStorage.getItem("token");
    
    
    const result = await axios.get(`${backend_url}/api/v1/flight`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFlightData(result.data);
    setPageLoading(false);
  };

  return isPageLoading ? (
    <div className="flex justify-center items-center h-screen bg-black">
      <Loader />
    </div>
  ) : (
    <div className="bg-black min-h-screen">
      <Appbar />
      <div className="p-10">
        <Table data={flightData} role="admin" setFlightData={setFlightData} />
      </div>
    </div>
  );
};
