import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearUser, selectUserEmail, selectUserName } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const ProfilePopUp = ({ closePopUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const email = useSelector(selectUserEmail);

  const popUpRef = useRef(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    navigate("/signin");
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      closePopUp();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={popUpRef}
      className="absolute right-10 z-10 mt-40 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1" role="none">
        <span className="block w-full px-4 py-2 text-left text-sm text-white">
          {name}
        </span>
        <span className="block w-full px-4 py-2 text-left text-sm text-white">
          {email}
        </span>
        <button
          onClick={handleSignOut}
          type="button"
          className="block w-full px-4 py-2 text-left text-sm text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
