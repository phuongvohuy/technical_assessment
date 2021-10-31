import data from "../../mock/user_list.json";

export interface UserApiModel {
  userName: string;
  password: string;
  userInfo: {
    firstName: string;
    lastName: string;
    title: string;
  };
}

export function authorize(userName: string, password: string) {
  return new Promise<any>((resolve, reject) =>
    setTimeout(() => {
      const userList: Array<UserApiModel> = data as Array<UserApiModel>;
      const foundUser = userList.find((item) => item.userName === userName && item.password === password);
      if (foundUser) {
        resolve(foundUser);
      } else {
        reject("wrong username or password");
      }
    }, 2000)
  );
}
