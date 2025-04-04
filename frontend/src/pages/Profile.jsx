import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(
          "http://localhost:1000/api/v1/getUserData",
          { headers }
        );

        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, navigate]); // Added dependencies for clarity

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
          {ProfileData && (
            <>
              {/* Sidebar for Desktop */}
              <div className="h-auto lg:h-[80vh] w-full lg:w-1/5 bg-zinc-800 rounded-lg">
                <Sidebar ProfileData={ProfileData} />
              </div>

              {/* Mobile Bar */}
              <MobileBar />

              {/* Main Content */}
              <div className="h-[100%] w-full lg:w-5/6 rounded-lg">
                <Outlet />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
