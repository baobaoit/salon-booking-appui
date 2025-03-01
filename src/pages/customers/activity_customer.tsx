import React from "react";
import {Row, Table } from "antd";
import { IPagination, TGiftCardBalances, TRedeemGiftCode, UserEntity } from "./type";
import classNames from "classnames";
import { getGiftCardBalance, redeemGiftCode, searchGiftCardBalance } from "../../api/gift-card";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { Direction, SearchQueryParams, SortProperty } from "../../api/user/type";
import { TGiftCardBalancesSearch } from "../gift-cards/type";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import type { ColumnsType } from 'antd/es/table';
import { formatLocaleDateTimeString, formatNumberNoneCurrency, uuid } from "../../utils";
import { BookingPagination } from "../../components/pagination";
import { BookingButton } from "../../components/button";
import { ReloadOutlined, RightOutlined } from "@ant-design/icons";
import { BookingInput } from "../../components/form/input";
import { useNotification } from "../../hooks/useNotification";
import styled from "styled-components";

const WrapperTable = styled.div`
    .ant-table-thead >tr>th {
        // background-color: white;
    }
    .data-row:nth-child(odd) {
        background-color: #F7F8FA;
    }
    .ant-table-column-sorters .ant-table-column-sorter-inner {
        .anticon {
            display: none;
        }
    }
`;

type ActivityCustomerProps = {
    customerSelected: UserEntity;
}

