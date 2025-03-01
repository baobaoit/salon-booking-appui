import { Table } from "antd";
import React from "react"
import { ICNoneData, ICRemove, ICSort } from "../../icons";
import { TCheckoutCustomer } from "../customers/type";
import Highlighter from "react-highlight-words";
import { ColumnsType, ColumnType, SortOrder } from "antd/lib/table/interface";
import { useSortData } from "../customers";
import styled from "styled-components";
import { BookingTooltip } from "../../components/tooltip";
import classNames from "classnames";
import { EOrderStatus } from "../../api/user/type";
import { BookingButton } from "../../components/button";
import { formatLocaleDateTimeString } from "../../utils";
import { ICMaterialSymbol } from "../../icons/material-symbol";

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

const Wrapper = styled.div`
    .ant-table-row.data-row {
        .ant-table-cell {
            height: 55px;
        }
    }
`;

const KeywordContext = React.createContext<string>('');

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

type ITableListProps = {
    data: TCheckoutCustomer[];
    mode: EOrderStatus;
    activeMoreAction: boolean | undefined;
    onAssignTechnician?: (data: TCheckoutCustomer) => void;
    onCheckout?: (data: TCheckoutCustomer) => void;
    onViewMore: (val: EOrderStatus) => void;
    onCancelService?: (data: TCheckoutCustomer) => void;
}

export const TableList: React.FC<ITableListProps> = ({ 
    data, 
    mode, 
    activeMoreAction,
    onViewMore, 
    onCheckout, 
    onAssignTechnician, 
    onCancelService,
}) => {
    const columns: ColumnsType<TCheckoutCustomer> = [
        {
            title: 'Name',
            dataIndex: 'clientName',
            field: 'clientName',
            key: 'clientName',
            sorter: false,
            render: (val: string) => {
                return <TitleRenderer key={val} title={val} />;
            },
        },
        {
            title: 'Total Services',
            dataIndex: 'services',
            field: 'services',
            key: 'services',
            width: '150px',
            align: 'right' as const,
            sorter: false,
            render: (services: any[]) => {
                if (!services) return '';
                if (services.length === 0) return '';
                return <div className="flex flex-col gap-1 text-right">
                    {services?.length}
                </div>
            },
        },
        {
            title: 'Check-In Time',
            dataIndex: 'creationTime',
            field: 'creationTime',
            key: 'creationTime',
            width: '180px',
            sorter: false,
            render: (val: string) => {
                if (!val) return '';
                return <div className="flex flex-col gap-1">
                    {formatLocaleDateTimeString(val)}
                </div>
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: TCheckoutCustomer) => {
                if (!data?.clientName) return '';
                return <ActionMenu key={_id}>
                    <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onAssignTechnician && onAssignTechnician(data);
                        }}
                    >
                        <BookingTooltip content="Assign Technician"
                            placement="top"
                            childNode={
                                <ICMaterialSymbol icon="assignment_ind" />
                            }>
                        </BookingTooltip>
                    </div>
                    {mode === EOrderStatus.IN_SERVICE && <div className="flex w-[25px] h-[25px]" onClick={() => {
                        onCheckout && onCheckout(data);
                    }}>
                        <BookingTooltip content="Checkout"
                            placement="top"
                            childNode={<ICMaterialSymbol icon="shopping_cart_checkout" />}>
                        </BookingTooltip>
                    </div>}
                    <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onCancelService && onCancelService(data);
                        }}
                    >
                        <BookingTooltip content="Cancel service"
                            placement="top"
                            childNode={
                                <ICMaterialSymbol icon="cancel" />
                            }>
                        </BookingTooltip>
                    </div>
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<TCheckoutCustomer>) => {
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

    return (
        <Wrapper className="flex flex-col w-full gap-3">
            <Table
                key="id"
                className={classNames("white-header w-full")}
                columns={columns}
                dataSource={data}
                rowClassName="cursor-pointer data-row"
                rowKey="id"
                locale={{
                    emptyText: <EmptyTable />
                }}
                pagination={false}
            />
            {activeMoreAction && <div className="w-auto flex items-center justify-end pr-3">
                <BookingButton
                    width="auto"
                    btnSize="sm"
                    btnType="sub_info"
                    onClick={() => {
                        onViewMore(mode);
                    }}
                >
                    More
                </BookingButton>
            </div>}
        </Wrapper>
    )
}

type IEmptyTableProps = {
}

const EmptyTable: React.FC<IEmptyTableProps> = () => {
    return (
        <div className="my-6 flex flex-col gap-[5px]">
            <div className="flex justify-center">
                <ICNoneData />
            </div>
            <div className="text-standard-bold text-high-em">
                No data found
            </div>
        </div>
    )
}
