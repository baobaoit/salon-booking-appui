import React from "react";
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/slices/appInfo";
import { SearchParamsStateType, useFilter } from "./useFilter";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { Direction, SearchQueryParams, SortProperty } from "../api/user/type";
import { removeUndefinedAttribute } from "../utils";
import { getNailServices, TNailServicesResponse, TSearchNailServices } from "../api/services";
import { setNailServices } from "../redux/actions";

export const useNailServices = () => {
    const dispatch = useDispatch();
    const [keywork, setKeywork] = React.useState<string>('');

    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        name: { type: 'string', default: '' },
        startPrice: { type: 'string', default: '' },
        endPrice: { type: 'string', default: '' },
        priceType: { type: 'string', default: '' },
        groupId: { type: 'string', default: '' },
    }
    const [filterNailServicesParams, setFilterNailServicesParams] = useFilter(filtersDefaults);

    React.useEffect(() => {
        if (filterNailServicesParams?.name) {
            setKeywork(filterNailServicesParams?.name);
        }
    }, [filterNailServicesParams]);

    const loadNailServices = async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const newSearchQueryParams: SearchQueryParams = queryParams || searchQueryParamsDefault;
        const newSearchKeywork = searchKeywork;
        const newSearchPayload: TSearchNailServices = {
            name: newSearchKeywork || '',
        };
        const newParams = {
            ...newSearchQueryParams,
            ...newSearchPayload
        };

        const newPayload = removeUndefinedAttribute(newParams);
        setFilterNailServicesParams(newPayload);
        dispatch(setLoading(true));
        try {
            const { data } = await getNailServices(newSearchQueryParams, newSearchPayload);
            const result: TNailServicesResponse = data;
            dispatch(setNailServices(result));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        keywork,
        filterNailServicesParams,
        setFilterNailServicesParams,
        loadNailServices,
    }
}