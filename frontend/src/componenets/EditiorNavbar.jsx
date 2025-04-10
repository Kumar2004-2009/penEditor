import React,{useState,useEffect} from 'react'
import img from "../images/logo.png";
import {FiDownload} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const EditorNavbar = ({projectID,htmlCode, cssCode, jsCode}) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("...");

  useEffect(() => {
    if (projectID) {
      fetch(`${api_base_url}/project/${projectID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProjectName(data.project.title); // or data.project.name based on your schema
          } else {
            setProjectName("Untitled Project");
          }
        })
        .catch((err) => {
          setProjectName("Failed to load");
          console.error("Error fetching project:", err);
        });
    }
  }, [projectID]);

  const handleDownload = () => {
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${projectName}</title>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
      </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${projectName || 'project'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
        <div className='EditorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]'>
            <div className='logo'>
                <img src={img} alt="logo" onClick={()=>navigate("/")} className='w-[130px] cursor-pointer' />
            </div>

            <p>File/ <span className='text-gray-400'>{projectName}</span></p>
            <div className='flex gap-5'>
            <i onClick={handleDownload} className='p-[8px] bg-black rounded-[5px] cursor-pointer text-[20px]'><FiDownload/></i>
            <div onClick={()=>navigate("/ai")} className=" cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
              <span className="text-blue-600 font-bold text-xl">AI</span>
            </div>
            </div>
        </div>
    </>
  )
}

export default EditorNavbar
