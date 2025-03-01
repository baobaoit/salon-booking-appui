import React from "react";
import { useDispatch } from "react-redux"
import { getEmployees } from "../api/user";
import { setLoading } from "../redux/slices/appInfo";
import { SearchParamsStateType, useFilter } from "./useFilter";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { Direction, SearchPayloadUsers, SearchQueryParams, SortProperty } from "../api/user/type";
import { removeUndefinedAttribute } from "../utils";
import { UserEntity, UserResponse } from "../pages/customers/type";
import { setEmployee } from "../redux/slices/employee";

export const useEmployee = () => {
    const dispatch = useDispatch();
    const [keywork, setKeywork] = React.useState<string>('');
    const [employees, setEmployees] = React.useState<UserEntity[]>([]);

    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        name: { type: 'string', default: '' },
    }
    const [filterEmployeesParams, setFilterEmployeesParams] = useFilter(filtersDefaults);

    React.useEffect(() => {
        if (filterEmployeesParams.name) {
            setKeywork(filterEmployeesParams.name);
        }
    }, [filterEmployeesParams]);

    const loadEmployees = async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
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
        const newParams = {
            ...newSearchQueryParamsUsers,
            ...newSearchPayloadUsers
        };

        const newPayload = removeUndefinedAttribute(newParams);
        setFilterEmployeesParams(newPayload);
        dispatch(setLoading(true));
        const employeesTemp: UserEntity[] = [];
        try {
            const { data } = await getEmployees(newSearchQueryParamsUsers, newSearchPayloadUsers);
            const userResponse: UserResponse = data;
            const { content = [] } = userResponse;
            employeesTemp.push(...content);
            setEmployees(employeesTemp);
            dispatch(setEmployee(userResponse));
            return employeesTemp;
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
        return employeesTemp;
    };

    return {
        employees,
        setEmployees,
        filterEmployeesParams,
        keywork,
        loadEmployees,
    }
}