import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        const response = await fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        
        const result = await response.json()

        if(result.message == "Success!"){
            navigate('/')
            localStorage.setItem('accesstoken', result.accesstoken)
            localStorage.setItem('id', result.id)
            localStorage.setItem('name', result.name)
        }
        else{
            alert(result.message)
        }
    };
    return (
        <>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>

                <div className="rounded-md text-sm font-medium py-4 w-full flex flex-col space-y-4">
                    <div className="py-2 space-y-2">
                        <h1 className="text-bold">Sign In</h1>
                        <p className="text-gray-600 font-normal">
                            Login your password here. After signup, you'll be logged in.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block mt-0">Email</label>
                        <input type="email" name="email" id="email" className="p-2 border  border-gray-300  rounded-md w-full"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block mt-0">Password</label>
                        <input type="password" name="password" id="password" className="p-2 border  border-gray-300  rounded-md w-full"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Must be at least 6 characters" },
                        })}

                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="mt-4 w-1/4 bg-[#23528a] hover:bg-gray-800 text-white font-bold py-3 px-2 rounded ">Sign In</button>
                </div>
            </form>
        </>
    )
}

export default Login;