import { ApiInstance } from "..";
import { TCustomerCreditSearch } from "../../pages/credit-management/type";
import { convert2QueryString } from "../../utils/convert2QueryString";
import { SearchQueryParams } from "../user/type";

export const searchCustomerCredit = (query: SearchQueryParams, payload: TCustomerCreditSearch) => {
    const requestURL = `/api/v1/customer-credits/search?${convert2QueryString(query)}`;
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const getCustomerCreditDetails = (customerId: string) => {
    const requestURL = `/api/v1/customer-credits/${customerId}`;
    return ApiInstance.getInstance().get(requestURL);
}

export const exportCustomer = () => {
    const requestURL = `/api/v1/customers/report`;
    return ApiInstance.getInstance().post(requestURL, {}, {
        responseType: 'blob',
    });
}
