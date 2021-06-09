import Navigation from '../components/Layout/Navigation';
import Container from '../components/UI/Container';
import Footer from '../components/Layout/Footer';
import UserProfile from '../components/Profile/UserProfile';
import { ReadBooksContextProvider } from '../store/readBooks-context';
import TopReaders from '../components/TopReaders/TopReaders';

/**
 * @returns the user profile page
 */

const Profile = () => {
  return (
    <div>
      <Navigation />
      <ReadBooksContextProvider>
        <Container>
          <UserProfile />
        </Container>
        <TopReaders />
      </ReadBooksContextProvider>
      <Footer />
    </div>
  );
};

export default Profile;
