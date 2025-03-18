import { useState, useEffect } from 'react';
import './Profile.css';
import Toolbar from '../components/Home/Toolbar';

const Profile = () => {
  return (
    <div className="profile-page">
      <Toolbar />
      <div className="profile-container">
        <div className="image-box"></div>
      </div>
    </div>
  );
};

export default Profile;
