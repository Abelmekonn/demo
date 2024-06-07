import React, { useState } from 'react';

function AddEmployee(props) {
    // State for form inputs
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        
        // Collect form data
        const employeeData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
        };
        
        const apiurl = "http://localhost:5555/api/register";

        try {
            // Send data to API
            const response = await fetch(apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employeeData),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Employee added successfully');
                // Reset form fields
                setFirstname('');
                setLastname('');
                setEmail('');
                setPassword('');
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error('Error adding employee:', errorData);
            }
        } catch (error) {
            // Handle network errors
            console.error('Network error:', error);
        }
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
