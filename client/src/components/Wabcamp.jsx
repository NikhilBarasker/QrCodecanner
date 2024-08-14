import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logo.png";
import camera from "../assets/camera.png";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import jsQR from "jsqr";

export default function Wabcamp() {
  const navigate = useNavigate();
  const [scannedValue, setScannedValue] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [qrcode, setQrCode] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (isScanning) {
      const constraints = {
        video: { facingMode: "environment" }, // Request rear camera
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            requestAnimationFrame(scanQRCode); // Start scanning
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isScanning]);

  const scanQRCode = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageData = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const code = jsQR(
          imageData.data,
          canvasRef.current.width,
          canvasRef.current.height
        );

        
          setScannedValue(code.data);
          fetchData(code.data); // Fetch data after scanning
          setIsScanning(false); // Stop scanning
        
      }
    }
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

  const handleInputClick = () => {
    alert("it's working")
    fetchData(qrcode);
  };

  const handleQrCodeValue = (e) => {
    setQrCode(e.target.value);
  };

  const navigateBack = () => {
    setFetchedData(null); // Reset fetched data
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
              <div>
                <video
                  ref={videoRef}
                  style={{ width: "300px", height: "300px" }}
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}
            <button onClick={() => setIsScanning(true)}>Start Scanning</button>
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
                  Middle Name:
                </td>
                <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                  {fetchedData.mname}
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
                  Date of Birth:
                </td>
                <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                  {new Date(fetchedData.dob).toLocaleDateString()}
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
                  Mobile:
                </td>
                <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                  {fetchedData.mobile}
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
                  Category:
                </td>
                <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                  {fetchedData.category}
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
                <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                  {fetchedData.policeVarificationDateFrom &&
                  fetchedData.policeVarificationDateTo
                    ? `${new Date(
                        fetchedData.policeVarificationDateFrom
                      ).toLocaleDateString()} - ${new Date(
                        fetchedData.policeVarificationDateTo
                      ).toLocaleDateString()}`
                    : "Not available"}
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
                  Medical Validity:
                </td>
              </tr>
            </tbody>
            <button
              className="cursor-pointer transition-all bg-blue-500 text-white p-2 rounded hover:bg-blue-800"
              onClick={navigateBack}
            >
              Back
            </button>
          </div>
        )}
      </div>
      <div style={{ height: "70px", backgroundColor: "lightblue" }}></div>
    </div>
  );
}


