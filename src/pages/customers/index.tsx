import React from "react";
import styled from "styled-components";
import { CustomersPageList } from "./list";
import { DEFAULT_PAGE_SIZE, Direction, SearchPayloadUsers, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../api/user/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { setCustomer, setLoading } from "../../redux/actions";
import { SearchParamsStateType, useFilter } from "../../hooks/useFilter";
import { removeUndefinedAttribute } from "../../utils";
import { getCustomers } from "../../api/user";
import { UserResponse } from "./type";

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

export const CustomersPage: React.FC = () => {
    const dispatch = useDispatch();
    const customers = useSelector(
        (state: RootState) => state.customer.data
    );
    const pagination = useSelector(
        (state: RootState) => state.customer.pagination
    );
    const [keywork, setKeywork] = React.useState<string>('');
    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        name: { type: 'string', default: '' },
    }
    const [filterParams, setFilterParams] = useFilter(filtersDefaults);

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
        loadCustomers(keywork, newParams);
    }, [filterParams, keywork]);

    const onChangePaging = React.useCallback((values: any) => {
        const searchQueryParams: SearchQueryParams = {
            page: values.page - 1,
            size: pagination?.limit,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.CREATED_DATE,
        };
        loadCustomers(keywork, searchQueryParams);
    }, [keywork, pagination]);
    
    React.useEffect(() => {
        const queryParams: SearchQueryParams = {
            page: filterParams?.page || 0,
            size: filterParams?.size || DEFAULT_PAGE_SIZE,
            direction: filterParams?.direction || Direction.DESC,
            property: filterParams?.property || SortProperty.CREATED_DATE,
        };
        const newKeywork = filterParams?.name || undefined;
        setKeywork(newKeywork || '');
        loadCustomers(newKeywork, queryParams);
    } , []);

    const onReload = React.useCallback(() => {
        loadCustomers(undefined, undefined);
    } , []);

    const onSetCustomerList = React.useCallback((dataList: any) => {
        dispatch(setCustomer(dataList));
    } , [dispatch]);

    const loadCustomers = React.useCallback(async (
        searchKeywork: string | undefined, 
        queryParams: SearchQueryParams | undefined,
    ) => {
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
        setFilterParams(newPayload);
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
    }, [dispatch, filterParams]);

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <CustomersPageList
                        customerList={customers}
                        setCustomerList={(data) => {
                            onSetCustomerList(data);
                        }}
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
