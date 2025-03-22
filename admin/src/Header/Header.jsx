import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");
        setUserExist(!!token);  // Convert token to boolean directly
    }, []);

    function handleSignOut() {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("id");
        navigate('/');
        window.location.reload();
    }

    return (
        <header className="z-10 flex justify-between items-center px-6 md:px-20 py-6 bg-white shadow">
            {/* Logo */}
            <h1 className="font-bold text-lg md:text-xl">Tech Blogger</h1>

            {/* Desktop Navigation */}
            {userExist && (
                <nav className="hidden lg:flex space-x-7 font-medium text-md">
                    <NavLink to="/" end className={({ isActive }) => 
                        `pb-2 ${isActive ? "border-b-2 border-[#d0b797] text-gray-900" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/contactus" className={({ isActive }) => 
                        `pb-2 ${isActive ? "border-b-2 border-[#d0b797] text-gray-900" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                    }>
                        Contact Us
                    </NavLink>
                    <NavLink to="/techvideos" className={({ isActive }) => 
                        `pb-2 ${isActive ? "border-b-2 border-[#d0b797] text-gray-900" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                    }>
                        Tech Videos
                    </NavLink>
                    <NavLink to="/techpost" className={({ isActive }) => 
                        `pb-2 ${isActive ? "border-b-2 border-[#d0b797] text-gray-900" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                    }>
                        Tech Post
                    </NavLink>
                    <NavLink to="/techtutorials" className={({ isActive }) => 
                        `pb-2 ${isActive ? "border-b-2 border-[#d0b797] text-gray-900" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                    }>
                        Tech Tutorial
                    </NavLink>
                </nav>
            )}

            {/* Sign Out / Register Buttons */}
            {userExist ? (
                <div className="hidden lg:flex space-x-5 font-bold">
                    <button className="cursor-pointer hover:text-gray-600" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="hidden lg:flex space-x-5 font-bold">
                    <button className="cursor-pointer hover:text-gray-600" onClick={() => navigate('/register')}>
                        Create An Account
                    </button>
                </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl">
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="z-20 absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 lg:hidden">
                    {userExist && (
                        <>
                            <NavLink to="/" end className={({ isActive }) => 
                                `pb-2 ${isActive ? "border-b-2 border-[#d0b797]" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                            } onClick={() => setIsOpen(false)}>
                                Home
                            </NavLink>
                            <NavLink to="/contactus" className={({ isActive }) => 
                                `pb-2 ${isActive ? "border-b-2 border-[#d0b797]" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                            } onClick={() => setIsOpen(false)}>
                                Contact Us
                            </NavLink>
                            <NavLink to="/techvideos" className={({ isActive }) => 
                                `pb-2 ${isActive ? "border-b-2 border-[#d0b797]" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                            } onClick={() => setIsOpen(false)}>
                                Tech Videos
                            </NavLink>
                            <NavLink to="/techpost" className={({ isActive }) => 
                                `pb-2 ${isActive ? "border-b-2 border-[#d0b797]" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                            } onClick={() => setIsOpen(false)}>
                                Tech Post
                            </NavLink>
                            <NavLink to="/techtutorials" className={({ isActive }) => 
                                `pb-2 ${isActive ? "border-b-2 border-[#d0b797]" : "hover:border-b-2 hover:border-[#d0b797] hover:text-gray-600"}`
                            } onClick={() => setIsOpen(false)}>
                                Tech Tutorial
                            </NavLink>
                        </>
                    )}
                    <div className="border-t w-full"></div>
                    {userExist ? (
                        <button className="text-lg font-bold cursor-pointer" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    ) : (
                        <button className="text-lg font-bold cursor-pointer" onClick={() => { setIsOpen(false); navigate('/register'); }}>
                            Create An Account
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
