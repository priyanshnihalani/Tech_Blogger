import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faClose } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import './techPosts.css'
import MyContentLoader from '../Content_Loader/ContentLoader'

function TechPosts() {
    const [posts, setPosts] = useState([])
    const [chooseUpload, setChooseUpload] = useState(false);
    const [bgColor, setBgColor] = useState("#fff");
    const [isArticleUploading, setIsArticleUploading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [content, setContent] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileMeta, setFileMeta] = useState(null)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm();

    const selectedFile = watch("uploadphoto");

    useEffect(() => {
        if (selectedFile && selectedFile.length > 0) {
            const url = URL.createObjectURL(selectedFile[0]);
            setFileMeta(selectedFile[0])
            setPreview(url);
            console.log(url)
        }
    }, [selectedFile]);

    useEffect(() => {
        async function fetchPosts() {
            try{
                setLoading(true)
                const response = await fetch('http://localhost:3000/techposts')
                const data = await response.json()
                console.log(data)
                if (data.message !== 'No posts found') {
                    setPosts(data.data)
                }
            }
            catch(error){
                alert(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])



    async function submitArticle(data) {
        const name = localStorage.getItem('name')

        const response = await fetch("http://localhost:3000/uploadpost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ title: data.uploadtitle, description: data.uploaddescription, article: data.uploadarticle, timeStamp: Date.now(), name, bgColor })
        })

        const result = await response.json();
        alert(result.message)

        if (result.message == "Posted!") {
            setIsArticleUploading(false)
            setValue("uploadtitle", "")
            setValue("uploadarticle", "")
            setValue("uploaddescription", "")
            setChooseUpload(false)
        }
    }

    async function submitPhoto(data) {
        const name = localStorage.getItem('name')

        const formData = new FormData();
        formData.append("title", data.uploadtitle)
        formData.append("description", data.uploaddescription);
        formData.append("postImage", fileMeta)
        formData.append("fileName", fileMeta.name);
        formData.append("timeStamp", Date.now())
        formData.append("name", name)

        const response = await fetch("http://localhost:3000/uploadpost", {
            method: "POST",
            body: formData
        })

        const result = await response.json();
        alert(result.message)
        if (result.message == "Posted!") {
            setIsImageUploading(false)
            setValue("uploadtitle", "")
            setValue("uploaddescription", "")
            setValue("uploadphoto", "")
            setChooseUpload(false)
        }
    }

    return (
        <>
            <Header />
            <div className='w-full min-h-screen  text-white flex flex-col items-center'>
                {/* Video Add Section */}
                <section className='relative w-full max-w-screen-lg py-6'>
                    <button className='cursor-pointer absolute top-4 sm:top-5 right-5 lg:right-0 bg-[#d0b797] space-x-2 text-white p-4 rounded text-xs' onClick={() => setChooseUpload(true)}>
                        <FontAwesomeIcon icon={faAdd} />
                        <span className='font-bold'>Add Image or Article</span>
                    </button>
                </section>

                {loading ? <MyContentLoader /> : <section className='flex flex-col items-center lg:flex-row flex-wrap relative w-full lg:w-3/4 xl:w-[100%] mt-32 md:mt-20 px-4'>
                    {posts.length > 0 && !chooseUpload ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-x-2 w-full">
                            {posts.map((item, index) => (
                                <div key={index} className=' bg-white  rounded-lg overflow-hidden py-5 px-2  transition-transform duration-300 hover:scale-105'>
                                    <h2 className='text-lg font-semibold text-gray-900 mb-3'>{item.title}</h2>
                                    {item.url && (
                                        <img src={item.url} alt="Post Image" className='rounded-lg w-full h-50 object-cover' />
                                    )}
                                    {item.article && (
                                        <div className={`folded-paper p-4  rounded-lg w-full h-50 flex items-center justify-center text-white font-medium text-sm shadow-md inset-shadow-emerald-50`} style={{ backgroundColor: item.bgColor }}>
                                            <p className='line-clamp-6 text-center'>{item.article}</p>
                                        </div>
                                    )}
                                    <div className='mt-4'>
                                        <p className="px-2 line-clamp-2 text-gray-600 mb-2 font-medium">
                                            {item.description}
                                        </p>
                                        <p className='px-2 absolute bottom-0 font-medium text-gray-600 text-sm'>
                                            <span className="font-semibold">Uploaded By:</span> {item.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !chooseUpload && (
                            <div className='flex flex-col items-center text-center space-y-8 py-12'>
                                <img src='./images/posts.png' alt='No Posts' className='w-[60%] lg:w-[40%] mx-auto' />
                                <h1 className='text-black text-2xl font-bold'>No Image or Article Posted Yet</h1>
                                <p className='text-gray-600'>Start sharing your thoughts and media with the world!</p>
                            </div>
                        )
                    )}
                </section>}

                {chooseUpload && !isArticleUploading && !isImageUploading ? (
                    <div className='w-full min-h-screen flex justify-center items-baseline pt-20  '>
                        <div className='w-full lg:w-3/4 xl:1/2 flex flex-col md:flex-row justify-center gap-6 bg-white shadow-lg p-6 rounded-lg'>
                            <button className=' cursor-pointer lg:w-1/2 p-4 rounded-lg hover:opacity-80 transition' onClick={() => setIsArticleUploading(true)}>
                                <h1 className='text-black text-center font-semibold'>Upload Article</h1>
                                <img src='./images/article.png' className='w-60 h-60 object-contain' />
                            </button>
                            <button className=' cursor-pointer lg:w-1/2 p-4 rounded-lg hover:opacity-80 transition' onClick={() => setIsImageUploading(true)}>
                                <h1 className='text-black text-center font-semibold'>Upload Image</h1>
                                <img src='./images/imageupload.png' className='w-60 h-60 object-contain' />
                            </button>
                        </div>
                    </div>
                ) : <></>}

            </div>

            {isArticleUploading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 rounded-2xl bg-white shadow-lg my-2 p-6 mx-auto">
                <div className='flex justify-between items-center'>

                    <h2 className="text-xl font-semibold mb-4">Write Your Article</h2>
                    <button className='cursor-pointer' onClick={() => setIsArticleUploading(false)}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(submitArticle)} className="space-y-4">
                    <textarea
                        name="article"
                        id="article"
                        rows={5}
                        className={`w-full focus:outline-none border-2 rounded-xl p-4 ${bgColor == "#fff" ? "text-black" : "text-white"
                            }`}
                        style={{ backgroundColor: bgColor }}
                        placeholder="Article..."
                        {...register("uploadarticle", { required: "Please Provide Article" })}
                    ></textarea>
                    {errors.article && <p className="text-red-500 text-sm">{errors.article.message}</p>}

                    <ul className='flex gap-4'>
                        <li><button type='button' className='border-2 px-2 py-2 rounded-full bg-[#ebb64c]' onClick={() => setBgColor("#ebb64c")}></button></li>
                        <li><button type='button' className='border-2 px-2 py-2 rounded-full bg-[#fff]' onClick={() => {
                            setBgColor("#fff")
                            setContent("black")
                        }}></button></li>
                        <li><button type='button' className='border-2 px-2 py-2 rounded-full bg-[#5ed34b]' onClick={() => {
                            setBgColor("#5ed34b")
                            setContent("black")
                        }}></button></li>
                        <li><button type='button' className='border-2 px-2 py-2 rounded-full bg-[#9548f4]' onClick={() => setBgColor("#9548f4")}></button></li>
                        <li><button type='button' className='border-2 px-2 py-2 rounded-full bg-[#428cd6]' onClick={() => setBgColor("#428cd6")}></button></li>
                    </ul>
                    <input type="text" className='border-2 rounded-lg py-1 px-2 w-full' placeholder='Title...' name='title' id='title'
                        {...register("uploadtitle", { required: "Please Provide Title of Article" })} />
                    {errors.uploadtitle && <p className="text-red-500 text-sm">{errors.uploadtitle.message}</p>}
                    <textarea name="description" id="description" className='w-full border-2 rounded-lg px-2 py-1' placeholder='Description...' rows={4}
                        {...register("uploaddescription", { required: "Please Provide  Description of Article" })}
                    ></textarea>
                    {errors.uploaddescription && <p className="text-red-500 text-sm">{errors.uploaddescription.message}</p>}
                    <button type="submit" className="px-4 py-2 bg-[#d0b797] text-white rounded">
                        Upload Article
                    </button>
                </form>
            </div>}

            {isImageUploading && (
                <div className='bg-[#f5ebe0] w-full'>

                    <div className="absolute top-20 md:top-0 w-full flex justify-center items-center min-h-screen p-6">
                        <form method="post" onSubmit={handleSubmit(submitPhoto)} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-[#d0b797]">
                            <div className='flex justify-between py-4'>

                                <h2 className="text-center text-2xl font-semibold text-[#8a6f47] mb-4">Upload Photo</h2>
                                <div className='cursor-pointer' onClick={() => setIsImageUploading(false)}>
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
                                    placeholder="Enter photo title"

                                    {...register("uploadtitle", { required: "Please Provide Title of Photo" })}
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
                                    placeholder="Enter photo description"
                                    {...register("uploaddescription", { required: "Please Provide Description of Photo" })}
                                ></textarea>

                                {errors.uploaddescription && <p className="text-red-500 text-sm">{errors.uploaddescription.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="uploadphoto" className="block text-[#8a6f47] font-medium">Select Photo:</label>

                                <label
                                    htmlFor="uploadphoto"
                                    className="mt-2 block w-full text-center bg-[#d0b797] text-white py-2 rounded-lg cursor-pointer hover:bg-[#8a6f47] transition"
                                >
                                    Choose File
                                </label>
                                <input type="file" accept="image/*" name="uploadphoto" id="uploadphoto" className="hidden"
                                    {...register("uploadphoto", { required: "Please Select One Photo" })}
                                />

                                {errors.uploadphoto && <p className="text-red-500 text-sm">{errors.uploadphoto.message}</p>}
                            </div>

                            {/* Image Preview */}
                            {preview && (
                                <div className="mt-4">
                                    <img src={preview} controls className="w-full rounded-lg border border-[#d0b797] shadow-md" />
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full mt-4 bg-[#8a6f47] text-white py-2 rounded-lg font-semibold hover:bg-[#6d5733] transition"
                            >
                                {"Upload Photo"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )
}

export default TechPosts;