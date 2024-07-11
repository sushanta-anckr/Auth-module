import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import store, { RootState } from '../app/store';
import { loginUser } from '../features/users/userSlice';

// Define a schema for login credentials
// const loginSchema = z.object({
//     username: z.string().min(4, { message: 'Username must be at least 4 characters long' }),
//     password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
// });


const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [formError, setFormError] = useState<string | null>(null);

    const {isAuthenticated} = useSelector((state:RootState)=>state.user)


    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        store.dispatch(loginUser({username,password}))

            // const validatedData = loginSchema.parse({ username, password });
            // console.log('Validated data:', validatedData);

            setFormError(null);
    };

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    })

    return (
        <div className=''>
            <h2 className=' font-bold text-5xl'>Login</h2>
            <form
                className='flex flex-col justify-center items-center h-[70vh]'
                onSubmit={handleLogin}>
                {formError && <div className="text-red-500 mb-2">{formError}</div>}
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='p-4 mb-2'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='p-4 mb-10'
                    />
                </div>
                <button className=' border p-3 w-[32%] ' type="submit">Login</button>
                <Link className='text-blue-500 mt-5' to={'/register'}>New User? Create Account</Link>
            </form>
        </div>
    )
}

export default Login