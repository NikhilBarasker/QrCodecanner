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
      const response = await axios.post(
        `https://railway-qbx4.onrender.com/vendor/fetchVendorDataByQR`,
        { qrcode: id }
      );
      console.log("xxxxxxx", response);
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
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
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
                    Aadhar:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.aadhar}
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
                    QR Code:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.qrcode}
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
                    Location of Stall:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {fetchedData.locationOfStall}
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
                    Profile Picture:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <img
                      src={fetchedData.profilePic}
                      alt="Profile"
                      style={{ maxHeight: "100px", borderRadius: "10px" }}
                    />
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
                    Aadhar Card Image:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <a
                      href={fetchedData.aadharCardImg}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
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
                    Police Verification Document:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <a
                      href={fetchedData.policeVarificationDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
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
                    Medical Validity Document:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    <a
                      href={fetchedData.madicalValidityDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
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
                    Start Date:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {new Date(fetchedData.startDate).toLocaleDateString()}
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
                    End Date:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {new Date(fetchedData.endDate).toLocaleDateString()}
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
                    Police Verification Validity:
                  </td>
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {`${new Date(
                      fetchedData.policeVarificationDateFrom
                    ).toLocaleDateString()} - ${new Date(
                      fetchedData.policeVarificationDateTo
                    ).toLocaleDateString()}`}
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
                  <td style={{ padding: "8px", border: "1px solid lightgray" }}>
                    {`${new Date(
                      fetchedData.medicalValidityDateFrom
                    ).toLocaleDateString()} - ${new Date(
                      fetchedData.medicalValidityDateTo
                    ).toLocaleDateString()}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
