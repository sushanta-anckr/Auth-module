import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import store from "../app/store";
import { registerUser } from "../features/users/userSlice";

// const regSchema = z.object({
//     name:z.string().min(4,{message:"Name must be atleast 6 charaters"})
//     email:z.string().min()
// })

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
   store.dispatch(registerUser({username,password}))
   
  };

  return (
    <div className="">
      <h2 className=" font-bold text-5xl">Register</h2>
      <form
        className="flex flex-col justify-center items-center h-[70vh]"
        onSubmit={handleRegister}
      >
        <div>
          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-4 mb-2"
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 mb-10"
          />
        </div>
        <button className=" border p-3 w-[32%] " type="submit">
          Register
        </button>
        <Link className="text-blue-500 mt-5" to={"/login"}>
          Already have an account? Login here.
        </Link>
      </form>
    </div>
  );
};

export default Register;
