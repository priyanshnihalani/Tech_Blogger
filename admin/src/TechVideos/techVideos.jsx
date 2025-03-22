import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'

function TechVideos() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();

    const [videos, setVideos] = useState([]);
    const [addVideo, setAddVideo] = useState(false);
    const [preview, setPreview] = useState("");
    const selectedFile = watch("uploadvideo");
    const [fileMeta, setFileMeta] = useState(null)
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            const url = URL.createObjectURL(selectedFile[0]);
            setFileMeta(selectedFile[0])
            setPreview(url);
            console.log(url)
        }
    }, [selectedFile]);


    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch("http://localhost:3000/techvideos");

                const data = await response.json();
                console.log(data)
                if (data.message !== "No videos found") {
                    setVideos(data.videos);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        }

        fetchVideos();
    }, []);

    function handleAddVideo() {
        setAddVideo(true);
    }


    async function uploadVideo(data) {

        const chunkSize = 10 * 1024 * 1024
        const totalChunks = Math.ceil(fileMeta.size / chunkSize)

        const name = localStorage.getItem('name')
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            const start = chunkSize * chunkIndex;
            const end = Math.min(start + chunkSize, fileMeta.size);

            const chunk = fileMeta.slice(start, end)

            const formData = new FormData();
            formData.append("videoChunk", chunk);
            formData.append("chunkIndex", chunkIndex);
            formData.append("totalChunks", totalChunks);
            formData.append("fileName", fileMeta.name);
            formData.append("title", data.uploadtitle);
            formData.append("description", data.uploaddescription)
            formData.append("name", name);

            const response = await fetch("http://localhost:3000/uploadvideos", {
                method: "POST",
                body: formData
            })

            const result = await response.json();
            console.log(result)
            if (result.message == "Video Posted!") {
                setAddVideo(false)
                window.location.reload(),
                setValue("uploadtitle", "")
                setValue("uploaddescription", "")
                setValue("uploadvideo", "")
            }
            setProgress(result.progress)
        }
    }

    async function deleteVideo(id) {
        const response = await fetch("http://localhost:3000/deletevideo", {
            method: "DELETE",
            body: JSON.stringify({id})
        })

        console.log(id)

        const result = await response.json()
        alert(result.message)
    }
    return (
        <>
            <Header />
            <div className='w-full min-h-screen  text-white flex flex-col items-center'>
                {/* Video Add Section */}
                <section className='relative w-full max-w-screen-lg py-6'>
                    <button className='cursor-pointer absolute top-4 sm:top-5 right-5 sm:right-10 bg-[#d0b797] space-x-2 text-white p-4 rounded text-xs' onClick={handleAddVideo}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span className='font-bold'> Add Video</span>
                    </button>
                </section>

                {/* Videos Section */}
                <section className="relative w-full mt-40 md:mt-20 px-4 ">
                    {videos.length > 0 ? (
                        <div className="flex justify-center flex-wrap gap-4 py-6 px-2  w-full">
                            {videos.map((data, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 "
                                >
                                    <div className="relative group">
                                        <video key={index} controls className="rounded-xl w-full h-52 object-cover">
                                            <source src={data.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>

                                    <div className="py-5 px-2">
                                        <div className='flex justify-between'>
                                        <h2 className="text-md font-bold text-gray-900 mb-0">{data.title}</h2>

                                        <button onClick={deleteVideo(data.id)}><FontAwesomeIcon icon={faTrash}/></button>
                                        </div>
                                        <p className="text-gray-600 mb-4 font-medium">{data.description.length > 50 ? data.description.slice(0, 50) + "..." : data.description}</p>
                                        <p className="text-xs font-medium text-gray-700 ">
                                            <span>Uploaded By:</span> {data.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        addVideo || (
                            <div className="flex flex-col items-center space-y-6">
                                <img src="./images/techvideos.png" alt="Tech Videos" className="w-[80%] lg:w-[50%] mx-auto" />
                                <h1 className="text-gray-800 text-center text-2xl font-bold mt-4">No Videos Posted Yet.</h1>
                            </div>
                        )
                    )}
                </section>

            </div>

            {addVideo && (
                <div className='bg-[#f5ebe0] w-full'>

                    <div className="absolute top-0 w-full flex justify-center items-center min-h-screen p-6">
                        <form method="post" onSubmit={handleSubmit(uploadVideo)} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-[#d0b797]">
                            <div className='flex justify-between py-4'>

                                <h2 className="text-center text-2xl font-semibold text-[#8a6f47] mb-4">Upload Video</h2>
                                <div className='cursor-pointer' onClick={() => setAddVideo(false)}>
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
                                    placeholder="Enter video title"

                                    {...register("uploadtitle", { required: "Please Provide Title of Video" })}
                                />
                                {errors.uploadtitle && <p className="text-red-500 text-sm">{errors.uploadtitle.message}</p>}
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label htmlFor="uploaddescription" className="block text-[#8a6f47] font-medium">Description:</label>
                                <textarea
                                    rows={4}
                                    name="uploaddescription"
                                    id="uploaddescription"
                                    className="w-full p-2 mt-1 border border-[#d0b797] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6f47]"
                                    placeholder="Enter video description"
                                    {...register("uploaddescription", { required: "Please Provide Description of Video" })}
                                ></textarea>

                                {errors.uploaddescription && <p className="text-red-500 text-sm">{errors.uploaddescription.message}</p>}
                            </div>

                            {/* Video Upload */}
                            <div className="mb-4">
                                <label htmlFor="uploadvideo" className="block text-[#8a6f47] font-medium">Select Video:</label>

                                {/* Custom File Input Button */}
                                <label
                                    htmlFor="uploadvideo"
                                    className="mt-2 block w-full text-center bg-[#d0b797] text-white py-2 rounded-lg cursor-pointer hover:bg-[#8a6f47] transition"
                                >
                                    Choose File
                                </label>
                                <input type="file" name="uploadvideo" id="uploadvideo" className="hidden"
                                    {...register("uploadvideo", { required: "Please Select One Video" })}
                                />

                                {errors.uploadvideo && <p className="text-red-500 text-sm">{errors.uploadvideo.message}</p>}
                            </div>

                            {/* Video Preview */}
                            {preview && (
                                <div className="mt-4">
                                    <video src={preview} controls className="w-full rounded-lg border border-[#d0b797] shadow-md"></video>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#8a6f47] text-white py-2 rounded-lg font-semibold hover:bg-[#6d5733] transition"
                            >
                                {progress ? `${progress} %` : "Upload"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}

export default TechVideos
