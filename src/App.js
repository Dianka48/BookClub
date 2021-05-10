import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/Main';
import Profile from './pages/Profile';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        {!authCtx.isLoggedIn && <Main />}
        {authCtx.isLoggedIn && <Redirect to="/profile" />}
      </Route>

      <Route path="/profile" exact>
        {authCtx.isLoggedIn && <Profile />}
        {!authCtx.isLoggedIn && <Redirect to="/" />}
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
