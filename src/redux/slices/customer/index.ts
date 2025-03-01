import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination, UserEntity, UserResponse } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortProperty, SortFieldPropertyMap } from "../../../api/user/type";

type TCustomerState = {
  data: UserEntity[];
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

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setDataCustomer: (state: TCustomerState, action: PayloadAction<UserEntity[]>) => {
      state.data = action.payload;
    },
    setCustomer: (state: TCustomerState, action: PayloadAction<UserResponse>) => {
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
    }
  },
});

export const { setCustomer, setDataCustomer } = customerSlice.actions;

export default customerSlice.reducer;
