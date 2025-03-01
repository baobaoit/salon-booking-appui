import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../../api/user/type";
import { TNailServices, TNailServicesResponse } from "../../../api/services";

type TNailServicesState = {
  data: TNailServices[];
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

const nailServicesSlice = createSlice({
  name: "nail_services",
  initialState,
  reducers: {
    setNailServices: (state: TNailServicesState, action: PayloadAction<TNailServicesResponse>) => {
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

export const { setNailServices } = nailServicesSlice.actions;

export default nailServicesSlice.reducer;
