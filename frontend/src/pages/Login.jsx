import React, { useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import image from "../images/authPageSide.png";
import { api_base_url } from '../helper';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pwd: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.pwd
      })
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isLoggedIn", true);
        alert("Login successfully");
        navigate("/"); 
      } else {
        setError(data.message);
        setTimeout(() => setError(""), 2000);
      }
    })
    .catch((err) => {
      setError("An error occurred. Please try again.");
      setTimeout(() => setError(""), 2000);
    });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-white">
      {/* Left side - Form */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <img className='w-50 mb-12' src={logo} alt="Company Logo" />
          
          <h1 className="text-2xl font-bold mb-6">Login to your account</h1>
          
          <form onSubmit={submitForm} className="space-y-4 w-full">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            
            
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium ">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="pwd" className="block text-sm font-medium ">Password</label>
              <input
                id="pwd"
                name="pwd"
                type="password"
                required
                onChange={handleChange}
                value={formData.pwd}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Login
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Create an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-3/5 bg-gray-100">
        <img 
          className="h-screen w-full object-cover" 
          src={image} 
          alt="Decorative background" 
        />
      </div>
    </div>
  );
}

export default Login;