import React from "react";
import { useDispatch } from "react-redux"
import { getCustomers, getNailServices, getNailTechnician } from "../api/user";
import { setLoading } from "../redux/slices/appInfo";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_SERVICES } from "../utils/constants";
import { Direction, SearchPayloadUsers, SearchQueryParams, SortProperty, TNailService } from "../api/user/type";
import { UserEntity, UserResponse } from "../pages/customers/type";
import { setCustomer } from "../redux/slices/customer";

export const useCustomer = () => {
    const dispatch = useDispatch();
    const [nailTechnician, setNailTechnician] = React.useState<UserEntity[]>([]);

    const loadCustomers = React.useCallback(async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const newSearchQueryParamsUsers: SearchQueryParams = queryParams || searchQueryParamsDefault;
        const newSearchKeywork = searchKeywork;
        const searchPayloadUsersTemp: SearchPayloadUsers = {};
        const isNumber = /^\d+$/.test(newSearchKeywork || '');
        if (isNumber) {
            searchPayloadUsersTemp.phoneNumber = newSearchKeywork || undefined;
        } else {
            searchPayloadUsersTemp.name = newSearchKeywork || undefined;
        }
        const newSearchPayloadUsers = { ...searchPayloadUsersTemp };
        dispatch(setLoading(true));
        try {
            const { data } = await getCustomers(newSearchQueryParamsUsers, newSearchPayloadUsers);
            const userResponse: UserResponse = data;
            dispatch(setCustomer(userResponse));
            dispatch(setLoading(false));
        } catch (e) {
            console.error(e);
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const loadNailTechnician = React.useCallback(async (searchKeywork: string | undefined) => {

        let response: UserEntity[] = [];
        const searchQueryParams: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const searchPayloadUsersTemp: SearchPayloadUsers = {
            name: searchKeywork ? searchKeywork.trim() : undefined,
        };
        const newSearchPayloadUsers = { ...searchPayloadUsersTemp };
        try {
            dispatch(setLoading(true));
            const { data } = await getNailTechnician(searchQueryParams, newSearchPayloadUsers);
            const userResponse: UserResponse = data;
            response = userResponse.content || [];
            setNailTechnician(userResponse.content);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
        return response;
    }, [dispatch]);

    const loadNailServices = React.useCallback(async (name: string) => {
        let nailServices: TNailService[] = [];
        const queryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE_SERVICES
        };
        dispatch(setLoading(true));
        try {
            const { data } = await getNailServices(name, queryParams.page, queryParams.size);
            const nailServicesTemp: TNailService[] = data && data.content;
            nailServices = nailServicesTemp;
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
        return nailServices;
    }, [dispatch]);

    return {
        nailTechnician,
        setNailTechnician,
        loadCustomers,
        loadNailTechnician,
        loadNailServices,
    }
}