import React from "react";
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/slices/appInfo";
import { SearchParamsStateType, useFilter } from "./useFilter";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";
import { Direction, SearchQueryParams, SortProperty } from "../api/user/type";
import { removeUndefinedAttribute } from "../utils";
import { TGiftCardResponse, TGiftCardSearch } from "../pages/gift-cards/type";
import { searchGiftCard } from "../api/gift-card";
import { setGiftCard } from "../redux/actions";

export const useGiftCard = () => {
    const dispatch = useDispatch();
    const [searchData, setSearchData] = React.useState<TGiftCardSearch | undefined>(undefined);

    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.DATE_ISSUED },
        code: { type: 'string', default: '' },
        statuses: { type: 'string', default: '' },
    }
    const [filterGiftCardParams, setFilterGiftCardParams] = useFilter(filtersDefaults);

    React.useEffect(() => {
        if (filterGiftCardParams.code) {
            const newParams: TGiftCardSearch = {
                code: filterGiftCardParams.code,
                statuses: filterGiftCardParams.statuses ? filterGiftCardParams.statuses.split(',') : [],
            };
            setSearchData(newParams);
        }
    }, []);

    const loadGiftCards = async (params: TGiftCardSearch | undefined, queryParams: SearchQueryParams | undefined) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.DATE_ISSUED,
        };
        const newSearchQueryParams: SearchQueryParams = queryParams || searchQueryParamsDefault;
        const newSearchPayload: TGiftCardSearch = params || {
            code: filterGiftCardParams.code,
            statuses: filterGiftCardParams.statuses ? filterGiftCardParams.statuses.split(',') : [],
        };
        const newParams = {
            ...newSearchQueryParams,
            ...newSearchPayload,
        };
        // const newPayload = removeUndefinedAttribute(newParams);
        setFilterGiftCardParams(newParams);
        if (newParams.code) {
            setSearchData(newParams);
        }
        dispatch(setLoading(true));
        try {
            const { data } = await searchGiftCard(newSearchQueryParams, newSearchPayload);
            const result: TGiftCardResponse = {
                ...data,
                code: newSearchPayload.code,
                statuses: newSearchPayload.statuses,
            }
            dispatch(setGiftCard(result));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        filterGiftCardParams,
        setFilterGiftCardParams,
        searchData,
        loadGiftCards,
    }
}