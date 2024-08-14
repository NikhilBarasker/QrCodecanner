import React, { useState, useEffect } from "react";
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
  const [qrcode, setQrCode] = useState("");
  const [stream, setStream] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (isScanning) {
      const constraints = {
        video: { facingMode: { ideal: "environment" } },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          setStream(mediaStream);
          const video = document.getElementById("video");
          if (video) {
            video.srcObject = mediaStream;
            video.play();
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [isScanning]);

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleScan = (id) => {
    if (id) {
      setScannedValue(id.text);
      fetchData(id.text);
      stopScanning(); // Stop scanning after a successful scan
    }
  };

  const handleError = (err) => {
    console.log(err);
  };

  const fetchData = async (id) => {
    try {
      const response = await axios.post(
        `https://railway-qbx4.onrender.com/vendor/fetchVendorDataByQR`,
        { qrcode: id }
      );
      if (response.data) {
        setFetchedData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    setIsScanning(true); // Start scanning when the Click button is pressed
  };

  const handleQrCodeValue = (e) => {
    setQrCode(e.target.value);
  };

  const handleInputClick = () => {
    if (qrcode) {
      fetchData(qrcode);
    } else {
      alert("Please enter a QR code.");
    }
  };

  const navigateBack = () => {
    setFetchedData(null);
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
          <img src={Logo} style={{ height: "80px", width: "80px" }} />
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
          marginBottom: "150px",
        }}
      >
        {!fetchedData && (
          <div>
            <img
              src={camera}
              style={{
                height: "80px",
                marginBottom: "20px",
                marginLeft: "120px",
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
                facingMode="environment"
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
                marginLeft: "100px",
              }}
              onClick={handleClick} // Modified handler
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
            <div>
              <div className="flex items-center justify-center p-5">
                <div className="rounded-lg bg-gray-200 p-5">
                  <div className="flex">
                    <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="pointer-events-none absolute w-5 fill-gray-500 transition"
                      >
                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={qrcode}
                      onChange={handleQrCodeValue}
                      className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
                      placeholder="Enter QR Code"
                    />
                    <button
                      onClick={handleInputClick}
                      className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody className="mb-[50rem]">
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      border: "1px solid lightgray",
                    }}
                  >
                    First Name:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.fname}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      border: "1px solid lightgray",
                    }}
                  >
                    Last Name:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.lname}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      border: "1px solid lightgray",
                    }}
                  >
                    Phone Number:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.phone}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      border: "1px solid lightgray",
                    }}
                  >
                    Email:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.email}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      border: "1px solid lightgray",
                    }}
                  >
                    Company:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.company}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              style={{
                height: "40px",
                width: "150px",
                borderRadius: "20px",
                backgroundColor: "rgb(59 130 246 / 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px auto",
              }}
              onClick={navigateBack}
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
