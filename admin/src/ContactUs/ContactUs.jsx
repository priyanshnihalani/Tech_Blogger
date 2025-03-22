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
            <Header />
            <div className="min-h-screen">

                <h1 className="text-center py-10 text-3xl font-bold text-[#4a3f35]">Contact Us</h1>


                <div className="space-y-6 px-20">
                    {data?.map((item, index) => (
                        <div key={index} className="border-2 rounded-xl px-2 py-4 space-y-2">
                            <p><span className="font-bold">Name:</span> {item.name}</p>
                            <p><span className="font-bold"> Email:</span> {item.email}</p>
                            <p><span className="font-bold">Message: </span> {item.message}</p>
                        </div>
                    ))}
                </div>

            </div>

            <Footer />
        </>
    );
}

export default ContactUs;