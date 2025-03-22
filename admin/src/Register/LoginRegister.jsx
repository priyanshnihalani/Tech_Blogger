import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function LoginRegister() {
    const [account, setAccount] = useState("register");

    function handleRegisterClick() {
        setAccount("register");
    }

    function handleLoginClick() {
        setAccount("login");
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row justify-center items-center px-6 md:px-20 lg:px-40 py-10 ">
            {/* Image Section */}
            <div className="hidden md:block w-1/2">
                <img src="./images/account.png" alt="Contact Us" className="w-full max-w-md mx-auto" />
                <p className="text-gray-600 text-center mt-4 italic">"Connect with us for seamless account management."</p>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 max-w-md shadow-lg bg-white p-6 rounded-lg">
                {/* Toggle Buttons */}
                <div className="flex justify-around items-center w-full space-x-4 font-medium text-md bg-gray-200 p-1 rounded-lg">
                    <button
                        onClick={handleRegisterClick}
                        className={account === "register" ? "transition ease-in-out bg-[#d0b797] text-white w-1/2 shadow-sm p-2 rounded-md" : "w-1/2 p-2"}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={handleLoginClick}
                        className={account === "login" ? "transition ease-in-out bg-[#d0b797] text-white w-1/2 shadow-sm p-2 rounded-md" : "w-1/2 p-2"}
                    >
                        Sign In
                    </button>
                </div>

                {/* Content Area */}
                <div className="w-full mt-6 flex items-center justify-center overflow-hidden">
                    {account === "login" ? <Login /> : <Register />}
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;