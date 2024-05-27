const React = require("react");
const { useState, useEffect } = require("react");
const axios = require("axios");

const Backend = () => {
  const [verifiedData, setVerifiedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to verify email and password
    const verifyData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:3000/verify", {
          email: "example@example.com",
          password: "password123",
        });
        setVerifiedData(response.data);
      } catch (error) {
        setError(error);
        console.error("Error verifying data:", error);
      }
    };

    verifyData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!verifiedData) {
    return <div>Loading...</div>;
  }

  return <div>Verification successful!</div>;
};

module.exports = Backend;
