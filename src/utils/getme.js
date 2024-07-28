import axios from "axios";

export const getme = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:3000/api/v1/getme", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.message) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };