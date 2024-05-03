import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


export default function Profile() {
  const [hist, setFun] = useState({});
  const [userData, setUserData] = useState();
  const [userData1, setUserData1] = useState();
  useEffect(() => {
    const getVal = () => {
      const token = localStorage.getItem("jwtToken"); // Retrieve the token from localStorage
      console.log("niraj", token);
      fetch(`http://127.0.0.1:5000/get_history`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFun(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    getVal(); // Call getVal only once on component mount
  }, []);
  useEffect(() => {
    setUserData({
      labels: Array.from(
        { length: hist["wpm"]?.length ?? 0 },
        (_, index) => index + 1
      ),
      datasets: [
        {
          label: "Words/minute",
          data: hist["wpm"],
          backgroundColor: ["#50AF95", "#f3ba2f"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
    setUserData1({
      labels: Array.from(
        { length: hist["ratio"]?.length ?? 0 },
        (_, index) => index + 1
      ),
      datasets: [
        {
          label: "number of Wrong words",
          data: hist["ratio"],
          backgroundColor: ["#50AF95", "#f3ba2f"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [hist]);

  const navigate = useNavigate();
  const handleLogout = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      localStorage.removeItem("jwtToken"); // Remove token from local storage
      navigate("/");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "40vh",
          marginTop: "50px",
        }}
      >
        <div className="card my-2" style={{ minHeight: "30vh", width: "40vh" }}>
          <div className="card-body">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-emoji-sunglasses"
              viewBox="0 0 16 16"
            >
              <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75M7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116" />
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0" />
            </svg>
            <h5 className="card-title">Card title</h5>
            <p className="card-text">user_email:{hist.email}</p>
            <p className="card-text">history_wpm:{hist.wpm}</p>
            <p className="card-text">number_wrong_words:{hist["ratio"]}</p>
            <p className="card-text">user_wrong_words:{hist["words"]}</p>
          </div>
          <button
            type="submit"
            className="btn btn-primary mx-2 my-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: 700,
          marginTop: "50px",
          marginLeft: 550,
        }}
      >
        {hist.wpm && (
          <Bar data={userData} /> // just like data={},options in bar can solve a lot of ui problems
        )}
        {hist.wpm && <Line data={userData1} />}
      </div>
    </div>
  );
}
