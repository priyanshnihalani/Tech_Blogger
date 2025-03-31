import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [userExist, setUserExist] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accesstoken");
        setUserExist(!!token);
    }, []);

    function handleSignOut() {
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("id");
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-center space-x-6 items-center bg-gray-600 text-white py-1">
                <h1 className="font-black text-xl">Tech Blogger</h1>
                <p className="text-sm font-medium">"Empowering Minds, One Tech Story at a Time!" </p>
            </div>
            <header className="z-10 flex justify-between items-center px-6 md:px-20 py-8 bg-white shadow">
                {userExist && (
                    <nav className="text-[#23528a] font-semibold hidden lg:flex space-x-4 text-md">
                        <NavLink to="/" end className={({ isActive }) => `pb-1 ${isActive ? "border-b-4 border-[#23528a] text-gray-900" : "hover:border-b-4 hover:border-[#23528a] hover:text-gray-600"}`}>Home</NavLink>
                        <span>|</span>
                        <NavLink to="/contactus" className={({ isActive }) => `pb-1 ${isActive ? "border-b-4 border-[#23528a] text-gray-900" : "hover:border-b-4 hover:border-[#23528a] hover:text-gray-600"}`}>Contact Us</NavLink>
                        <span>|</span>
                        <NavLink to="/techvideos" className={({ isActive }) => `pb-1 ${isActive ? "border-b-4 border-[#23528a] text-gray-900" : "hover:border-b-4 hover:border-[#23528a] hover:text-gray-600"}`}>Tech Videos</NavLink>
                        <span>|</span>
                        <NavLink to="/techpost" className={({ isActive }) => `pb-1 ${isActive ? "border-b-4 border-[#23528a] text-gray-900" : "hover:border-b-4 hover:border-[#23528a] hover:text-gray-600"}`}>Tech Post</NavLink>
                        <span>|</span>
                        <NavLink to="/techtutorial" className={({ isActive }) => `pb-1 ${isActive ? "border-b-4 border-[#23528a] text-gray-900" : "hover:border-b-4 hover:border-[#23528a] hover:text-gray-600"}`}>Tech Tutorial</NavLink>
                    </nav>
                )}

                {userExist ? <button className="hidden lg:block cursor-pointer font-semibold text-red-600" onClick={handleSignOut}>Signout</button> : <button onClick={() => navigate('/register')} className="hidden lg:block cursor-pointer font-semibold text-red-600">Create An Account</button>}
                <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-2xl">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                {isOpen && (
                    <div className="font-semibold z-20 absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-2 py-6 lg:hidden">
                        {userExist && (
                            <>
                                <NavLink to="/" end className={({ isActive }) => `pb-1 ${isActive ? "border-b-2 border-[#23528a]" : "hover:border-b-2 hover:border-[#23528a] hover:text-gray-600"}`} onClick={() => setIsOpen(false)}>Home</NavLink>
                                <span>|</span>
                                <NavLink to="/contactus" className={({ isActive }) => `pb-1 ${isActive ? "border-b-2 border-[#23528a]" : "hover:border-b-2 hover:border-[#23528a] hover:text-gray-600"}`} onClick={() => setIsOpen(false)}>Contact Us</NavLink>
                                <span>|</span>
                                <NavLink to="/techvideos" className={({ isActive }) => `pb-1 ${isActive ? "border-b-2 border-[#23528a]" : "hover:border-b-2 hover:border-[#23528a] hover:text-gray-600"}`} onClick={() => setIsOpen(false)}>Tech Videos</NavLink>
                                <span>|</span>
                                <NavLink to="/techpost" className={({ isActive }) => `pb-1 ${isActive ? "border-b-2 border-[#23528a]" : "hover:border-b-2 hover:border-[#23528a] hover:text-gray-600"}`} onClick={() => setIsOpen(false)}>Tech Post</NavLink>
                                <span>|</span>
                                <NavLink to="/techtutorial" className={({ isActive }) => `pb-1 ${isActive ? "border-b-2 border-[#23528a]" : "hover:border-b-2 hover:border-[#23528a] hover:text-gray-600"}`} onClick={() => setIsOpen(false)}>Tech Tutorial</NavLink>
                            </>

                        )}
                        {userExist ? <button className="hidden lg:block cursor-pointer font-semibold text-red-600" onClick={() => { handleSignOut, isOpen(false) }}>Signout</button> : <button className="hidden lg:block cursor-pointer font-semibold text-red-600" onClick={() => { navigate('/register'), isOpen(false) }}>Create An Account</button>}
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
