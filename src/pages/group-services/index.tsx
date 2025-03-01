import React from "react";
import styled from "styled-components";
import { DEFAULT_PAGE_SIZE, Direction, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../api/user/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import {setGroup } from "../../redux/actions";
import { GroupServicesPageList } from "./list";
import { removeUndefinedAttribute } from "../../utils";
import { setLoading } from "../../redux/slices/appInfo";
import { getGroups, TGroupResponse, TSearchGroup } from "../../api/services";
import { useGroupServices } from "../../hooks/useGroupServices";

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

export const GroupServicesPage: React.FC = () => {
    const dispatch = useDispatch();

    const groupServices = useSelector(
        (state: RootState) => state.group.data
    );
    const pagination = useSelector(
        (state: RootState) => state.group.pagination
    );
    const {
        filterGroupsParams: filterParams,
        setFilterGroupsParams: setFilterParams,
        keywork,
    } = useGroupServices();
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
        const newSearchPayload: TSearchGroup = {
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
            const { data } = await getGroups(newSearchQueryParams, newSearchPayload);
            const result: TGroupResponse = data;
            dispatch(setGroup(result));
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
        loadData(undefined, undefined);
    } , []);

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <GroupServicesPageList
                        groupServiceList={groupServices}
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
