import React from 'react';
import EnrollButton from '../components/EnrollButton';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      {user && <EnrollButton userId={user.uid} />}
    </div>
  );
};

export default Profile;
