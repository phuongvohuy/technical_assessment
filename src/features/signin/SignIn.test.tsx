import { AnyAction } from "redux";
import reducer, { STATUS, updateUserInfo, displayLoading } from "./SignInSlice";

test("Test SignIn Slice == Test InitialState", () => {
  const initialState = {
    authoriseStatus: {
      status: STATUS.NORMAL,
      errorMsg: "",
    },
    userInfo: {
      firstName: "",
      lastName: "",
      title: "",
    }
  };

  const notMatchedAction: AnyAction = {
    type: "aaa",
  }

  expect(reducer(undefined, notMatchedAction)).toEqual(initialState);
});

test("Test SignIn Slice === Test Update User Info", () => {
  const previousState = {
    authoriseStatus: {
      status: STATUS.NORMAL,
      errorMsg: "",
    },
    userInfo: {
      firstName: "",
      lastName: "",
      title: "",
    }
  };

  const userInfoValue = {
    firstName: "Phuong",
    lastName: "Vo",
    title: "Mr",
  };
  
  expect(reducer(previousState, updateUserInfo(userInfoValue))).toEqual({
    authoriseStatus: {
      status: STATUS.NORMAL,
      errorMsg: "",
    },
    userInfo: userInfoValue,
  });
})

test("Test SignIn Slice === Test display Loader", () => {
  const previousState = {
    authoriseStatus: {
      status: STATUS.NORMAL,
      errorMsg: "",
    },
    userInfo: {
      firstName: "",
      lastName: "",
      title: "",
    }
  };

  expect(reducer(previousState, displayLoading())).toEqual({
    authoriseStatus: {
      status: STATUS.LOADING,
      errorMsg: "",
    },
    userInfo: {
      firstName: "",
      lastName: "",
      title: "",
    }
  });
})


