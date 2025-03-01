import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../../api/user/type";
import { TCreditManagement, TCreditManagementResponse } from "./type";

type TCreditManagementState = {
  data: TCreditManagement[];
  pagination: IPagination;
};

const initialState = {
  data: [],
  pagination: {
    page: 0,
    limit: 0,
    totalPages: 0,
    totalElements: 0,
    direction: Direction.DESC,
    property: SortProperty.CREATED_DATE,
  },
};

const creditManagementSlice = createSlice({
  name: "creditManagement",
  initialState,
  reducers: {
    setCreditManagement: (state: TCreditManagementState, action: PayloadAction<TCreditManagementResponse>) => {
      state.data = action.payload.content || [];
        const pagination: IPagination = {
          page: action.payload.page + 1,
          limit: action.payload.size,
          size: action.payload.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          direction: action.payload.direction as Direction,
          property: action.payload.property ? SortFieldPropertyMap[action.payload.property as SortFieldProperty] : SortProperty.CREATED_DATE,
        };
        state.pagination = pagination;
    },
  },
});

export const { setCreditManagement } = creditManagementSlice.actions;

export default creditManagementSlice.reducer;
