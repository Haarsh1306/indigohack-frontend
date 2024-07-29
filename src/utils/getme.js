import axios from 'axios';

export const getme = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { success: false, data: null }; 

    const result = await axios.get('http://localhost:3000/api/v1/getme', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
 
    return {
      success: result.data.message ? true : false,
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      data: null
    };
  }
};
