import { useContext } from 'react';
import AuthContext from '../store/auth-context';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is your profile, {authCtx.userName}</p>
      <button onClick={authCtx.logout}>Sign Out</button>
    </div>
  );
};

export default Profile;
