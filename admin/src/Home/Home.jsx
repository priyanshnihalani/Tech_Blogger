import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllData() {
            try {
                const response = await fetch("http://localhost:3000/alldata");
                const result = await response.json();
                if (response.ok) {
                    setData(result);
                } else {
                    alert(result.message || "Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Something went wrong. Please try again later.");
            }
        }
        fetchAllData();
    }, []);

    const analyticsData = [
        { name: "Tutorials", count: data?.techTutorials || 0 },
        { name: "Posts", count: data?.techPosts || 0 },
        { name: "Videos", count: data?.techVideos || 0 },
        { name: "Users", count: data?.users || 0 },
        { name: "Comments", count: data?.comments || 0 },
    ];

    return (
        <div className={`w-full min-h-screen p-10 space-y-12 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            {/* Header */}
            <div className="flex justify-between items-center my-8">
                <h1 className="text-3xl font-bold">Welcome, Admin</h1>
                <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
                    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/techtutorial')} className="bg-indigo-500 px-4 py-2 rounded text-white hover:bg-indigo-600">📚 Tech Tutorials</button>
                <button onClick={() => navigate('/techpost')} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">➕ New Post</button>
                <button onClick={() => navigate('/techvideos')} className="bg-yellow-500 px-4 py-2 rounded text-white hover:bg-yellow-600">🎥 Upload Video</button>
                <button onClick={() => navigate('/contactus')} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">🚨 Moderate Comments</button>
            </div>

            {/* Live Analytics */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold my-6">📊 Live Analytics</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={analyticsData} barSize={80}>
                        <XAxis dataKey="name" stroke={darkMode ? "#ffffff" : "#000000"} />
                        <YAxis stroke={darkMode ? "#ffffff" : "#000000"} />
                        <Tooltip cursor={{ fill: "#ddd" }} />
                        <Bar dataKey="count" fill="#4a90e2" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Home;