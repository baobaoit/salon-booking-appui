import { Descriptions, Modal, Row, Skeleton, Table } from "antd"
import { ColumnType, ColumnsType } from "antd/lib/table";
import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { BookingPagination } from "../../components/pagination";
import { ICSort, ICNoneData, ICEye } from "../../icons";
import { SortOrder } from "antd/lib/table/interface";
import { useSortData } from ".";
import styled from 'styled-components';
import { IPagination } from "../customers/type";
import { TCreditManagement, TCustomerCredit } from "../../redux/slices/credit_management/type";
import { BookingTooltip } from "../../components/tooltip";
import { BookingButton, IconButton } from "../../components/button";
import { getCustomerCreditDetails } from "../../api/customer-credit";
import type { DescriptionsProps } from 'antd';
import { formatLocaleDateTimeString, formatNumber, formatNumberNoneCurrency } from "../../utils";

const ActionMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
    &:hover {
        background-color: #F7F8FA;
    }
    button {
        padding: 0 !important;
    }
`;

const WrapperTable = styled.div`
    .ant-table-thead >tr>th {
        background-color: white;
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

const TitleRenderer: React.FC<{ title: string }> = ({ title }) => {
    const keyword = React.useContext(KeywordContext);

    return <Highlighter
        highlightClassName="text-highlight"
        searchWords={[`${keyword || ''}`]}
        autoEscape={true}
        className="text-body text-high-em"
        textToHighlight={title || ''}
    />
}
type SortableColumnProps = {
    title: string;
    order?: SortOrder;
    name: string;
}
const SortableColumn: React.FC<SortableColumnProps> = ({
    title,
    order,
    name
}) => {
    const { setSortData } = useSortData();
    return <div className="flex space-x-3 items-center justify-between select-none group" onClick={() => {
        setSortData({
            field: order === 'descend' ? 'createdDate' : name,
            order: order === 'descend' ? 'desc' : !order ? 'asc' : 'desc',
        });
    }}>
        <span className="text-body-bold text-high-em">{title as string}</span>
        <ICSort order={order} />
    </div>
}

type CreditManagementListProps = {
    creditList: TCreditManagement[];
    keyword?: string;
    pagination?: IPagination;
    onChangePaging: ({ page }: { page: number }) => void;
}
const KeywordContext = React.createContext<string>('');

export const CreditManagementPageList: React.FC<CreditManagementListProps> = ({
    creditList = [],
    keyword,
    pagination,
    onChangePaging,
}) => {
    const [customerCreditDetails, setCustomerCreditDetails] = React.useState<TCustomerCredit | null>(null);
    const [showCustomerCreditDialog, setShowCustomerCreditDialog] = React.useState<boolean>(false);
    const [openActivityCustomer, setOpenActivityCustomer] = React.useState<boolean>(false);
    const [creditSelected, setCreditSelected] = React.useState<TCreditManagement | null>(null);

    const items = React.useMemo(() => {
        if (!customerCreditDetails) return [
            {
                label: 'Customer Name',
                span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
                children: <Skeleton.Input active />,
            },
            {
                label: 'Available Credit',
                children: <Skeleton.Input active />,
            },
            {
                label: 'Total Credit',
                span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
                children: <Skeleton.Input active />,
            },
            {
                label: 'Available Gift Card',
                span: { xl: 2, xxl: 2 },
                children: <Skeleton.Input active />,
            },
            {
                label: 'Redeemed Gift Card',
                span: { xl: 2, xxl: 2 },
                children: <Skeleton.Input active />,
            },
            {
                label: 'Total No Gift Card',
                children: <Skeleton.Input active />,
            },
            {
                label: 'Last Modified Date',
                span: { xl: 2, xxl: 2 },
                children: <Skeleton.Input active />,
            },
        ];
        return [
            {
                label: 'Customer Name',
                span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
                children: customerCreditDetails.customerName,
            },
            {
                label: 'Available Credit',
                children: formatNumberNoneCurrency(customerCreditDetails.availableCredit),
            },
            {
                label: 'Total Credit',
                span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
                children: formatNumberNoneCurrency(customerCreditDetails.totalCredit),
            },
            {
                label: 'Available Gift Card',
                span: { xl: 2, xxl: 2 },
                children: formatNumberNoneCurrency(customerCreditDetails.availableNoGiftCard),
            },
            {
                label: 'Redeemed Gift Card',
                span: { xl: 2, xxl: 2 },
                children: formatNumberNoneCurrency(customerCreditDetails.redeemNoGiftCard),
            },
            {
                label: 'Total Gift Card',
                children: formatNumberNoneCurrency(customerCreditDetails.totalNoGiftCard),
            },
            {
                label: 'Last Modified Date',
                span: { xl: 2, xxl: 2 },
                children: (
                    <>
                        {formatLocaleDateTimeString(customerCreditDetails.lastModifiedDate)}
                    </>
                ),
            },
        ] as DescriptionsProps['items'];
    } , [customerCreditDetails]);

    const onChangePage = (page: number) => {
        onChangePaging({ page })
    };

    const onLoadCustomerCreditDetail = async (customerId: string) => {
        try {
            const { data } = await getCustomerCreditDetails(customerId);
            const result: TCustomerCredit = data;
            setCustomerCreditDetails(result);
        } catch (e) {
            console.error(e)
        }
    }

    const columns: ColumnsType<TCreditManagement> = [
        {
            title: 'No',
            dataIndex: 'customerId',
            field: 'customerId',
            key: 'customerId',
            width: '40px',
            sorter: true,
            render: (val: string, record: TCreditManagement, index: number) => {
                return <div className="flex flex-col gap-1">
                    {index + 1}
                </div>
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            field: 'customerName',
            key: 'customerName',
            sorter: true,
        },
        {
            title: 'Available Credit',
            dataIndex: 'availableCredit',
            field: 'availableCredit',
            key: 'availableCredit',
            sorter: true,
            render: (val: any) => {
                return <div className="flex flex-col gap-1">
                    {formatNumberNoneCurrency(val)}
                </div>
            },
        },
        {
            title: 'Total Credit',
            dataIndex: 'totalCredit',
            field: 'totalCredit',
            key: 'totalCredit',
            sorter: true,
            render: (val: any) => {
                return <div className="flex flex-col gap-1">
                    {formatNumberNoneCurrency(val)}
                </div>
            },
        },
        {
            title: 'Available Gift Card',
            dataIndex: 'availableNoGiftCard',
            field: 'availableNoGiftCard',
            key: 'availableNoGiftCard',
            sorter: true,
            render: (val: any) => {
                return <div className="flex flex-col gap-1">
                    {formatNumberNoneCurrency(val)}
                </div>
            },
        },
        {
            title: 'Redeemed Gift Card',
            dataIndex: 'redeemNoGiftCard',
            field: 'redeemNoGiftCard',
            key: 'redeemNoGiftCard',
            sorter: true,
            render: (val: any) => {
                return <div className="flex flex-col gap-1">
                    {formatNumberNoneCurrency(val)}
                </div>
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: TCreditManagement) => {
                return <ActionMenu key={_id}>
                    <BookingTooltip content="View Credit Customer"
                        childNode={
                            <IconButton icon={<ICEye />} btnType="tertiary" onClick={() => {
                                setCreditSelected(data);
                                onLoadCustomerCreditDetail(data.customerId);
                                setShowCustomerCreditDialog(true);
                            }} />
                        }>
                    </BookingTooltip>
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<TCreditManagement>) => {
        if (col.sorter) {
            const oldTitle = col.title;
            col.title = ({ sortColumns }) => {
                const sortedColumn = sortColumns?.find(({ column }) => column.key === col.key);
                return <SortableColumn
                    title={oldTitle as string}
                    order={sortedColumn?.order}
                    name={col.dataIndex as string}
                />
            }
        } else {
            col.title = <div className="text-body-bold text-high-em">{col.title as string}</div>;
        }
        col.showSorterTooltip = false;
        return col;
    });

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full px-[12px] py-[20px] shadow-e-03 items-center justify-between bg-white rounded-[12px]">
            <div className="flex gap-3 items-center justify-end">
            </div>
            <div>
            </div>
        </div>
        <div className="flex flex-col w-full h-full bg-white rounded-[12px] overflow-hidden shadow-e-03">
            <KeywordContext.Provider value={keyword ?? ''}>
                <Table
                    key="customerId"
                    className={classNames("white-header w-full")}
                    columns={columns}
                    dataSource={creditList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="customerId"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} />
                    }}
                    pagination={false}
                />
            </KeywordContext.Provider>
            {pagination && pagination.totalPages > 1 && <Row gutter={16}
                style={{
                    margin: 0,
                }}
                className="grid items-center justify-end w-full bg-white p-[16px] border-t border-solid border-outline-med rounded-b-[12px]">
                <BookingPagination
                    onChange={onChangePage}
                    defaultCurrent={pagination?.page}
                    defaultPageSize={pagination?.limit}
                    total={pagination?.totalElements}
                    currentPage={pagination?.page}
                    showSizeChanger={false}
                />
            </Row>}
            <Modal
                centered
                onCancel={() => setShowCustomerCreditDialog(false)}
                open={showCustomerCreditDialog}
                afterClose={() => {
                    setCreditSelected(null);
                    setCustomerCreditDetails(null);
                }}
                width={800}
                destroyOnClose
                title={null}
                footer={
                    <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                        <BookingButton
                            btnType="sub"
                            btnSize="sm"
                            onClick={() => setShowCustomerCreditDialog(false)}>
                            Close
                        </BookingButton>
                    </div>
                }>
                <div>
                    <Descriptions
                        title="Customer Credit Details"
                        bordered
                        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                        items={items}
                        labelStyle={{ fontWeight: "bold" }}
                    />
                </div>
            </Modal>
        </div>

    </WrapperTable>
}

type IEmptyTableProps = {
    keyword: string | undefined;
}

const EmptyTable: React.FC<IEmptyTableProps> = ({ keyword }) => {
    return (
        <div className="my-6 flex flex-col gap-[5px]">
            <div className="flex justify-center">
                <ICNoneData />
            </div>
            <div className="text-standard-bold text-high-em">
                {keyword ? `No data found with keyword “${keyword}”` : 'No data found'}
            </div>
            <div className="flex justify-center">
                <span>
                </span>
            </div>
        </div>
    )
}