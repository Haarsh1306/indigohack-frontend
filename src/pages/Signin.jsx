import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Image } from "../components/Image";
import axios from "axios";
import { useEffect, useState } from "react";
import { getme } from "../utils/getme";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Loader } from "../components/Loader";

export const Signin = () => {
  const [error, setError] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await getme();
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      setIsButtonLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      setIsButtonLoading(false);
      dispatch(
        setUser({
          userId: res.data.userId,
          userEmail: res.data.userEmail,
          userName: res.data.userName,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      if (error.response.data.isVerified === false) {
        dispatch(
          setUser({
            userId: error.response.data.userId,
            userEmail: error.response.data.userEmail,
            userName: error.response.data.userName,
          })
        );

        setIsButtonLoading(false);
        navigate("/verify-otp");
      } else if (error.response) {
        setError(
          error.response.data.error || "An error occurred. Please try again."
        );
        setIsButtonLoading(false);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 items-center">
      <div className="hidden md:block">
        <Image />
      </div>
      <div className="flex flex-col h-screen justify-center items-center">
        <h2 className="font-bold text-3xl">Sign In</h2>
        <span>Sign in to your Indigo Hack account</span>
        <form
          className="flex flex-col mt-10 w-7/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="abc@gmail.com"
            className="border border-gray-400 p-2 my-2 rounded-lg"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="border border-gray-400 p-2 my-2 rounded-lg"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white p-2 my-2 rounded-lg hover:bg-gray-900 flex justify-center items-center"
            s
          >
            {isButtonLoading ? <Loader /> : "Sign In"}
          </button>

          <Link to="/signup" className="underline mt-2">
            Not have an account? Register Now
          </Link>
        </form>
      </div>
    </div>
  );
};
