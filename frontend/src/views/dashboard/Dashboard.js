/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [totalSectors, setTotalSectors] = useState("");
  const [totalCustomers, setTotalCustomers] = useState("");
  const [totalServices, setTotalServices] = useState("");

  const fetchStatistics = async () => {
    console.log("Hit APi");
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/dashboardStatistics`);
      if (response.data) {
        setTotalSectors(response.data.dataSectors);
        setTotalCustomers(response.data.dataCustomers);
        setTotalServices(response.data.dataServices);
      } else {
        console.error("API error:");
      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  useEffect(() => {
    fetchStatistics();
  });

  return (
    <div className="flex flex-wrap p-4 gap-4"> {/* Use flex-wrap for responsive layout */}
      {/* Box 1: Total Sectors */}
      <div className="bg-blue-500 text-white p-6 rounded-lg flex-1 sm:flex-none sm:w-1/2"> {/* sm:w-1/2 for 2-column layout on non-mobile screens */}
        <h2 className="text-xl font-bold">Total Sectors</h2>
        <p className="text-3xl">{totalSectors}</p> {/* Large text for the count */}
      </div>

      {/* Box 2: Total Customers */}
      <div className="bg-green-500 text-white p-6 rounded-lg flex-1 w-full sm:w-auto"> {/* Same layout style */}
        <h2 className="text-xl font-bold">Total Customers</h2>
        <p className="text-3xl">{totalCustomers}</p>
      </div>

      {/* Box 3: Total Services */}
      <div className="bg-purple-500 text-white p-6 rounded-lg flex-1 sm:flex-none sm:w-1/2"> {/* w-full for mobile, sm:w-auto for other screens */}
        <h2 className="text-xl font-bold">Total Services</h2>
        <p className="text-3xl">{totalServices}</p>
      </div>
    </div>
  );
};

export default Dashboard;