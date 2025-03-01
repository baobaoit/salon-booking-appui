import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../../api/user/type";
import { TGroup, TGroupResponse } from "../../../api/services";

type TGroupState = {
  data: TGroup[];
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

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setDataGroup: (state: TGroupState, action: PayloadAction<TGroup[]>) => {
      state.data = action.payload;
    },
    setGroup: (state: TGroupState, action: PayloadAction<TGroupResponse>) => {
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

export const { setGroup, setDataGroup } = groupSlice.actions;

export default groupSlice.reducer;
