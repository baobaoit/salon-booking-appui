import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppInfo = {
  isShowLoading: boolean;
};

const initialState = {
  isShowLoading: false,
};

const appInfoSlice = createSlice({
  name: "appInfo",
  initialState,
  reducers: {
    setLoading: (state: AppInfo, action: PayloadAction<boolean>) => {
      state.isShowLoading = action.payload;
    },
  },
});

export const { setLoading } = appInfoSlice.actions;

export default appInfoSlice.reducer;
