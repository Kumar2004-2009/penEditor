import React, { useState } from 'react'
import img from "../images/code.png";
import deleteImg from "../images/delete.png";
import { useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';
const GridCard = ({item}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();
  const deleteProj = (id) => {
      fetch(api_base_url + "/deleteProject",{
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progId: id,
          userId: localStorage.getItem("userId")
        })
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          setIsDeleteModelShow(false)
          window.location.reload()
        }else{
          alert(data.message)
          setIsDeleteModelShow(false)
        }
      })
    }
  return (
    <>
        <div className='gridCard bg-[#141414] p-[18px] w-[270px] cursor-pointer hover:bg-[#202020] rounded-lg shadow-lg shadow-black '>
        <div onClick={()=>{navigate(`/editior/${item._id}`)}}>
            <img src={img} className='w-[55px] mb-3' alt="" />

            <h3 className="text-[19px] w-[90%] line-clamp-1 ">{item.title}</h3>
            </div>
            <div className='flex items-center justify-between'>
            <p className="text-gray-400 text-[13px]">Created in {new Date(item.date).toDateString()}</p>
            <img src={deleteImg} onClick={()=>setIsDeleteModelShow(true)} className='w-[25px] cursor-pointer' alt="" />
            </div>
        </div>

        {
        isDeleteModelShow && <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex justify-center items-center flex-col ">
        <div className="mainModel w-[27vw] h-[25vh] bg-[#141414] border border-white rounded-lg p-[10px] ">
          <h3 className="text-xl text-center py-5">Do you want to delete this project</h3>
          <div className="flex w-full mt-3 items-center justify-center gap-[10px]">
            <button onClick={()=>deleteProj(item._id)} className="p-[10px] rounded-lg bg-red-500 text-white cursor-pointer min-w-[45%] " >Delete</button>
            <button onClick={()=>setIsDeleteModelShow(false)} className="p-[10px] rounded-lg bg-gray-700 text-white cursor-pointer min-w-[45%] " >Cancel</button>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default GridCard