export const ActivityCustomer: React.FC<ActivityCustomerProps> = ({
    customerSelected
}) => {
    const dispatch = useDispatch();
    const { showError, showSuccess } = useNotification();
    const [data, setData] = React.useState<TGiftCardBalances[]>([])
    const [pagination, setPagination] = React.useState<IPagination | null>(null);
    const [balance, setBalance] = React.useState<number>(0);
    const [giftCode, setGiftCode] = React.useState<string>("");
    const [openRedeem, setOpenRedeem] = React.useState<boolean>(false);

    const loadBalance = React.useCallback(async (customerIdTemp: string) => {
        dispatch(setLoading(true));
        try {
            const { data } = await getGiftCardBalance(customerIdTemp);
            setBalance(data?.balance || 0);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const onLoadData = React.useCallback(async (queryParams?: SearchQueryParams) => {
        const searchQueryParamsDefault: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        try {
            const newQueryParams = queryParams || searchQueryParamsDefault;
            const payload: TGiftCardBalancesSearch = {
                customerId: customerSelected.id,
            };
            dispatch(setLoading(true));
            const response = await searchGiftCardBalance(newQueryParams, payload);
            dispatch(setLoading(false));
            if (response.status === 200) {
                const result: TGiftCardBalances[] = response.data.content;
                const newData = result.map((item, index) => {
                    return {
                        ...item,
                        uuid: uuid(),
                    }
                });
                setData(newData);
                setPagination({
                    page: response.data.page + 1,
                    limit: response.data.size,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements,
                    direction: response.data.direction as Direction,
                    property: response.data.property as SortProperty,
                });
            }
        } catch (error) {
            dispatch(setLoading(false));
        }
    }, [dispatch, customerSelected]);

    React.useEffect(() => {
        onLoadData();
        if (customerSelected.id) {
            loadBalance(customerSelected.id);
        }
    }, []);


    const columns: ColumnsType<TGiftCardBalances> = [
        {
            title: 'Date', dataIndex: 'date', key: 'date',
            width: 160,
            render: (value, record) => {
                return formatLocaleDateTimeString(value);
            }
        },
        {
            title: 'Description', dataIndex: 'description', key: 'description',
            render: (value, record) => {
                return value;
            }
        },
        {
            title: 'Amount', dataIndex: 'amount', key: 'amount',
            width: 150,
            render: (value, record) => {
                return formatNumberNoneCurrency(value);
            }
        },
        {
            title: 'Closing balance', dataIndex: 'closingBalance', key: 'closingBalance',
            width: 150,
            render: (value, record) => {
                return formatNumberNoneCurrency(value);
            }
        },
    ];

    const onChangePaging = React.useCallback((page: number) => {
        const searchQueryParams: SearchQueryParams = {
            page: page - 1,
            size: pagination?.limit || DEFAULT_PAGE_SIZE,
            direction: pagination?.direction as Direction,
            property: SortProperty.CREATED_DATE,
        };
        onLoadData(searchQueryParams);
    }, [customerSelected, pagination]);

    const onRedeemGiftCode = React.useCallback(async () => {
        if (!giftCode) {
            showError('Error', 'Please enter gift code');
            return;
        }
        try {
            dispatch(setLoading(true));
            const payload: TRedeemGiftCode = {
                giftCode,
            };
            const result = await redeemGiftCode(customerSelected?.id, payload);
            if (result?.data?.balance) {
                showSuccess('Success', 'Redeem gift code successfully');
                setGiftCode("");
                setBalance(result.data.balance);
                setOpenRedeem(false);
                onLoadData();
            }
        } catch (e: any) {
            const errorMessage = e.response?.data?.detail;
            showError('Error', errorMessage || 'An error occurred');
        } finally {
            dispatch(setLoading(false));
        }
    } ,[dispatch, giftCode, customerSelected, showSuccess, setBalance, showError]);

    return <div className="flex flex-col gap-[15px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full">
            <div className="flex flex-col w-full gap-2 border border-[#E2E4EB] rounded-md p-[12px]">
                <h4 className="text-title-semi-bold">
                    Your Gift Card Balance: ${formatNumberNoneCurrency(balance)}
                </h4>
                <div className="flex gap-3 min-h-[34px]">
                    <div>
                        <BookingButton 
                            onClick={() => {
                                loadBalance(customerSelected.id);
                            }}
                            className="ml-4"
                            btnType="warning"
                            btnSize="xs"
                            style={{
                                height: "34px",
                            }}
                            icon={<ReloadOutlined />}
                            iconPosition="start"
                        >
                            Reload Your Balance
                        </BookingButton>
                    </div>
                    <div className="flex gap-[20px]">
                        <BookingButton 
                            className="ml-4"
                            btnType="sub_info"
                            btnSize="xs"
                            iconPosition="end"
                            onClick={() => setOpenRedeem(prev => !prev)}
                            icon={<RightOutlined />}
                        >
                            Redeem a Gift Card
                        </BookingButton>
                        {openRedeem && <div className="flex gap-[10px] w-full">
                                <BookingInput textSize="md" 
                                    value={giftCode}
                                    style={{
                                        width: "200px",
                                        height: "34px",
                                    }}
                                    onChange={(e) => setGiftCode(e.target.value)}
                                    placeholder="Gift card or promotion code or voucher" />
                                <div>
                                    <BookingButton type="primary" 
                                        onClick={onRedeemGiftCode}
                                        btnSize="sm" style={{
                                            height: "34px",
                                        }}>
                                        Apply
                                    </BookingButton>
                                </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        <div className="flex w-full">
            <h4 className="text-title-semi-bold">
                Gift Card Activity
            </h4>
        </div>
        <WrapperTable className="flex flex-col gap-3 w-full">
            <Table
                className={classNames("white-header w-full")}
                rowClassName="cursor-pointer data-row"
                rowKey={(record) => record.uuid}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            {pagination && pagination.totalPages > 1 && <Row gutter={16}
                style={{
                    margin: 0,
                }}
                className="grid items-center justify-end w-full bg-white p-[16px]">
                <BookingPagination
                    onChange={onChangePaging}
                    defaultCurrent={pagination?.page}
                    defaultPageSize={pagination?.limit}
                    total={pagination?.totalElements}
                    currentPage={pagination?.page}
                    showSizeChanger={false}
                />
            </Row>}
        </WrapperTable>
    </div>
}
