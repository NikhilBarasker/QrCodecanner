// import React, { useState ,useEffect} from "react";
// import Logo from "../assets/Logo.png";
// import camera from "../assets/camera.png";
// import { useNavigate } from "react-router-dom";
// import { GrLogout } from "react-icons/gr";
// import axios from "axios";
// import QrReader from "react-qr-scanner";

// export default function Wabcamp() {
//   const navigate = useNavigate();
//   const [scannedValue, setScannedValue] = useState("");
//   const [fetchedData, setFetchedData] = useState(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [qrcode, setQrCode] = useState("");
//   const [scanning, setScanning] = useState(false);
//   const [stream, setStream] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//  useEffect(() => {
//    if (scanning) {
//      const constraints = {
//        video: { facingMode: "environment" }, // Ensures the back camera is used
//      };

//      navigator.mediaDevices
//        .getUserMedia(constraints)
//        .then((mediaStream) => {
//          setStream(mediaStream);
//          const video = document.getElementById("video");
//          if (video) {
//            video.srcObject = mediaStream;
//            video.play();
//          }
//        })
//        .catch((err) => {
//          console.error("Error accessing camera: ", err);
//        });
//    }
//  }, [scanning]);

//   const stopScanning = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//     }
//     setScanning(false);
//   };

//   const handleScan = (id) => {
//     if (id) {
//       setScannedValue(id.text);
//       fetchData(id.text);
//       setIsScanning(false);
//     }
//   };

//   const handleError = (err) => {
//     console.log(err);
//   };

//   const fetchData = async (id) => {
//     console.log('hiiiiiii')
//     try {
//       const response = await axios.post(
//         `https://railway-qbx4.onrender.com/vendor/fetchVendorDataByQR`,
//         { qrcode: id }
//       );
//       console.log("xxxxxxx", response);
//       if (response.data) {
//         setFetchedData(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleInputClick = () => {
//     console.log("QrCode: ", qrcode);
//     fetchData(qrcode);
//   };

//   const handleQrCodeValue = (e) => {
//     setQrCode(e.target.value);
//   };

//   const navigateBack = () => {
//     setFetchedData(false)
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         justifyContent: "space-between",
//       }}
//     >
//       <div
//         style={{
//           height: "90px",
//           backgroundColor: "lightblue",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "5px",
//         }}
//       >
//         <div>
//           <img src={Logo} style={{ height: "80px", width: "80px" }} />
//         </div>
//         <div>
//           <GrLogout
//             style={{
//               height: "30px",
//               width: "30px",
//               margin: "0 20px 0 0",
//               cursor: "pointer",
//             }}
//             onClick={handleLogout}
//           />
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           flex: "1",
//           padding: "20px",
//           marginBottom: "150px",
//         }}
//       >
//         {!fetchedData && (
//           <div>
//             <img
//               src={camera}
//               style={{
//                 height: "80px",
//                 marginBottom: "20px",
//                 marginLeft: "120px",
//               }}
//             />
//             {isScanning && (
//               <QrReader
//                 delay={300}
//                 style={{
//                   width: "100%",
//                   maxWidth: "300px",
//                   marginBottom: "20px",
//                 }}
//                 onError={handleError}
//                 onScan={handleScan}
//                 facingMode="environment" // Ensure this is properly supported
//               />
//             )}
//             {/* <button
//               style={{
//                 height: "40px",
//                 width: "150px",
//                 borderRadius: "20px",
//                 backgroundColor: "rgb(59 130 246 / 0.5)",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginLeft: "100px",
//               }}
//               onClick={() => setIsScanning(true)}
//             >
//               Click
//             </button> */}
//             <div>
//               <button onClick={() => setIsScanning(true)}>
//                 Start Scanning
//               </button>
//               {scanning && (
//                 <div>
//                   <video
//                     id="video"
//                     style={{ width: "300px", height: "300px" }}
//                   />
//                   <button onClick={stopScanning}>Stop Scanning</button>
//                 </div>
//               )}
//             </div>
//             <p
//               style={{
//                 width: "100%",
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 padding: "10px 20px",
//                 margin: "0",
//               }}
//             >
//               Please click the button to access the camera to scan the QR code
//             </p>
//             <div>
//               <div className="flex items-center justify-center p-5">
//                 <div className="rounded-lg bg-gray-200 p-5">
//                   <div className="flex">
//                     <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
//                       <svg
//                         viewBox="0 0 20 20"
//                         aria-hidden="true"
//                         className="pointer-events-none absolute w-5 fill-gray-500 transition"
//                       >
//                         <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
//                       </svg>
//                     </div>
//                     <input
//                       type="text"
//                       value={qrcode}
//                       onChange={handleQrCodeValue}
//                       className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0"
//                       placeholder="Enter QR Code"
//                     />

