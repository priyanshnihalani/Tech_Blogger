import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Carousel from "../carousel/Carousel";
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-[#d0b797] relative w-full min-h-screen flex flex-col space-y-0 bg-cover bg-center">

                <Header />


                <section className="bg-white py-20 font-jost">
                    <Carousel />
                </section>

                {/* Features Section */}
                <section className="feature relative py-12 bg-white mx-0 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800">Our Features</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {[
                                { img: "/images/fast_reliable.png", title: "Fast & Reliable", desc: "Enjoy a seamless experience with lightning-fast performance." },
                                { img: "/images/user_friendly.png", title: "User-Friendly", desc: "Designed with simplicity and ease of use in mind." },
                                { img: "/images/secure.png", title: "Secure & Trusted", desc: "Your data and privacy are our top priority." }
                            ].map((feature, index) => (
                                <div key={index} className="p-6 bg-gray-100 rounded-lg text-center space-y-4 max-w-md mx-auto hover:shadow-lg transition duration-300">
                                    <img src={feature.img} alt={feature.title} className="mx-auto h-40 w-40 object-contain" />
                                    <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-gray-50 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {[
                                { name: "John Doe", feedback: "Tech Blogger has transformed the way I explore people worldwide!", image: "/images/user1.jpg" },
                                { name: "Sarah Smith", feedback: "A seamless and faster platform, highly recommended!", image: "/images/user2.jpg" },
                                { name: "Mike Johnson", feedback: "User-friendly and packed with amazing features!", image: "/images/user3.jpg" }
                            ].map((testimonial, index) => (
                                <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-700">{testimonial.name}</h3>
                                    <p className="text-gray-600 mt-2">"{testimonial.feedback}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-white text-black text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                        <p className="mt-4 text-lg text-gray-800">Join Tech Blogging and experience a smarter way to explore!</p>
                        <button className="mt-6 bg-[#d0b797] text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300 cursor-pointer" onClick={() => navigate('/register')}>
                            Sign Up Now
                        </button>
                    </div>
                </section>

                <div className="mt-0 bottom-0 w-full px-0">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Home;
