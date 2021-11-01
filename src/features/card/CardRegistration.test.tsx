import { checkFormValid,  CardRegistrationForm } from "./CardRegistrationForm";
import { render, fireEvent } from '@testing-library/react';
import * as reactRedux from 'react-redux'

test("Test Form Validation - Invalid Form - Empty Case", () => {
  const cardNo = "";
  const cvcNo = "123";
  const cardExpiry = "01/01/2001";
  const formValid = checkFormValid(cardNo, cvcNo, cardExpiry);

  expect(formValid).toBeFalsy();
});

test("Test Form Validation - Invalid Form - Not Valid Number", () => {
  const cardNo = "ads";
  const cvcNo = "123";
  const cardExpiry = "01/01/2001";
  const formValid = checkFormValid(cardNo, cvcNo, cardExpiry);

  expect(formValid).toBeFalsy();
});

test("Test Form Validation - Invalid Form - Not valid Date", () => {
  const cardNo = "1234567890";
  const cvcNo = "123";
  const cardExpiry = "aa/";
  const formValid = checkFormValid(cardNo, cvcNo, cardExpiry);

  expect(formValid).toBeFalsy();
})

test("Test Form Validation - Invalid Form - Valid Form", () => {
  const cardNo = "1234567890";
  const cvcNo = "123";
  const cardExpiry = "10/10/2010";
  const formValid = checkFormValid(cardNo, cvcNo, cardExpiry);

  expect(formValid).toBeTruthy();
})

describe('test suite', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  const cardNo = "1234567890";
  const cvcNo = "123";
  const cardExpiry = "10/05/2010";
  const invalidCardExpiry = "aaa";
  
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  })

  test("Test Card Registration Form - Test Disable Submit button when form is valid", () => {
    useSelectorMock.mockReturnValue({
      firstName: "Phuong",
      lastName: "Vo",
      title: "Mr",
    });
    
    const { container,  getByPlaceholderText } = render(<CardRegistrationForm></CardRegistrationForm>);
    const cardNoELement = getByPlaceholderText(/Card Number/i);
    const cvcElement = getByPlaceholderText(/CVC/i);
    const expiryDateElement = getByPlaceholderText(/Expiry Date/i);
  
    if (cardNoELement && cvcElement && expiryDateElement) {
      fireEvent.change(cardNoELement, {target: {value: cardNo}});
      fireEvent.change(cvcElement, {target: {value: cvcNo}});
      fireEvent.change(expiryDateElement, {target: {value: cardExpiry}});
  
      // Check Submit button is enable with valid form
      const enableBtn = container.querySelector("Button:not([disabled])");
      expect(enableBtn).toBeInTheDocument();


      // Check Submit button is disabled with invalid form data
      fireEvent.change(expiryDateElement, {target: {value: invalidCardExpiry}});
      const disabledBtn = container.querySelector("Button[disabled]");
      expect(disabledBtn).toBeInTheDocument();
      
    } else {
      throw new Error('Can not find all element for Card Registration Page');
    }
  });
})



