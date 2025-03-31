import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faLocationArrow, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="shadow bg-gray-600 text-white px-6 py-8 text-center">
            <div className="container mx-auto flex flex-wrap justify-center gap-12 md:justify-between lg:space-x-20">
                
                {/* Tech Blogger Section */}
                <section className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left">
                    <h2 className="text-xl font-bold">Tech Blogger</h2>
                    <p className="mt-4 text-md text-justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sint adipisci non iure excepturi ipsum ullam nostrum laborum sequi tempora!
                    </p>
                    <div className="mt-6 flex justify-center md:justify-start space-x-4">
                        <a href="#" className="bg-white p-3 shadow-md rounded-full text-gray-800 hover:text-black text-2xl"><FaFacebookF /></a>
                        <a href="#" className="bg-white p-3 shadow-md rounded-full text-gray-800 hover:text-black text-2xl"><FaTwitter /></a>
                        <a href="#" className="bg-white p-3 shadow-md rounded-full text-gray-800 hover:text-black text-2xl"><FaInstagram /></a>
                        <a href="#" className="bg-white p-3 shadow-md rounded-full text-gray-800 hover:text-black text-2xl"><FaLinkedinIn /></a>
                    </div>
                </section>

                {/* Contact Info Section */}
                <section className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left">
                    <h2 className="text-xl font-bold">Contact Info</h2>
                    <div className="mt-4 space-y-3 text-md">
                        <p className="flex items-center justify-center md:justify-start space-x-2">
                            <FontAwesomeIcon icon={faLocation} />
                            <span>Apple City 3rd Floor Avadh Web.</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start space-x-2">
                            <FontAwesomeIcon icon={faLocationArrow} />
                            <span>Madhuram, Junagadh</span>
                        </p>
                        <p className="flex items-center justify-center md:justify-start space-x-2">
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+91 7041958565</span>
                        </p>
                    </div>
                </section>

                {/* Support & Download Section */}
                <section className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left">
                    <h2 className="text-xl font-bold">Support & Download</h2>
                    <p className="mt-4 text-md">
                        Download the app for free and enjoy the best experience for desktop and mobile.
                    </p>
                </section>
            </div>

            {/* Footer Bottom */}
            <div className="">
                <p className="text-gray-500">© Copyright Infringement Avadh Web 2025.</p>
            </div>
        </footer>
    );
}

export default Footer;
