import React, { useState } from "react";
import axios from "axios";
import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClick = () => {
     navigate("/wabcamp");
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if(formData.email === "admin")
      navigate("/wabcamp");
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <a href="javascript:void(0)">
            <img src={Logo} alt="logo" className="w-[80px] mb-10 mx-auto" />
          </a>
          <h2 className="text-center text-3xl font-extrabold">
            Log in to your account
          </h2>
          <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between gap-4"></div>
            <div className="!mt-10">
              <button
                type="submit"
                onClick={handleClick}
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
