import { useState, useEffect } from 'react';
import "./SignIn.css";
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from "@mui/material";
import { authorizeThunk, LoadingStatus, retrieveAuthoriseStatusSelector, STATUS } from './SignInSlice';

export function SignInPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loadingStatus: LoadingStatus = useSelector(retrieveAuthoriseStatusSelector);
  const isAuthorisedFailed: boolean = loadingStatus.status === STATUS.FAILED;

  const dispatch = useDispatch();

  // event handler
  const onSubmitHandler = () => {
    dispatch(authorizeThunk({
      userName,
      password,
    }));
  };

  return (
    <div className="signin-page">
      <h2 className="header">Sign In</h2>
      <TextField variant="outlined" label="User Name" value={userName} onChange={(event) => setUserName(event.target.value)}></TextField>
      <TextField variant="outlined" label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}></TextField>
      <div className={isAuthorisedFailed ? "error-text show" : "error-text"}>
        {loadingStatus.errorMsg}
      </div>
      <Button variant="contained" onClick={() => {onSubmitHandler()}}>Login</Button>
    </div>
  )
}