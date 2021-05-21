import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Books from './pages/Books';

import Main from './pages/Main';
import Profile from './pages/Profile';
import AuthContext from './store/auth-context';
import BookDetail from './pages/BookDetail';
import ReadingBenefits from './pages/ReadingBenefits';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/books" exact>
        <Books />
      </Route>
      <Route path="/books/:bookId" exact>
        <BookDetail />
      </Route>
      <Route path="/profile" exact>
        {authCtx.isLoggedIn && <Profile />}
        {!authCtx.isLoggedIn && <Redirect to="/" />}
      </Route>
      <Route path="/reading-benefits" exact>
        <ReadingBenefits />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
