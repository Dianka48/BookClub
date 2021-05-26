import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';
import Footer from '../components/Layout/Footer';
import UserProfile from '../components/Profile/UserProfile';
import { ReadBooksContextProvider } from '../store/readBooks-context';

const Profile = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <ReadBooksContextProvider>
          <UserProfile />
        </ReadBooksContextProvider>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
