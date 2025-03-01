import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "../../../pages/customers/type";
import { Direction, SortFieldProperty, SortProperty, SortFieldPropertyMap } from "../../../api/user/type";
import { EStatusGiftCard, TGiftCardEntity, TGiftCardResponse } from "../../../pages/gift-cards/type";
import { uuid } from "../../../utils";

type TGiftCardState = {
  data: TGiftCardEntity[];
  pagination: IPagination;
  statuses?: EStatusGiftCard[];
  code?: string;
};

const initialState = {
  data: [],
  code: "",
  statuses: [],
  pagination: {
    page: 0,
    limit: 0,
    totalPages: 0,
    totalElements: 0,
    direction: Direction.DESC,
    property: SortProperty.DATE_ISSUED,
  },
};

const giftCardSlice = createSlice({
  name: "giftCard",
  initialState,
  reducers: {
    setDataGiftCard: (state: TGiftCardState, action: PayloadAction<TGiftCardEntity[]>) => {
      const contentList = action.payload || [];
      const newData = contentList.map((item) => {
        return {
          ...item,
          uuid: uuid()
        };
      });
      state.data = newData;
    },
    setGiftCard: (state: TGiftCardState, action: PayloadAction<TGiftCardResponse>) => {
        const contentList = action.payload.content || [];
        const newData = contentList.map((item) => {
          return {
            ...item,
            uuid: uuid()
          };
        });
        state.data = newData;
        state.statuses = action.payload.statuses;
        state.code = action.payload.code;
        const pagination: IPagination = {
          page: action.payload.page + 1,
          limit: action.payload.size,
          size: action.payload.size,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          direction: action.payload.direction as Direction,
          property: action.payload.property ? SortFieldPropertyMap[action.payload.property as SortFieldProperty] : SortProperty.DATE_ISSUED,
        };
        state.pagination = pagination;
    }
  },
});

export const { setGiftCard, setDataGiftCard } = giftCardSlice.actions;

export default giftCardSlice.reducer;
