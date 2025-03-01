import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Direction, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty } from "../../api/user/type";
import { GiftCardsList } from "./list";
import { RootState } from "../../redux/reducers";
import { EStatusGiftCard, TGiftCardSearch } from "./type";
import { useGiftCard } from "../../hooks/useGiftcard";

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

export const GiftCardsPage: React.FC = () => {
    const giftCards = useSelector(
        (state: RootState) => state.gift_card.data
    );
    const pagination = useSelector(
        (state: RootState) => state.gift_card.pagination
    );
    const code = useSelector(
        (state: RootState) => state.gift_card.code
    );
    const statuses = useSelector(
        (state: RootState) => state.gift_card.statuses
    );

    const {
        filterGiftCardParams,
        searchData,
        loadGiftCards,
    } = useGiftCard();

    const [status, setStatus] = React.useState<EStatusGiftCard>();

    const [sortData, setSortData] = React.useState<TSortData>({ field: SortProperty.DATE_ISSUED, order: 'desc' });
    const onChangeSort = React.useCallback((data: TSortData) => {
        setSortData(data);
        const propertyTemp = data.field as SortFieldProperty;
        const property = propertyTemp ? SortFieldPropertyMap[propertyTemp] : undefined;
        const directionTemp = data.order as string;
        const direction = directionTemp ? Direction[directionTemp.toUpperCase() as keyof typeof Direction] : undefined;
        const newParams = {
            ...filterGiftCardParams,
            direction: direction,
            property: property,
            page: 0,
        };
        onLoadData(searchData, newParams);
    }, [filterGiftCardParams, searchData]);

    React.useEffect(() => {
        if (statuses) {
            const newStatus = statuses[0];
            setStatus(newStatus);
        }
    } , [statuses]);

    const onLoadData = React.useCallback(async (searchKeywork: TGiftCardSearch | undefined, queryParams: SearchQueryParams | undefined) => {
        await loadGiftCards(searchKeywork, queryParams);
    }, []);

    const onChangePaging = React.useCallback((values: any) => {
        const searchQueryParams: SearchQueryParams = {
            page: values.page - 1,
            size: pagination?.limit,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.DATE_ISSUED,
        };
        const payload: TGiftCardSearch = {
            code: searchData?.code || '',
            statuses: status ? [status] : [],
        };
        onLoadData(payload, searchQueryParams);
    }, [searchData, status, pagination]);

    React.useEffect(() => {
        const payload: TGiftCardSearch = {
            code: searchData?.code || '',
            statuses: [],
        };
        onLoadData(undefined, undefined);
    }, []);

    const onReload = React.useCallback((payload?: TGiftCardSearch) => {
        const searchQueryParams: SearchQueryParams = {
            page: pagination?.page - 1,
            size: pagination?.limit,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.DATE_ISSUED,
        };
        const newPayload: TGiftCardSearch = {
            code: payload?.code ? payload?.code: (searchData?.code || ''),
            statuses: payload?.statuses ? payload?.statuses : (status ? [status] : []),
        };
        onLoadData(newPayload, searchQueryParams);
    }, [pagination, searchData?.code, status]);

    const onChangeFilter = React.useCallback((values: TGiftCardSearch) => {
        const queryParams = {
            ...filterGiftCardParams,
            page: 0,
        };
        onLoadData(values, queryParams);
    } , [filterGiftCardParams]);

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <GiftCardsList
                        status={status}
                        setStatus={setStatus}
                        onChangeFilter={onChangeFilter}
                        giftCardList={giftCards}
                        keyword={filterGiftCardParams?.code}
                        filterParams={filterGiftCardParams}
                        pagination={pagination}
                        onChangePaging={onChangePaging}
                        onReload={onReload}
                        code={code}
                        statuses={statuses}
                    />
                </SortDataContext.Provider>
            </div>
        </Wrapper>
    )
}
