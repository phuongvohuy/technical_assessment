## ASB-coding-test Project purpose

- To build a ReactJS application to allow the user to sign in using mock data. Upon Logging in successfully, users can navigate to see the Card Registration Form, The About Form or to logout to return the sign-in page.
- The application will be responsive when running in different browser resolutions and on mobile.

## Required Tools

- You need to install NodeJs: `https://nodejs.org/en/`

## Run dev server

- Go to the root folder of the project then run `yarn install`.
- Then run `yarn start`, it then starts a dev server.
- Open the browser and use the URL: `http://localhost:4200/` to view the application.

## Run testing

- Go to the root folder and run `yarn test`.

## Application design

- All Components follow the Functional Component way which is recommended by ReactJS.
- All Form controls(Text Fields, Button, and some Icon) in our application is from ReactJs material library(`https://mui.com/`) Which follow the standard material design patterns.
- We use the ReactRouter library(`https://reactrouter.com/`) to handle the routing between pages.
- We use `Redux` library to manage the application state, and we use `Redux-Thunk` to handle the asynchronous API call in pages. We can think of using `Redux-observable` instead of Redux Thunk when the application business logic grows and becomes complicated.
- The way we handle responsiveness is very straightforward. All the screen is horizontal centre on the Desktop. And on Mobile, all the pages take the full width of the device.

- Here are all the component and their description:
  1.  SignIn:
      - Please use the mock username and password under `src\mock\user_list` to login.
  2.  HomePage:
      - This page handles how to display the menu and how to render forms(Card Registration form, About Form).
      - Handle the navigation between Card Registration Form, About Form and Logout.
  3.  Card Registration Form:
      - We implement the form validation in the component. Form Validation rules are as below:
        - All Fields should not empty.
        - The card number should be number and should have a length of 10.
        - The CVC number should be number and should have a length of 3.
        - The Expiry Date should be a valid Date format..
  4.  About Form
      - A static page.

## Unit Test:
- We have some unit Test and Component rendering Test as below:
	* `App.test.tsx`: Unit Test for Application Routing
	* `SignIn.test.tsx`: Unit Test for Redux State for SignIn page.
	* `CardRegistration.test.tsx`: Unit Test for Form Validation, and Test if Submit button is disable or enable base on some form testing data.
