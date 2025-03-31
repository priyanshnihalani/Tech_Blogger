import Header from "../Header/Header";
import MyMap from "./Map";
import Footer from "../Footer/Footer";
import { set, useForm } from "react-hook-form"
import { useEffect, useState } from "react";

function ContactUs() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/contactusmessages")
            const result = await response.json()
            setData(result?.result)
            console.log(result.result)
        }

        fetchData()

    }, [])

    return (
        <>
            {/* <Header /> */}
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-10 md:px-20 lg:px-32">
                {/* Title */}
                <h1 className="text-center text-4xl font-extrabold text-[#23528a] mb-12">Contact Messages</h1>

                {/* Messages Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 border-2 border-[#23528a] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            {/* User Info */}
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center text-lg font-bold text-white">
                                    {item.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-lg text-[#4a3f35]">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.email}</p>
                                </div>
                            </div>

                            {/* Message */}
                            <p className="text-gray-700 text-base bg-gray-50 p-3 rounded-lg border border-gray-200">
                                {item.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


            {/* <Footer /> */}
        </>
    );
}

export default ContactUs;