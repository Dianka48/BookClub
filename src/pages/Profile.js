import { useContext } from 'react';
import AuthContext from '../store/auth-context';

import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';

const Profile = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Navigation />
      <Container>
        <h1>Profile Page</h1>
        <p>This is your profile, {authCtx.userName}</p>
        <button onClick={authCtx.logout}>Sign Out</button>
      </Container>
    </div>
  );
};

export default Profile;
