import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { faAdd, faClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function TechTutorial() {
    const [upload, setUpload] = useState(false);
    const [links, setLinks] = useState([])
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:3000/techtutorials")
            const result = await response.json();
            console.log(result)
            if (result.message == "Internal Server Error") {
                alert(result.message)
            }
            setLinks(result?.data)
        }
        fetchData();
    }, [])

    async function submitLink(data) {
        const response = await fetch("http://localhost:3000/uploadlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: data.uploadtitle, url: data.uploadlink, description: data.uploaddescription, timeStamp: Date.now(), name: localStorage.getItem("name") })
        })

        const result = await response.json();
        alert(result.message);
        setValue("uploadtitle", '')
        setValue("uploadlink", '')
        setValue("uploaddescription", '')
        setUpload(false)
        window.location.reload()
    }

    async function handleDelete(timeStamp) {
        const response = await fetch("http://localhost:3000/deletetutorial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({timeStamp})
        })

        const result = await response.json();
        alert(result.message);
    }

    return (
        <>
            <Header />
            <div className='w-full min-h-screen  text-white flex flex-col items-center'>

                <section className='relative w-full max-w-screen-lg py-6'>
                    <button className='cursor-pointer absolute top-4 sm:top-5 right-5 lg:right-0 bg-[#d0b797] space-x-2 text-white p-4 rounded text-xs' onClick={() => setUpload(true)}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span className='font-bold'>Add Tutorial Link</span>
                    </button>
                </section>

                <section>
                    {links.length > 0 ?
                        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">
                            {links.map((item, index) => (
                                <div
                                    key={index}
                                    className=" relative bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300 border border-gray-200"
                                    style={{
                                        clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
                                    }}
                                >
                                    <div className="flex flex-col justify-between h-full space-y-3">
                                        <div className="space-y-1">
                                            <div className='flex justify-between'>
                                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{item.title}</h3>
                                                <button onClick={() => handleDelete(item.timeStamp)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </div>
                                            <p className="text-gray-600 line-clamp-2">{item.description}</p>
                                        </div>

                                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between">
                                            <p className="text-sm text-gray-600">Uploaded By: {item.name}</p>
                                            <button
                                                onClick={() => window.open(item.url, "_blank")}
                                                className="mt-3 sm:mt-0 bg-[#d0b797] text-white px-5 py-2 rounded-md hover:bg-[#857765] transition-colors"
                                            >
                                                Visit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className='w-full p-10'>
                            <img src='./images/link.png' className='mx-auto w-1/3' />
                            <p className='text-center text-gray-700 my-8 font-bold text-2xl'>No Tutorials Available !</p>
                        </div>
                    }
                </section>

                {upload &&
                    <div className='bg-[#f5ebe0] w-full text-black'>

                        <div className="absolute top-20 md:top-0 w-full flex justify-center items-center min-h-screen p-6">
                            <form method="post" onSubmit={handleSubmit(submitLink)} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-[#d0b797]">
                                <div className='flex justify-between py-4'>

                                    <h2 className="text-center text-2xl font-semibold text-[#8a6f47] mb-4">Upload Link</h2>
                                    <div className='cursor-pointer' onClick={() => setUpload(false)}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                </div>
                                {/* Title */}
                                <div className="mb-4">
                                    <label htmlFor="uploadtitle" className="block text-[#8a6f47] font-medium">Title:</label>
                                    <input
                                        type="text"
                                        name="uploadtitle"
                                        id="uploadtitle"
                                        className="w-full p-2 mt-1 border border-[#d0b797] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6f47]"
                                        placeholder="Enter Tutorial Title"

                                        {...register("uploadtitle", { required: "Please Provide Title related to Link" })}
                                    />
                                    {errors.uploadtitle && <p className="text-red-500 text-sm">{errors.uploadtitle.message}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="uploadlink" className="block text-[#8a6f47] font-medium">Link:</label>
                                    <input
                                        type="text"
                                        name="uploadlink"
                                        id="uploadlink"
                                        className="w-full p-2 mt-1 border border-[#d0b797] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6f47]"
                                        placeholder="Enter Tutorial Link"

                                        {...register("uploadlink", {
                                            required: "Please provide a link",
                                            pattern: {
                                                value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(\/[\w\-./?%&=]*)?$/,
                                                message: "Please enter a valid URL"
                                            }
                                        })}
                                    />
                                    {errors.uploadlink && <p className="text-red-500 text-sm">{errors.uploadlink.message}</p>}
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label htmlFor="uploaddescription" className="block text-[#8a6f47] font-medium">Description:</label>
                                    <textarea
                                        rows={4}
                                        name="uploaddescription"
                                        id="uploaddescription"
                                        className="w-full p-2 mt-1 border border-[#d0b797] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6f47]"
                                        placeholder="Enter Tutorial Description"
                                        {...register("uploaddescription", { required: "Please Provide Description related to Link." })}
                                    ></textarea>

                                    {errors.uploaddescription && <p className="text-red-500 text-sm">{errors.uploaddescription.message}</p>}
                                </div>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#8a6f47] text-white py-2 rounded-lg font-semibold hover:bg-[#6d5733] transition"
                                >
                                    {"Upload Link"}
                                </button>


                            </form>
                        </div>
                    </div>}

            </div>
            <Footer />
        </>
    )
}

export default TechTutorial