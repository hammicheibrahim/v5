import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    date_of_birth: '',
    profile_picture: null,
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      profile_picture: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('date_of_birth', formData.date_of_birth);
    formDataToSend.append('profile_picture', formData.profile_picture);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/add_user/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      // Handle success
      if (response.data.result === 'Success') {
        alert('User created successfully!');
        // Optionally, you can reset the form fields here
        setFormData({
          first_name: '',
          last_name: '',
          gender: '',
          date_of_birth: '',
          profile_picture: null,
        });
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again later.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" name="profile_picture" onChange={handleFileChange} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
