import React, { useState } from 'react';

function AddEmployee(props) {
    // State for form inputs
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        
        // Collect form data
        const employeeData = {
            first_name :firstname,
            last_name:lastname,
            email:email,
            password:password,
        };
        
        // Process form data (e.g., send to API, update parent state, etc.)
        const apiurl="http://localhost:5500/add-employee"

        // Reset form fields (optional)
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">First name:</label><br />
                <input 
                    type="text" 
                    id="fname" 
                    name="fname" 
                    value={firstname} 
                    onChange={event => setFirstname(event.target.value)} 
                /><br />
                <label htmlFor="lname">Last name:</label><br />
                <input 
                    type="text" 
                    id="lname" 
                    name="lname" 
                    value={lastname}
                    onChange={event => setLastname(event.target.value)} 
                /><br />
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
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddEmployee;
