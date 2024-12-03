import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const navigation = useNavigate();


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
           await login(email, password);
              navigation('/');
              toast.success('Logged in successfully');


        } catch (error) {
            console.error('Error logging in:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account? <NavLink to="/register" className="text-blue-500 hover:underline">Register</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;