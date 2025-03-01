import React from "react";
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/slices/appInfo";
import { SearchParamsStateType, useFilter } from "./useFilter";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { Direction, SearchQueryParams, SortProperty } from "../api/user/type";
import { removeUndefinedAttribute } from "../utils";
import { setCreditManagement } from "../redux/actions";
import { searchCustomerCredit } from "../api/customer-credit";
import { TCustomerCreditSearch } from "../pages/credit-management/type";
import { TCreditManagementResponse } from "../redux/slices/credit_management/type";

export const useCreditManagement = () => {
    const dispatch = useDispatch();
    const [keywork, setKeywork] = React.useState<string>('');

    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        customerName: { type: 'string', default: '' },
    }
    const [filterCreditManagementParams, setFilterCreditManagementParams] = useFilter(filtersDefaults);

    React.useEffect(() => {
        if (filterCreditManagementParams?.customerName) {
            setKeywork(filterCreditManagementParams?.customerName);
        }
    }, [filterCreditManagementParams]);

    const loadCreditData = async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const newSearchQueryParams: SearchQueryParams = queryParams || searchQueryParamsDefault;
        const newSearchKeywork = searchKeywork;
        const newSearchPayload: TCustomerCreditSearch = {
            customerName: newSearchKeywork || '',
        };
        const newParams = {
            ...newSearchQueryParams,
            ...newSearchPayload
        };

        const newPayload = removeUndefinedAttribute(newParams);
        setFilterCreditManagementParams(newPayload);
        dispatch(setLoading(true));
        try {
            const { data } = await searchCustomerCredit(newSearchQueryParams, newSearchPayload);
            const result: TCreditManagementResponse = data;
            dispatch(setCreditManagement(result));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        keywork,
        filterCreditManagementParams,
        setFilterCreditManagementParams,
        loadCreditData,
    }
}