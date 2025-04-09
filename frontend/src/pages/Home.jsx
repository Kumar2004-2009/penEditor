import React, { useState,useEffect } from "react";
import Navbar from "../componenets/Navbar";
import ListCard from "../componenets/ListCard";
import GridCard from "../componenets/GridCard";
import { useNavigate } from "react-router-dom";
import { api_base_url } from "../helper";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [projTitle, setProjTitle] = useState("");
  const navigate = useNavigate();
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);

  const filteredData = data
    ? data.filter(
        (item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()) // Case insensitive filtering
      )
    : [];

  const createProj = (e) => {
    if (projTitle === "") {
      alert("Please Enter Project Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projTitle,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            setProjTitle("");
            alert("Project Created Successfully");
            navigate(`/editior/${data.projectId}`);
          } else {
            alert("Something Went Wrong");
          }
        });
    }
  };

  const getProj = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.projects);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getProj();
  }, []);

  const [userData, setUserData] = useState(null);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.user);
        } else {
          setUserError(data.message);
        }
      });
  }, []);

  return (
    <>
      <div className="flex h-screen ">
        {/* Sidebar - Handled by Navbar component */}
        <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />

        {/* Main Content Area */}
        <div className="flex-1 mt-18 md:mt-0 overflow-y-auto">
          {/* Header Section */}
          <div className="shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-semibold text-white">
                  Hi, {userData ? userData.username : ""} 🖐
                </h2>

                <div className="flex items-center gap-3">
                  <div className="relative flex-grow max-w-md">
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery} // Bind search input to searchQuery state
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    onClick={() => setIsCreateModelShow(true)}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {isGridLayout ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <GridCard key={index} item={item} />
                  ))
                ) : (
                  <p>No projects found</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <ListCard key={index} item={item} />
                  ))
                ) : (
                  <p>No projects found</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isCreateModelShow && (
        <div className="createModelIcon fixed yop-0 left-0  right-0 bottom-0 w-screen h-screen bg-[rgba(7,7,7,0.1)] flex items-center justify-center ">
          <div className="createModel w-[25vw] h-[30vh] shadow-lg shadow-black/50 bg-[#0a0909] border border-white rounded-[10px] p-[20px] ">
            <h3 className="text-2xl">Create New Project</h3>
            <div className="inputBox !bg-[#202020] mt-4">
              <input
                onChange={(e) => {
                  setProjTitle(e.target.value);
                }}
                value={projTitle}
                type="text"
                placeholder="Project Title"
              />
            </div>

            <div className="flex items-center gap-[10px] w-full mt-2">
              <button
                onClick={createProj}
                className="btnBlue rounded-[5px] w-[45%] !p-[5px] mt-2 !px-[10px] !py-[10px]"
              >
                Create
              </button>
              <button
                className="btnBlue !bg-[#1A1919] rounded-[5px] mt-2 w-[45%] !p-[5px] !px-[10px] !py-[10px]"
                onClick={() => setIsCreateModelShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
