import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getme } from "../utils/getme";
import { Table } from "../components/Table";
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, setUser } from "../redux/userSlice";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [flightData, setFlightData] = useState([]);
  const [isPageLoading, setPageLoading] = useState(true);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = (await getme()).success;
      const data = (await getme()).data;
      if (!isAuthenticated) {
        navigate("/signin");
      } else {
        dispatch(
          setUser({
            userId: data.userId,
            userEmail: data.userEmail,
            userName: data.userName,
          })
        );
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      getSubscriptionList();
    }
  }, [userId]);

  useEffect(() => {
    getFlight();
  }, []);

  const getFlight = async () => {
    const result = await axios.get("http://localhost:3000/api/v1/flight");
    setFlightData(result.data);
    
  };

  const getSubscriptionList = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/flight/subscriptions/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.message) {
        setSubscriptionList(res.data.flightIds);
        setPageLoading(false);
      }
    } catch (error) {
      setPageLoading(false);
    }
  };

  const onClick = async (flightId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/v1/flight/subscribe",
        { user_id: userId, flight_id: flightId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.message) {
        setSubscriptionList([...subscriptionList, flightId]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isPageLoading ? (
    <div className="h-screen flex justify-center items-center bg-black">
      <Loader />
    </div>
  ) : (
    <div className="bg-black p-10">
      <Table
        data={flightData}
        onClick={onClick}
        subscriptionList={subscriptionList}
      />
    </div>
  );
};
