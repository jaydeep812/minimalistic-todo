import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

export default function CreateTodo(){
    const token = localStorage.getItem('token')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const navigate = useNavigate()
    return <div className="flex items-center justify-center h-screen">
        <div className="border-4 rounded-xl flex-row p-5 border-black">
            <div className="border-b-2 border-black text-center">
                <Header label={'Add Todo'}></Header>
            </div>
            <div className="m-4 ">
                <InputBox onChange={(e)=>{
                    setTitle(e.target.value)
                }} placeholder={'Title'}></InputBox>
            </div>
            <div className="m-4 ">
                <textarea onChange={(e)=>{
                    setDescription(e.target.value)
                }} name="description" id="" placeholder="description" className="font-architects text-center text-xl border-2 border-black rounded-xl" rows='5'></textarea>
            </div>
            <div className="flex justify-center">
                <button onClick={async()=>{
                    const response = await axios.post('http://localhost:3000/createTodo',{
                        title,
                        description
                    },{
                        headers:{
                            'Content-Type' : 'application/json',
                            Authorization : 'Bearer '+token
                        }
                    })
                    if(response){
                        navigate('/todos')
                    }
                }} className="border-2 p-2 border-black font-architects text-xl font-bold rounded-xl">Add Todo</button>
            </div>
        </div>

    </div>
}