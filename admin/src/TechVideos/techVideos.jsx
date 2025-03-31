import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { use, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import MyContentLoader from '../Content_Loader/ContentLoader'

function TechVideos() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm();

    const [videos, setVideos] = useState([]);
    const [video, setVideo] = useState("");
    const [addVideo, setAddVideo] = useState(false);
    const [preview, setPreview] = useState("");
    const [thubmnailpreview, setThumbnailPreview] = useState("");
    const selectedFile = watch("uploadvideo");
    let selectedThumbNail = watch("uploadthumbnail");
    const [fileMeta, setFileMeta] = useState(null);
    const [thumbnailfileMeta, setThumbNailFileMeta] = useState(null);
    const [progress, setProgress] = useState(null);
    const videoRef = useRef()
    const streamvideo = useRef()
    const [duration, setDuration] = useState(null);
    const [durationpreview, setDurationPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            console.log(selectedFile)
            const url = URL.createObjectURL(selectedFile[0]);
            setFileMeta(selectedFile[0])
            setPreview(url);
            console.log(url)
        }
    }, [selectedFile]);

    useEffect(() => {
        if (selectedThumbNail && selectedThumbNail.length > 0) {
            const url = URL.createObjectURL(selectedThumbNail[0]);
            setThumbNailFileMeta(selectedThumbNail[0])
            setThumbnailPreview(url);
            console.log(url)
        }
    }, [selectedThumbNail]);



    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
                setDuration(videoRef.current.duration);
                console.log("Video Duration:", videoRef.current.duration, "seconds");
            };
        }
    }, [preview]);

    useEffect(() => {
        if (duration > 180) {
            alert("Provide Video Within in 180 Seconds.")
            videoRef.current = null
            setPreview("");
            selectedThumbNail = null;
            window.location.reload()
        }
        else {
            function convertSeconds(seconds) {
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = (seconds % 60).toFixed(0);
                return `${minutes}:${remainingSeconds}`;
            }
            setDurationPreview(convertSeconds(duration));;
        }
    }, [duration])

    useEffect(() => {
        async function fetchVideosInfo() {
            try {
                const response = await fetch("http://localhost:3000/techvideosinfo");

                const data = await response.json();
                console.log(data)
                if (data.message !== "No videos found") {
                    setVideos(data.videos);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            }

        }
        fetchVideosInfo();
    }, []);


    function handleMouseOver(filename) {
        try {
            setLoading(true)
            setVideo(`http://localhost:3000/techvideos/${filename}`)
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
        finally {
            setLoading(false)
        }
    }

    function handleMouseOut() {
        setVideo("")
    }

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
            formData.append("thumbNail", thumbnailfileMeta);
            formData.append("title", data.uploadtitle);
            formData.append("description", data.uploaddescription)
            formData.append("name", name);
            formData.append("duration", durationpreview);
            const response = await fetch("http://localhost:3000/uploadvideos", {
                method: "POST",
                body: formData
            })

            const result = await response.json();
            console.log(result)
            if (result.message == "Video and thumbnail uploaded successfully!") {
                setAddVideo(false)
                window.location.reload()
                setValue("uploadtitle", "")
                setValue("uploaddescription", "")
                setValue("uploadvideo", "")
            }
            setProgress(result.progress)
        }
    }

    return (
        <>
            <div className='w-full min-h-screen  text-white flex flex-col items-center'>
                {/* Video Add Section */}
                <section className='relative w-full max-w-screen py-6'>
                    <button className='cursor-pointer absolute top-4 sm:top-10 right-5 sm:right-10 bg-[#23528a] space-x-2 text-white p-4 rounded text-xs' onClick={handleAddVideo}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span className='font-bold'> Add Video</span>
                    </button>
                </section>

                {/* Videos Section */}
                {loading ? <MyContentLoader /> :
                    <section className="relative w-full mt-32 md:mt-20 px-6">
                        {videos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-10 w-full">
                                {videos.map((data, index) => (
                                    <div
                                        key={index}
                                        className="cursor-default bg-white rounded overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        {/* Video/Thumbnail Section */}
                                        <div
                                            className="cursor-pointer relative group"
                                            onMouseOver={() => handleMouseOver(data.filename)}
                                            onMouseOut={handleMouseOut}
                                        >
                                            {video === `http://localhost:3000/techvideos/${data.filename}` ? (
                                                <video
                                                    ref={streamvideo}
                                                    src={video}
                                                    controls
                                                    autoPlay
                                                    className="rounded-t w-full h-48 object-cover"
                                                ></video>
                                            ) : (
                                                <>
                                                    <img src={data.thumbnail} className="rounded-t w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75" />
                                                    <p className="bg-black opacity-80 absolute bottom-2 right-2 text-white px-2 rounded-lg text-xs py-1">
                                                        {data.duration}
                                                    </p>
                                                </>
                                            )}
                                        </div>

                                        {/* Video Info Section */}
                                        <div className="p-5 space-y-2">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900 mb-1">{data.title}</h2>
                                            </div>
                                            <div>

                                                <p className="pt-3 border-t-2 line-clamp-2 text-sm text-gray-600 mb-2 font-medium">
                                                    {data.description}
                                                </p>

                                                <p className="font-medium text-sm text-gray-700 flex items-center">
                                                    <span className="text-gray-500">Uploaded By:</span>
                                                    <span className="text-gray-900 ml-1">{data.name}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : (
                            !addVideo && (
                                <div className="flex flex-col items-center text-center space-y-6 py-12">
                                    <img src="./images/techvideos.png" alt="Tech Videos" className="w-[60%] lg:w-[40%] mx-auto" />
                                    <h1 className="text-gray-800 text-2xl font-bold">No Videos Posted Yet</h1>
                                    <p className="text-gray-600">Be the first to upload and share your knowledge!</p>
                                </div>
                            )
                        )}
                    </section>}

            </div>

            {addVideo && (
                <div className='bg-[#23528a] w-full'>

                    <div className="absolute top-0 w-full flex justify-center items-center min-h-screen p-6">
                        <form method="post" onSubmit={handleSubmit(uploadVideo)} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-[#5b8ac3]">
                            <div className='flex justify-between py-4'>

                                <h2 className="text-center text-2xl font-semibold text-[#23528a] mb-4">Upload Video</h2>
                                <div className='cursor-pointer' onClick={() => setAddVideo(false)}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                            {/* Title */}
                            <div className="mb-4">
                                <label htmlFor="uploadtitle" className="block text-[#23528a] font-medium">Title:</label>
                                <input
                                    type="text"
                                    name="uploadtitle"
                                    id="uploadtitle"
                                    className="w-full p-2 mt-1 border border-[#23528a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#23528a]"
                                    placeholder="Enter video title"

                                    {...register("uploadtitle", { required: "Please Provide Title of Video" })}
                                />
                                {errors.uploadtitle && <p className="text-red-500 text-sm">{errors.uploadtitle.message}</p>}
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label htmlFor="uploaddescription" className="block text-[#23528a] font-medium">Description:</label>
                                <textarea
                                    rows={4}
                                    name="uploaddescription"
                                    id="uploaddescription"
                                    className="line-clamp-2 w-full p-2 mt-1 border border-[#23528a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#23528a]"
                                    placeholder="Enter video description"
                                    {...register("uploaddescription", { required: "Please Provide Description of Video" })}
                                ></textarea>

                                {errors.uploaddescription && <p className="text-red-500 text-sm">{errors.uploaddescription.message}</p>}
                            </div>

                            {/* Video Upload */}
                            <div className="mb-4">
                                <label htmlFor="uploadvideo" className="block text-[#23528a] font-medium">Select Video:</label>

                                {/* Custom File Input Button */}
                                <label
                                    htmlFor="uploadvideo"
                                    className="mt-2 block w-full text-center bg-[#23528a] text-white py-2 rounded-lg cursor-pointer hover:bg-[#23528a] transition"
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
                                    <video ref={videoRef} src={preview} controls className="w-full rounded-lg border border-[#23528a] shadow-md"></video>
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="uploadthumbnail" className="block text-[#23528a] font-medium">Select Thumbnail:</label>

                                {/* Custom File Input Button */}
                                <label
                                    htmlFor="uploadthumbnail"
                                    className="mt-2 block w-full text-center bg-[#23528a] text-white py-2 rounded-lg cursor-pointer hover:bg-[#23528a] transition"
                                >
                                    Choose File
                                </label>
                                <input type="file" accept='image/*' name="uploadthumbnail" id="uploadthumbnail" className="hidden"
                                    {...register("uploadthumbnail", { required: "Please Select One Thumbnail" })}
                                />

                                {errors.uploadthumbnail && <p className="text-red-500 text-sm">{errors.uploadthumbnail.message}</p>}
                            </div>

                            {/* Video Preview */}
                            {thubmnailpreview && (
                                <div className="mt-4">
                                    <img src={thubmnailpreview} className="w-full rounded-lg border border-[#23528a] shadow-md" />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#23528a] text-white py-2 rounded-lg font-semibold hover:bg-[#6d5733] transition"
                            >
                                {progress ? `${progress} %` : "Upload"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </>
    )
}

export default TechVideos
