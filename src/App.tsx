import './App.css';
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import { SignInPage } from './features/signin/SignInPage';
import { HomePage } from "./features/home/HomePage";
import { LoadingStatus, retrieveAuthoriseStatusSelector, STATUS } from './features/signin/SignInSlice';
import { setHistory } from './AppUtils';

function App() {
  const loadingStatus: LoadingStatus = useSelector(retrieveAuthoriseStatusSelector);
  const displayLoader: boolean = loadingStatus.status === STATUS.LOADING;
  const loaderClass: string = displayLoader ? "loader-container show" : "loader-container";

  // set history object so that we can use navigation method in redux
  const history = useHistory();
  setHistory(history);
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <SignInPage></SignInPage>
        </Route>
        <Route exact path="/home">
          <HomePage></HomePage>
        </Route>
      </Switch>
      <div className={loaderClass}>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default App;
