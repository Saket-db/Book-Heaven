import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [value, setValue] = useState({ address: "" });
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const headers = {
    id: userId,
    authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getUserData", { headers });
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const updateAddress = async () => {
    try {
      const res = await axios.put("http://localhost:1000/api/v1/update-user-address", value, { headers });
      alert(res.data.message);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  if (loading) return <Loader />;

  return profileData ? (
    <div className="h-full p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Settings</h1>
      
      <div className="flex gap-12">
        <div>
          <label>Username</label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData.username}</p>
        </div>
        <div>
          <label>Email</label>
          <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">{profileData.email}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <label>Address</label>
        <textarea
          className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
          rows="5"
          placeholder="Address"
          name="address"
          value={value.address}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
          onClick={updateAddress}
        >
          Update
        </button>
      </div>
    </div>
  ) : (
    <p className="text-white text-center text-xl">User data not found.</p>
  );
};

export default Settings;
