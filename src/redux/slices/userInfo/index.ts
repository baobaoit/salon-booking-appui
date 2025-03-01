import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiInstance } from "../../../api";
import { User } from "../../../api/user";
import { UserInfo } from "../../../models/user_info";

export type TUserInfo = {
  token?: string;
} & Partial<User> & Partial<UserInfo>;

const initialState: TUserInfo = JSON.parse(
  window.localStorage.getItem("userInfo") || "{}",
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state: TUserInfo, action: PayloadAction<TUserInfo>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        // A little bit of magic to make sure that the state is immutable
        state[key as keyof TUserInfo] = value as any;
      });
      // Merge from local storage
      const localState = JSON.parse(
        window.localStorage.getItem("userInfo") || "{}",
      );
      window.localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...localState, ...state }),
      );

      // Set the token in the axios header
      if (state.token) {
        ApiInstance.setToken(state.token);
      }
    },
    removeUserInfo: () => {
      // ApiInstance.resetToken();
      window.localStorage.removeItem("userInfo");
      return {};
    },
  },
});

export const { setUserInfo, removeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
