import React, { useEffect, useState } from 'react';
import logo from "../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { 
  MdLightMode, 
  MdLogout,
  MdPersonOutline,
  MdGridOn,
  MdList,
  MdMenu,
  MdClose,
  MdHome,
  MdInfo,
  MdContacts,
  MdSettings
} from "react-icons/md";
import { api_base_url } from '../helper';

const Navbar = ({ isGridLayout, setIsGridLayout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(api_base_url + "/getUserDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId")
          })
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    fetchUserData();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="md:hidden fixed top-0 left-0 right-0 bg-[#141414] z-40 flex items-center justify-between px-4 py-2 shadow-md">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white focus:outline-none"
          >
            {sidebarOpen ? (
              <MdClose className="h-6 w-6" />
            ) : (
              <MdMenu className="h-6 w-6" />
            )}
          </button>
          <img 
            className="h-12 p-1 cursor-pointer" 
            src={logo} 
            alt="Company Logo" 
            onClick={() => navigate('/')}
          />
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${!sidebarOpen && isMobile ? '-translate-x-full' : 'translate-x-0'} 
          md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30 w-64 bg-[#141414] 
          flex flex-col h-screen shadow-lg`}>
        
        {/* Logo - Hidden on mobile since it's in the header */}
        <div className="hidden md:block items-center justify-center py-4 px-4 border-b border-gray-800">
          <img 
            className="h-12 cursor-pointer" 
            src={logo} 
            alt="Company Logo" 
            onClick={() => navigate('/')}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1 mt-14 md:mt-0">
            <Link 
              to="/" 
              className="group flex items-center px-4 py-3 text-md font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <MdHome className="mr-3 h-5 w-5" />
              Home
            </Link>
            <Link 
              to="/about" 
              className="group flex items-center px-4 py-3 text-md font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <MdInfo className="mr-3 h-5 w-5" />
              About
            </Link>
            <Link 
              to="/contact" 
              className="group flex items-center px-4 py-3 text-md font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <MdContacts className="mr-3 h-5 w-5" />
              Contact
            </Link>
            
          </nav>
        </div>

        {/* User Controls */}
        <div className="px-4 py-4 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsGridLayout(!isGridLayout)}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              title={isGridLayout ? "Switch to List View" : "Switch to Grid View"}
            >
              {isGridLayout ? (
                <MdList className="h-5 w-5" />
              ) : (
                <MdGridOn className="h-5 w-5" />
              )}
            </button>

            <button
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              title="Toggle theme"
            >
              <MdLightMode className="h-5 w-5" />
            </button>
          </div>

          {/* User dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
              aria-label="User menu"
            >
              <div className="flex items-center">
                <MdPersonOutline className="h-5 w-5 mr-3" />
                <span className="truncate">{userData ? userData.name : "User"}</span>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute left-10 bottom-11 right-0 mt-1 py-1 bg-gray-800 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  <MdLogout className="mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;