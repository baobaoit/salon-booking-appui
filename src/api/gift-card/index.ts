import { ApiInstance } from "..";
import { TRedeemGiftCode } from "../../pages/customers/type";
import { TGiftCardBalancesSearch, TGiftCardRequest, TGiftCardSearch } from "../../pages/gift-cards/type";
import { convert2QueryString } from "../../utils/convert2QueryString";
import { SearchQueryParams } from "../user/type";

export const getGiftCode = () => {
    const requestURL = `/api/v1/gift-cards/code`;
    return ApiInstance.getInstance().get(requestURL);
}

export const searchGiftCard = (query: SearchQueryParams, payload: TGiftCardSearch) => {
    const requestURL = `/api/v1/gift-cards/search?${convert2QueryString(query)}`;
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const insertGiftCard = (payload: TGiftCardRequest) => {
    const requestURL = `/api/v1/gift-cards`;
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const updateGiftCard = (id: string, payload: TGiftCardRequest) => {
    const requestURL = `/api/v1/gift-cards/${id}`;
    return ApiInstance.getInstance().put(requestURL, payload);
}

export const getGiftCard = (id: string) => {
    const requestURL = `/api/v1/gift-cards/${id}`;
    return ApiInstance.getInstance().get(requestURL);
}

export const deactivateGiftCard = (id: string) => {
    const requestURL = `/api/v1/gift-cards/${id}/deactivate`;
    return ApiInstance.getInstance().put(requestURL);
}

export const unlinkGiftCard = (id: string, customerId: string) => {
    const requestURL = `/api/v1/gift-cards/${id}/unlink/${customerId}`;
    return ApiInstance.getInstance().put(requestURL);
}

export const redeemGiftCard = (id: string, customerId: string) => {
    const requestURL = `/api/v1/gift-cards/${id}/redeem/${customerId}`;
    return ApiInstance.getInstance().put(requestURL);
}

export const getGiftCardBalance = (customerId: string) => {
    const requestURL = `/api/v1/gift-card-balances/${customerId}/latest`;
    return ApiInstance.getInstance().get(requestURL);
}

export const redeemGiftCode = (customerId: string, payload: TRedeemGiftCode) => {
    const requestURL = `/api/v1/gift-card-balances/${customerId}/redeem-gift-code`;
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const searchGiftCardBalance = (query: SearchQueryParams, payload: TGiftCardBalancesSearch) => {
    const requestURL = `/api/v1/gift-card-balances/search?${convert2QueryString(query)}`;
    return ApiInstance.getInstance().post(requestURL, payload);
}