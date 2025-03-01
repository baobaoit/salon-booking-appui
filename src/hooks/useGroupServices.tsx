import React from "react";
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/slices/appInfo";
import { SearchParamsStateType, useFilter } from "./useFilter";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { Direction, SearchQueryParams, SortProperty } from "../api/user/type";
import { removeUndefinedAttribute } from "../utils";
import { getGroups, TGroupResponse, TSearchGroup } from "../api/services";
import { setGroup } from "../redux/actions";

export const useGroupServices = () => {
    const dispatch = useDispatch();
    const [keywork, setKeywork] = React.useState<string>('');

    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        name: { type: 'string', default: '' },
    }
    const [filterGroupsParams, setFilterGroupsParams] = useFilter(filtersDefaults);

    React.useEffect(() => {
        if (filterGroupsParams?.name) {
            setKeywork(filterGroupsParams?.name);
        }
    }, [filterGroupsParams]);

    const loadGroups = async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const newSearchQueryParams: SearchQueryParams = queryParams || searchQueryParamsDefault;
        const newSearchKeywork = searchKeywork;
        const newSearchPayload: TSearchGroup = {
            name: newSearchKeywork || '',
        };
        const newParams = {
            ...newSearchQueryParams,
            ...newSearchPayload
        };

        const newPayload = removeUndefinedAttribute(newParams);
        setFilterGroupsParams(newPayload);
        dispatch(setLoading(true));
        try {
            const { data } = await getGroups(newSearchQueryParams, newSearchPayload);
            const result: TGroupResponse = data;
            dispatch(setGroup(result));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        keywork,
        filterGroupsParams,
        setFilterGroupsParams,
        loadGroups,
    }
}