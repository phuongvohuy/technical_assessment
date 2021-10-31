import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { retrieveLoginUserInfo, UserInfo } from "../signin/SignInSlice";
import "./CardRegistrationForm.css";

export function CardRegistrationForm() {
  const [creditCardNo, setCreditCardNo] = useState("");
  const [cvcNo, setCVCNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const authorisedUserInfo: UserInfo = useSelector(retrieveLoginUserInfo);
  
  // event handler
  const onSubmitHandler = () => {
    console.log("creditCardNo ", creditCardNo, cvcNo, expiryDate);
  }
  //

  return (
    <div className="card-registration-form">
      <div className="mb-50 bold mt-50">
        Welcome {authorisedUserInfo.title} {authorisedUserInfo.firstName} {authorisedUserInfo.lastName}
      </div>
      <div className="card-info">
        <div className="w-full mt-10">
          <TextField className="w-full"
            variant="outlined" label="Credit Card Number" 
            value={creditCardNo} 
            onChange={(event) => setCreditCardNo(event.target.value)}>  
          </TextField>
        </div>
        <div className="w-full mt-10 card-cvc-container">
          <div className="mr-10 card-cvc">
            <TextField  variant="outlined" label="CVC" value={cvcNo} onChange={(event) => setCVCNo(event.target.value)}></TextField>
          </div>
          <div className="card-expiry">
            <TextField  variant="outlined" label="Expiry" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)}></TextField>
          </div>
        </div>
        <div className="w-full mt-10">
          <Button className="w-full"
            variant="contained" onClick={() => {onSubmitHandler()}}>
              Submit
          </Button>
        </div>
      </div>
    </div>
  )
}