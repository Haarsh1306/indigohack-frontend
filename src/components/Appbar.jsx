import { useSelector } from "react-redux";
import { Avatar } from "./Avatar";
import { selectUserName } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { ProfilePopUp } from "./ProfilePopUp";

export const Appbar = () => {
  const [popUpFlag, setPopUpFlag] = useState(false);
  const handlePopUp = () => {
    setPopUpFlag(!popUpFlag);
  };
  const name = useSelector(selectUserName);
  useEffect(() => {
    console.log("Appbar rendered");
    console.log(name);
  }, []);
  return (
    <div className="bg-gray-600 flex justify-between items-center py-2 px-4">
      <div className="text-xl text-white font-semibold">
        Real Time Flight Update
      </div>
      <div>
        <button type="button" onClick={handlePopUp}>
          <Avatar name={name.slice(0, 1)} />
        </button>
      </div>
      {popUpFlag && <ProfilePopUp closePopUp={setPopUpFlag} />}
    </div>
  );
};
