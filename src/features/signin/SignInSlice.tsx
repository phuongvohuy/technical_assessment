import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHistory } from "../../AppUtils";
import { authorize, UserApiModel } from "./SigninAPI";

export enum STATUS {
    NORMAL = "NORMAL",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

export interface LoadingStatus {
    status: STATUS,
    errorMsg: string,
}

export interface SignInInfo {
    userName: string,
    password: string,
}

export interface UserInfo {
    firstName: string,
    lastName: string,
    title: string,
}

export interface SignInState {
    authoriseStatus: LoadingStatus,
    userInfo: UserInfo,
}

const initialState: SignInState = {
    authoriseStatus: {
        status: STATUS.NORMAL,
        errorMsg: "",
    },
    userInfo: {
        firstName: "",
        lastName: "",
        title: "",
    }
}

export const authorizeThunk = createAsyncThunk("user/authorize", async (signInInfo: SignInInfo) => {
    const { userName, password } = signInInfo;
    const postData = await authorize(userName, password);
    return postData;
});

export const signInSlice = createSlice({
    name: "signin",
    initialState: initialState,
    reducers: {
        updateUserInfo: (state: SignInState, payload: PayloadAction<UserInfo>) => {
            state.userInfo = payload.payload;
        },
        displayLoading: (state: SignInState, payload: PayloadAction) => {
            state.authoriseStatus.status = STATUS.LOADING;
        },
        hideLoading: (state: SignInState, payload: PayloadAction) => {
            state.authoriseStatus.errorMsg = STATUS.NORMAL;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(authorizeThunk.pending, (state: SignInState) => {
            state.authoriseStatus.status = STATUS.LOADING;
            state.authoriseStatus.errorMsg = "";
        })
        .addCase(authorizeThunk.fulfilled, (state: SignInState, action) => {
            const userInfoModel: UserApiModel = action.payload as UserApiModel;
            state.authoriseStatus.status = STATUS.SUCCESS;
            state.authoriseStatus.errorMsg = "";

            // update userInfo
            state.userInfo = {
                title: userInfoModel.userInfo.title,
                firstName: userInfoModel.userInfo.firstName,
                lastName: userInfoModel.userInfo.lastName,
            };
            
            setTimeout(() => {
                const history = getHistory();
                history.push("/home");
            }, 500);
        })
        .addCase(authorizeThunk.rejected, (state: SignInState, action: any) => {
            state.authoriseStatus.status = STATUS.FAILED;
            state.authoriseStatus.errorMsg = "User Name or Password is not correct";
        })
    }
});

// export action
export const { updateUserInfo, displayLoading, hideLoading} = signInSlice.actions;

// export signin status
export const retrieveAuthoriseStatusSelector = (state: any) => state.signin.authoriseStatus;
export const retrieveLoginUserInfo = (state: any) => state.signin.userInfo;

export default signInSlice.reducer;