import Header from "../Header/Header";
import MyMap from "./Map";
import Footer from "../Footer/Footer";
import { useForm } from "react-hook-form"

function ContactUs() {

    const { register, handleSubmit,setValue, formState: { errors } } = useForm();

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
            <h1 className="text-center py-10 text-3xl font-bold text-[#4a3f35]">Contact Us</h1>

            <div className="flex flex-col md:flex-row items-center w-full px-6 py-20 sm:px-10 md:px-20 lg:px-28 space-y-8 md:space-y-0">
                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="./images/contactus.png" alt="Contact Us" className="w-full max-w-[400px] rounded-lg" />
                </div>

                {/* Right Side: Form */}
                <form method="post" onSubmit={handleSubmit(submit)} className="w-full md:w-1/2  p-6 rounded-lg shadow-sm">
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold text-[#4a3f35]">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border-2 border-[#d0b797] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b49e7f]"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold text-[#4a3f35]">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border-2 border-[#d0b797] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b49e7f]"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Message Field */}
                    <div className="mb-4">
                        <label htmlFor="message" className="block font-semibold text-[#4a3f35]">Message:</label>
                        <textarea
                            id="message"
                            rows={5}
                            className="w-full border-2 border-[#d0b797] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b49e7f]"
                            {...register("message", { required: "Message is required" })}>
                        </textarea>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#d0b797] text-white p-2 rounded-lg hover:bg-[#b49e7f] transition duration-300 font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Map Section */}
            <div className="px-6 sm:px-10 md:px-20 my-20">
                <MyMap />
            </div>


            <Footer />
        </>
    );
}

export default ContactUs;