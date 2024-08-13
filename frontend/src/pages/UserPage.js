import React, { useState, useEffect } from 'react';
import './UserPage.css';
import defaultProfileImage from '../images/user3.png'; // Adjust the path as needed
import axios from 'axios'; // Ensure axios is installed or use fetch API

const UserPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your API endpoint
        const { firstName, lastName, bio, profileImage } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setBio(bio);
        setProfileImage(profileImage || defaultProfileImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('bio', bio);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      await axios.put('/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); // Replace with your API endpoint
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-page">
      <div className="rectangle-container">
        <div className="profile-image-container">
          <img
            src={profileImage || defaultProfileImage}
            alt="Profile"
            className="profile-image"
          />
          <label htmlFor="file-upload" className="image-upload-label">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
            <span className="upload-icon">+</span>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
