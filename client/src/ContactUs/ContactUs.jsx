import Header from "../Header/Header";
import MyMap from "./Map";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form"

function ContactUs() {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    async function submit(data) {
        const response = await fetch("http://localhost:3000/contactus", {
            method: "POST"
            , headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify({ name: data.name, email: data.email, message: data.message })
        })
        const result = await response.json()
        if (result.message == "Success!") {
            alert("Message Sent Successfully!")
            setValue("name", "");
            setValue("email", "");
            setValue("message", "");
        }
        else {
            alert("Message Not Sent Something Went Wrong!")
        }
    }

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative bg-[#23528a] text-white text-center py-24">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold">Get in Touch</h1>
                    <p className="text-lg mt-4 w-1/2 mx-auto ">We’d love to hear from you! Whether it's feedback, queries, or collaboration, drop us a message and you will be notified shortly.</p>
                </div>
            </section>

            {/* Contact Form Section */}
            <div className="flex flex-col md:flex-row justify-center items-center w-full px-6 py-20 sm:px-10 md:px-20 lg:px-28 space-y-8 md:space-y-0">

                {/* Contact Form */}
                <form method="post" onSubmit={handleSubmit(submit)} className="w-full md:w-2/3 lg:w-1/2 p-8 bg-white rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-[#4a3f35] text-center">Send Us a Message</h2>

                    <div className="mt-6">
                        {/* Name Field */}
                        <label htmlFor="name" className="block font-semibold text-[#23528a]">Name:</label>
                        <input type="text" id="name" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23528a] transition duration-200" {...register("name", { required: "Name is required" })} />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mt-4">
                        {/* Email Field */}
                        <label htmlFor="email" className="block font-semibold text-[#23528a]">Email:</label>
                        <input type="email" id="email" className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23528a] transition duration-200" {...register("email", { required: "Email is required" })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mt-4">
                        {/* Message Field */}
                        <label htmlFor="message" className="block font-semibold text-[#23528a]">Message:</label>
                        <textarea id="message" rows={5} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#23528a] transition duration-200" {...register("message", { required: "Message is required" })}></textarea>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    <button type="submit" className="w-full mt-6 bg-[#23528a] text-white p-3 rounded-lg hover:bg-gray-600 transition duration-300 font-semibold">
                        Send Message
                    </button>
                </form>
            </div>

            {/* Map Section */}
            <div className="w-full px-6 sm:px-10 md:px-20 my-20 border-t border-gray-300 pt-10">
                <h2 className="text-center text-2xl font-semibold text-[#4a3f35] mb-6">Find Us on the Map</h2>
                <MyMap />
            </div>

            <Footer />
        </>


    );
}

export default ContactUs;