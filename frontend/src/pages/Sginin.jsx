import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import { useState } from "react"
import axios from "axios"

export default function Signin(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    function signup(){
        navigate('/signup')
    }
    return <div className="flex flex-col items-center justify-center h-screen space-y-6">
                    <Header label={'Sign In'}></Header>
                    <div className="flex flex-row items-center space-x-6">
                        <InputBox onChange={(e)=>{
                            setUsername(e.target.value)
                        }} placeholder={'username'}></InputBox>
                    </div>
                    <div className="flex flex-row items-center space-x-6">
                        <InputBox onChange={(e)=>{
                            setPassword(e.target.value)
                        }} placeholder={'password'}></InputBox>
                    </div> 
                    <div className="flex flex-row items-center space-x-6">
                        <button onClick={async()=>{
                            const response = await axios.post('https://minimalistic-todo-production.up.railway.app/signin',{
                                username,
                                password
                            },{
                                headers:{
                                    'Content-Type':'application/json'
                                }
                            })
                            localStorage.setItem('token',response.data.token)
                            navigate('/todos')
                        }} className="font-architects text-white bg-black text-xl p-2 rounded-xl">Log In</button>
                        </div>      
                    <div className="flex flex-row items-center space-x-6 font-architects text-xl">
                        Don't have an account? <button onClick={signup} className="ml-2 font-bold">Sign Up</button>
                    </div>
                         
                </div>
}
