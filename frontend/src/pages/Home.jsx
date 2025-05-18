import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate()
    function signupClick(){
        navigate('/Signup')
    }
    function signinClick(){
        navigate('/Signin')
    }
  return (
    <>
       <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <Header label={'Get shit done!'} />

        <div className="flex flex-row items-center space-x-6">
          <Button onClick={signupClick} label={'Sign Up'} />
          <Button onClick={signinClick}  label={'Sign In'} />
        </div>
      </div>
    </>
  )
}