//                     <button
//                       onClick={handleInputClick}
//                       className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {fetchedData && (
//           <div
//             style={{
//               marginTop: "20px",
//               textAlign: "center",
//               padding: "10px",
//               border: "1px solid lightgray",
//               borderRadius: "10px",
//               backgroundColor: "white",
//               width: "80%",
//             }}
//           >
//             <h3>Fetched Data:</h3>
//             <table style={{ width: "100%", borderCollapse: "collapse" }}>
//               <tbody className="mb-[50rem]">
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     First Name:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.fname}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Middle Name:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.mname}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Last Name:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.lname}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Date of Birth:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {new Date(fetchedData.dob).toLocaleDateString()}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Mobile:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.mobile}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Aadhar:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.aadhar}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     QR Code:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.qrcode}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Location of Stall:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.locationOfStall}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Profile Picture:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     <img
//                       src={fetchedData.profilePic}
//                       alt="Profile"
//                       style={{ maxHeight: "100px", borderRadius: "10px" }}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Aadhar Card Image:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     <a
//                       href={fetchedData.aadharCardImg}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View Document
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Police Verification Document:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     <a
//                       href={fetchedData.policeVarificationDocument}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View Document
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Medical Validity Document:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     <a
//                       href={fetchedData.madicalValidityDocument}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       View Document
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Start Date:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {new Date(fetchedData.startDate).toLocaleDateString()}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     End Date:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {new Date(fetchedData.endDate).toLocaleDateString()}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Police Verification Validity:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.policeVarificationDateFrom &&
//                     fetchedData.policeVarificationDateTo
//                       ? `${new Date(
//                           fetchedData.policeVarificationDateFrom
//                         ).toLocaleDateString()} - ${new Date(
//                           fetchedData.policeVarificationDateTo
//                         ).toLocaleDateString()}`
//                       : "Not available"}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{
//                       fontWeight: "bold",
//                       padding: "8px",
//                       border: "1px solid lightgray",
//                     }}
//                   >
//                     Medical Validity:
//                   </td>
//                   <td style={{ padding: "8px", border: "1px solid lightgray" }}>
//                     {fetchedData.medicalValidityDateFrom &&
//                     fetchedData.medicalValidityDateTo
//                       ? `${new Date(
//                           fetchedData.medicalValidityDateFrom
//                         ).toLocaleDateString()} - ${new Date(
//                           fetchedData.medicalValidityDateTo
//                         ).toLocaleDateString()}`
//                       : "Not available"}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <button
//               className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
// border-blue-600
// border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
// active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
//               onClick={navigateBack}
//             >
//               Back
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (scanning) {
      const constraints = {
        video: { facingMode: "environment" },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            requestAnimationFrame(scanQRCode);
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
  }, [scanning]);

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

        if (code) {
          setScannedValue(code.data);
          fetchData(code.data);
          setIsScanning(false);
        } else {
          requestAnimationFrame(scanQRCode);
        }
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
    fetchData(qrcode);
  };

  const handleQrCodeValue = (e) => {
    setQrCode(e.target.value);
  };

  const navigateBack = () => {
    setFetchedData(false);
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
                <button onClick={() => setScanning(false)}>
                  Stop Scanning
                </button>
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody className="mb-[50rem]">{/* Add table rows here */}</tbody>
            </table>
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
