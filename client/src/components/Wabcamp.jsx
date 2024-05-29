import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import camera from "../assets/camera.png";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import QrReader from "react-qr-scanner";

export default function Wabcamp() {
  const navigate = useNavigate();
  const [scannedValue, setScannedValue] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleScan = (id) => {
    if (id) {
      setScannedValue(id.text);
      fetchData(id.text);
      setIsScanning(false);
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/fetchdata/${id}`
      );
      console.log('xxxxxxx',response)
      if (response.data) {
        setFetchedData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          height: "90px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <div>
          <img
            src={Logo}  
            style={{
              height: "80px",
              width: "80px",
            }}
          />
        </div>
        <div>
          <GrLogout
            style={{
              height: "30px",
              width: "30px",
              margin: "0 20px 0 0",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          padding: "20px",
        }}
      >
        <img
          src={camera}
          style={{
            height: "80px",
            marginBottom: "20px",
          }}
        />
        {isScanning && (
          <QrReader
            delay={300}
            style={{
              width: "100%",
              maxWidth: "300px",
              marginBottom: "20px",
            }}
            onError={handleError}
            onScan={handleScan}
          />
        )}
        <button
          style={{
            height: "40px",
            width: "150px",
            borderRadius: "20px",
            backgroundColor: "rgb(59 130 246 / 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setIsScanning(true)}
        >
          Click
        </button>
        <p
          style={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0",
          }}
        >
          Please click the button to access the camera to scan the QR code
        </p>
        {fetchedData && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              padding: "10px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "80%",
            }}
          >
            <h3>Fetched Data:</h3>
            <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}


