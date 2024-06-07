import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5555/api/login', { email, password });
            if (response.status === 200) {
                setMessage('Login successful!');
                // Perform any additional actions, such as saving the user data or token
                console.log('User data:', response.data);

                // Redirect to home page
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage('Invalid email or password');
            } else {
                setMessage('An error occurred. Please try again later.');
            }
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onChange={event => setEmail(event.target.value)} 
                /><br />
                <label htmlFor="password">Password:</label><br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={event => setPassword(event.target.value)} 
                /><br /><br />
                <input type="submit" value="Login" />
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
