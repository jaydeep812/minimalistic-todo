import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import { useEffect, useState } from "react"
import axios from 'axios'


export default function Signup(){
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    function signin(){
        navigate('/signin')
    }
    return <div className="flex flex-col items-center justify-center h-screen space-y-6">
                <Header label={'Sign Up'}></Header>
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
                    <InputBox onChange={(e)=>{
                        setFirstName(e.target.value)
                    }} placeholder={'First Name'}></InputBox>
                </div>  
                <div className="flex flex-row items-center space-x-6">
                    <InputBox onChange={(e)=>{
                        setLastName(e.target.value)
                    }} placeholder={'Last Name'}></InputBox>
                </div>
                <div className="flex flex-row items-center space-x-6">
                    <button onClick={async()=>{
                        const response = await axios.post('http://localhost:3000/signup',{
                            username,
                            password,
                            firstName,
                            lastName
                        },{
                            headers:{
                                'Content-Type':'application/json'
                            }
                        })
                        localStorage.setItem("token",response.data.token)
                        localStorage.setItem("firstName",firstName)
                        navigate('/todos')
                    }} className="font-architects text-white bg-black text-xl p-2 rounded-xl">Create an account</button>
                </div>
                <div className="flex flex-row items-center space-x-6 font-architects text-xl">
                    Already have an account? <button onClick={signin} className="ml-2 font-bold">Sign In</button>
                </div>             
            </div>
}