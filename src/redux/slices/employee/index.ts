import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination, UserEntity, UserResponse } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../../api/user/type";

type TEmployeeState = {
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

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setDataEmployee: (state: TEmployeeState, action: PayloadAction<UserEntity[]>) => {  
      state.data = action.payload;
    },
    setEmployee: (state: TEmployeeState, action: PayloadAction<UserResponse>) => {
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

export const { setEmployee, setDataEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
