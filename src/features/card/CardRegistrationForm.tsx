import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import moment from 'moment';

import { retrieveLoginUserInfo, UserInfo } from "../signin/SignInSlice";
import "./CardRegistrationForm.css";

export const checkFormValid = (cardNo: string, cvc: string, cardExpiry: string): boolean => {
  const isAtLeastOneEmpty: boolean = !cardNo || !cvc || !cardExpiry;
  const isCardExpireValid = moment(new Date(cardExpiry)).isValid();

  const cardNoLengthValid: boolean = cardNo.length === 10;
  const cvcNoLengthValid: boolean = cvc.length === 3;

  const cardNoValidNo: boolean = !isNaN(cardNo as any);
  const cvcValidNo: boolean = !isNaN(cvc as any);

  const cardValid: boolean = cardNoValidNo && cardNoLengthValid;
  const cvcValid: boolean = cvcValidNo && cvcNoLengthValid;  

  return !isAtLeastOneEmpty && cardValid && cvcValid &&  isCardExpireValid;
}

export function CardRegistrationForm() {
  const [creditCardNo, setCreditCardNo] = useState("");
  const [cvcNo, setCVCNo] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const authorisedUserInfo: UserInfo = useSelector(retrieveLoginUserInfo);

  const isFormValid: boolean = checkFormValid(creditCardNo, cvcNo, expiryDate);
  
  // event handler
  const onSubmitHandler = () => {
    const cardExpiryDate = moment(new Date(expiryDate)).format("DD/MM/YYYY");
    console.log("Card Information >> Card Number ", creditCardNo);
    console.log("Card Information >> CVC Number ", cvcNo);
    console.log("Card Information >> Card Expiry ", cardExpiryDate);
  }

  return (
    <div className="card-registration-form">
      <div className="mb-50 bold mt-50">
        Welcome {authorisedUserInfo.title} {authorisedUserInfo.firstName} {authorisedUserInfo.lastName}
      </div>
      <div className="card-info">
        <div className="w-full mt-10">
          <TextField className="w-full"
            placeholder="Card Number" 
            variant="outlined" label="Credit Card Number" type="number"
            value={creditCardNo} 
            onChange={(event) => setCreditCardNo(event.target.value)}>  
          </TextField>
        </div>
        <div className="w-full mt-10 card-cvc-container">
          <div className="mr-10 card-cvc">
            <TextField
              placeholder="CVC"  
              variant="outlined" label="CVC" type="number"
              value={cvcNo} 
              onChange={(event) => setCVCNo(event.target.value)}>
            </TextField>
          </div>
          <div className="card-expiry">
            <TextField  placeholder="Expiry Date" variant="outlined" label="Expiry" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)}></TextField>
          </div>
        </div>
        <div className="w-full mt-10">
          <Button className="w-full" disabled={!isFormValid}
            variant="contained" onClick={() => {onSubmitHandler()}}>
              Submit
          </Button>
        </div>
      </div>
    </div>
  )
}