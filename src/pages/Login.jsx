import Form from "../Components/LoginComponents/Form.jsx"
import Img from "../Components/LoginComponents/Img.jsx"

const Login = () => {
  return (
    <>
    <div className="flex w-full h-screen font-roboto">
      <div className="w-[33%] h-full flex flex-col justify-center items-center">
        <Img/>
      </div>
      <div className="bg-[#41a8f4] w-[67%] h-full flex justify-center items-center">
        <Form/>
      </div>
    </div>
    </>
  )
}

export default Login
