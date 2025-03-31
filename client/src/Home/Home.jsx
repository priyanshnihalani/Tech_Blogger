import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Carousel from "../carousel/Carousel";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-gray-600 relative w-full min-h-screen flex flex-col space-y-0 bg-cover bg-center">

                <Header />

                {/* Hero Section */}
                {/* Explore Categories Section */}
                <section className="py-16 bg-gray-50 text-center text-[#23528a]">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold">Explore Topics You Love</h2>
                        <p className="text-lg text-gray-700 mt-3">Stay ahead with the latest in technology</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                            {[
                                { icon: "💻", title: "Web Development" },
                                { icon: "🤖", title: "AI & Machine Learning" },
                                { icon: "🔐", title: "Cybersecurity" },
                                { icon: "📱", title: "Mobile App Dev" },
                            ].map((category, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
                                    <span className="text-4xl">{category.icon}</span>
                                    <h3 className="mt-2 font-semibold text-gray-800">{category.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform Stats Section */}
                <section className="py-16 bg-[#23528a] text-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold">Join a Growing Community</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                            {[
                                { number: "10K+", label: "Active Users" },
                                { number: "5K+", label: "Blogs Published" },
                                { number: "100+", label: "Tech Experts" },
                                { number: "50+", label: "Topics Covered" },
                            ].map((stat, index) => (
                                <div key={index} className="p-6 bg-gray-600 rounded-lg shadow-md hover:shadow-xl transition">
                                    <h3 className="text-3xl font-bold">{stat.number}</h3>
                                    <p className="text-lg">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>




                {/* <section className="bg-white py-16">
                    <Carousel />
                </section> */}

                {/* Features Section */}
                <section className="py-16 bg-gray-100 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-[#23528a]">Why Choose Us?</h2>
                        <p className="text-lg text-gray-700 mt-2">Experience the best features designed to enhance your journey.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            {[
                                { icon: "⚡", title: "Fast & Reliable", desc: "Lightning-fast performance for a seamless experience." },
                                { icon: "🎯", title: "User-Friendly", desc: "An intuitive and easy-to-use interface for everyone." },
                                { icon: "🔒", title: "Secure & Trusted", desc: "Your data privacy and security is our top priority." }
                            ].map((feature, index) => (
                                <div key={index} className="p-8 bg-white rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition duration-300 max-w-sm mx-auto">
                                    <div className="text-5xl">{feature.icon}</div>
                                    <h3 className="mt-4 text-2xl font-semibold text-[#23528a]">{feature.title}</h3>
                                    <p className="text-gray-600 mt-2">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Latest Articles */}
                <section className="py-16 bg-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800">Latest Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {[
                                { title: "The Future of AI in 2025", desc: "Explore the latest advancements in Artificial Intelligence.", image: "./images/ai.jpg" },
                                { title: "Web Development Trends", desc: "Top frameworks and libraries you need to know.", image: "./images/webdev.jpg" },
                                { title: "Cybersecurity in 2025", desc: "How to protect your data in the digital age.", image: "./images/cybersecurity.png" }
                            ].map((article, index) => (
                                <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                                    <img src={article.image} alt={article.title} className="mx-auto w-3/4 h-40 rounded" />
                                    <h3 className="text-lg font-semibold text-gray-700 mt-4">{article.title}</h3>
                                    <p className="text-gray-600 mt-2">{article.desc}</p>
                                    <button className="mt-4 text-[#23528a] font-bold hover:underline">Read More</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 bg-gray-50 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                            {[
                                { name: "John Doe", feedback: "Tech Blogger has transformed the way I explore people worldwide!" },
                                { name: "Sarah Smith", feedback: "A seamless and faster platform, highly recommended!" },
                                { name: "Mike Johnson", feedback: "User-friendly and packed with amazing features!" }
                            ].map((testimonial, index) => (
                                <div key={index} className="p-6 bg-white rounded-lg shadow-md text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mt-4">{testimonial.name}</h3>
                                    <p className="text-gray-600 mt-2">"{testimonial.feedback}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-[#23528a] text-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                        <p className="mt-4 text-lg">Join Tech Blogging and experience a smarter way to explore!</p>
                        <button className="mt-6 bg-white text-[#23528a] px-6 py-3 rounded font-bold hover:bg-gray-200 transition duration-300 cursor-pointer" onClick={() => navigate('/register')}>
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