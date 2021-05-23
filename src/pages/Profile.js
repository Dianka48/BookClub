import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';
import Footer from '../components/Layout/Footer';
import UserProfile from '../components/Profile/UserProfile';

const Profile = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <UserProfile />
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
