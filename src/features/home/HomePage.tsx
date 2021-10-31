import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveLoginUserInfo, UserInfo } from '../signin/SignInSlice';

export function HomePage() {
  const authorisedUserInfo: UserInfo = useSelector(retrieveLoginUserInfo);
  console.log("authorisedUserInfo ", authorisedUserInfo);
  return (
    <div>
      Home 1
      <div>{authorisedUserInfo.firstName}</div>
      <div>{authorisedUserInfo.lastName}</div>
      <div>{authorisedUserInfo.title}</div>
    </div>
  );
}