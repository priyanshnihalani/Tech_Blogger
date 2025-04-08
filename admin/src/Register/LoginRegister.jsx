import { useEffect, useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";

function LoginRegister() {

    useEffect(() => {
        let data = sessionStorage.getItem('adminaccesstoken')
        let data1 = sessionStorage.getItem('adminid')
        let data2 = sessionStorage.getItem('adminname')

        if(data && data1 && data2){
            navigate('/')
        }

    }, [])
    const [account, setAccount] = useState("register");
    const navigate = useNavigate()
    function handleRegisterClick() {
        setAccount("register");
    }

    function handleLoginClick() {
        setAccount("login");
    }

    return (
        <>
            <div className="flex justify-between w-full items-center bg-gray-600 text-white py-3 px-8">
                <h1 className="font-black text-2xl">Tech Blogger</h1>
            </div>
            <div className="min-h-screen w-full flex flex-col space-y-20 justify-center items-center px-6 md:px-20 lg:px-40 py-0 ">


                {/* Form Section */}
                <div className="w-full md:w-1/2 max-w-md shadow-lg bg-white p-6 rounded">
                    {/* Toggle Buttons */}
                    <div className="flex justify-around items-center w-full space-x-4 font-medium text-md bg-gray-200 p-0 rounded">
                        <button
                            onClick={handleRegisterClick}
                            className={account === "register" ? "transition ease-in-out bg-[#23528a] text-white w-1/2 shadow-sm p-2 rounded-sm" : "w-1/2 p-2"}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={handleLoginClick}
                            className={account === "login" ? "transition ease-in-out bg-[#23528a] text-white w-1/2 shadow-sm p-2 rounded-sm" : "w-1/2 p-2"}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="w-full mt-6 flex items-center justify-center overflow-hidden">
                        {account === "login" ? <Login /> : <Register />}
                    </div>
                </div>
                <p className="w-3/4">
                    "Stay ahead in the tech world with Tech Blogging! Our platform connects you with insightful articles, industry trends, and discussions that fuel innovation. From coding tutorials to AI advancements, there’s always something new to learn. Join us today and start your tech journey!"
                </p>
            </div>
            <Footer />
        </>
    );
}

export default LoginRegister;