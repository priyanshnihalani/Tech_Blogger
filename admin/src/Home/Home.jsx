import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Carousel from "../carousel/Carousel";
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className="relative w-full min-h-screen flex flex-col space-y-0 bg-cover bg-center">

                <Header />


                <section className="w-full flex justify-center items-center min-h-screen space-x-8">
                    <img src="./images/welcome.png" alt="welcome" className="w-1/3 h-1/3" />

                    <div className="space-y-6 w-xl">
                        <h1 className="font-bold text-3xl">
                            Welcome To Tech Blogger's Admin Panel.
                        </h1>
                        <p className="text-lg text-justify">
                            Effortlessly manage your tech blog with our all-in-one Admin Panel, designed to give you full control over content, user interactions, and site management. Whether you're uploading engaging articles, videos, or audio posts, this panel ensures a smooth publishing experience.
                        </p>
                        <div className="space-y-2">
                            <span className="py-2">
                                Admins can create, edit, and upload various types of content, including:
                                Content Management Made Easy
                            </span>
                            <ul className="py-2">
                                <li>
                                    ✅ Articles - Write and format detailed tech blogs with images and code snippets.
                                </li>
                                <li>
                                    ✅ Videos - Share tutorials, product reviews, or tech updates in high-quality video format.
                                </li>
                                <li>
                                    ✅ Audio Posts - Upload podcasts or voice notes for your audience.
                                </li>
                            </ul>

                        </div>
                        <p>

                            User & Post Moderation
                            Stay in charge by removing inappropriate or outdated posts and managing user-generated content. The admin panel provides a streamlined way to delete user posts that don't align with your platform's guidelines, ensuring quality and relevance across your blog.</p>
                    </div>
                </section>

                <div className="mt-4 bottom-0 w-full px-0">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Home;
