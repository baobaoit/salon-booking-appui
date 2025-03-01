import React from "react";
import styled from "styled-components";
import { Direction, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../api/user/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {setGroup, setNailServices } from "../../redux/actions";
import { NailServicesPageList } from "./list";
import { removeUndefinedAttribute } from "../../utils";
import { setLoading } from "../../redux/slices/appInfo";
import { getGroups, getNailServices, TGroupResponse, TNailServicesResponse, TSearchGroup, TSearchNailServices } from "../../api/services";
import { useNailServices } from "../../hooks/useNailServices";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";

const Wrapper = styled.div`
`;

type TSortData = {
    field?: string;
    order?: 'asc' | 'desc';
}
type TSortDataContext = {
    sortData: TSortData;
    setSortData: (data: TSortData) => void;
}
const SortDataContext = React.createContext<TSortDataContext>({} as TSortDataContext);
export const useSortData = () => React.useContext(SortDataContext);

export const NailServicesPage: React.FC = () => {
    const dispatch = useDispatch();

    const nailServices = useSelector(
        (state: RootState) => state.nail_services.data
    );
    const pagination = useSelector(
        (state: RootState) => state.nail_services.pagination
    );
    const {
        filterNailServicesParams: filterParams,
        setFilterNailServicesParams: setFilterParams,
        keywork,
    } = useNailServices();
    const [sortData, setSortData] = React.useState<TSortData>({ field: 'CREATED_DATE', order: 'desc' });

    const onChangeSort = React.useCallback((data: TSortData) => {
        setSortData(data);
        const propertyTemp = data.field as SortFieldProperty;
        const property = propertyTemp ? SortFieldPropertyMap[propertyTemp] : undefined;
        const directionTemp = data.order as string;
        const direction = directionTemp ? Direction[directionTemp.toUpperCase() as keyof typeof Direction] : undefined;
        const newParams = {
            ...filterParams,
            direction: direction,
            property: property,
            page: 0,
        };
        loadData(keywork, newParams);
    }, [filterParams, keywork]);

    const loadData = React.useCallback(async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
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
        setFilterParams(newPayload);
        dispatch(setLoading(true));
        try {
            const { data } = await getNailServices(newSearchQueryParams, newSearchPayload);
            const result: TNailServicesResponse = data;
            dispatch(setNailServices(result));
            dispatch(setLoading(false));
        } catch (e) {
            console.error(e);
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const onChangePaging = React.useCallback((values: any) => {
        const searchQueryParams: SearchQueryParams = {
            page: values.page - 1,
            size: pagination?.limit,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.CREATED_DATE,
        };
        loadData(keywork, searchQueryParams);
    }, [keywork, pagination]);
    
    React.useEffect(() => {
        loadData(undefined, undefined);
    } , []);

    const onReload = React.useCallback(() => {
        loadData(keywork, undefined);
    } , [keywork]);

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <NailServicesPageList
                        nailServiceList={nailServices}
                        keyword={filterParams?.name}
                        filterParams={filterParams}
                        pagination={pagination}
                        onChangePaging={onChangePaging}
                        onReload={() => onReload()}
                    />
                </SortDataContext.Provider>
            </div>
        </Wrapper>
    )
}
