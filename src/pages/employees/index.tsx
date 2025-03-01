import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEmployee } from "../../hooks/useEmployee";
import { Direction, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../api/user/type";
import { EmployeePageList } from "./list";
import { RootState } from "../../redux/reducers";
import { setEmployee } from "../../redux/actions";

const Wrapper = styled.div``;

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

export const EmployeesPage: React.FC = () => {
    const dispatch = useDispatch();
    const employees = useSelector(
        (state: RootState) => state.employee.data
    );
    const pagination = useSelector(
        (state: RootState) => state.employee.pagination
    );

    const {
        filterEmployeesParams,
        keywork,
        loadEmployees,
    } = useEmployee();
    const [sortData, setSortData] = React.useState<TSortData>({ field: 'CREATED_DATE', order: 'desc' });
    const onChangeSort = React.useCallback((data: TSortData) => {
        setSortData(data);
        const propertyTemp = data.field as SortFieldProperty;
        const property = propertyTemp ? SortFieldPropertyMap[propertyTemp] : undefined;
        const directionTemp = data.order as string;
        const direction = directionTemp ? Direction[directionTemp.toUpperCase() as keyof typeof Direction] : undefined;
        const newParams = {
            ...filterEmployeesParams,
            direction: direction,
            property: property,
            page: 0,
        };
        onLoadData(keywork, newParams);
    }, [filterEmployeesParams, keywork]);

    const onLoadData = React.useCallback(async (searchKeywork: string | undefined, queryParams: SearchQueryParams | undefined) => {
        await loadEmployees(searchKeywork, queryParams);
    }, []);

    const onChangePaging = React.useCallback((values: any) => {
        const searchQueryParams: SearchQueryParams = {
            page: values.page - 1,
            size: pagination?.limit,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.CREATED_DATE,
        };
        onLoadData(keywork, searchQueryParams);
    }, [keywork, pagination]);

    React.useEffect(() => {
        onLoadData(undefined, undefined);
    }, []);

    const onReload = React.useCallback(() => {
        onLoadData(undefined, undefined);
    }, []);

    const onSetEmployeeList = React.useCallback((dataList: any) => {
        dispatch(setEmployee(dataList));
    } , [dispatch])

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <EmployeePageList
                        employeesList={employees}
                        keyword={filterEmployeesParams?.firstName}
                        filterParams={filterEmployeesParams}
                        pagination={pagination}
                        onChangePaging={onChangePaging}
                        onReload={onReload}
                        setEmployeesList={onSetEmployeeList}
                    />
                </SortDataContext.Provider>
            </div>
        </Wrapper>
    )
}
