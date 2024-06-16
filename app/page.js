"use client"

import ToDo from "@/Components/ToDo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [formData,setFormData]= useState({
    title:"",
    description:"",
  });

  const [todoData, setTododata] = useState([]);

  const fetchTodos = async () => {

    const response = await axios('/api');
    setTododata(response.data.todos);
  }

  useEffect(()=>{
    fetchTodos();

  },[])

  const onChangeHandler = (e) => {
    const name=e.target.name;
    const value=e.target.value;
    setFormData(form => ({...form,[name]:value}));
    console.log(formData);

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      //api
      const response = await axios.post('/api',formData);


      toast.success(response.data.msg);
      setFormData({
        title:"",
        description:"",
      })
    } catch(error){

      toast.error("Error")

    }
  }
  return (
    <>
    <ToastContainer theme="dark"/>
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto ">
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
          value={formData.title}
        ></input>
        <textarea
          name="description"
          value={formData.description}
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full"
          onChange={onChangeHandler}
        />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add ToDO
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 mx-auto w-[60%]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            
            {todoData.map((item,index)=>{
              return <ToDo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id}/>

            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
