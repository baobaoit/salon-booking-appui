import { DatePicker, Row, Table, Tag } from "antd"
import { ColumnType, ColumnsType } from "antd/lib/table";
import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { BookingPagination } from "../../components/pagination";
import { ICSort, ICNoneData, ICEyeTurnOn } from "../../icons";
import { SortOrder } from "antd/lib/table/interface";
import { useSortData } from ".";
import styled from 'styled-components';
import { IPagination, TCheckoutCustomer } from "../customers/type";
import { EOrderStatus, OrderStatusMap, OrderStatusMappingColor, OrderStatusOptions, TExportOrderSearch, TSearchOrder } from "../../api/user/type";
import { formatLocaleDateTimeString, formatNumber } from "../../utils";
import { BookingButton, IconButton } from "../../components/button";
import { BookingSelect } from "../../components/form/select";
import { BookingInput } from "../../components/form/input";
import type { Dayjs } from 'dayjs';
import { BookingTooltip } from "../../components/tooltip";
import { ICMaterialSymbol } from "../../icons/material-symbol";
import { useDispatch } from "react-redux";
import { useNotification } from "../../hooks/useNotification";
import { setLoading } from "../../redux/actions";
import { exportOrder } from "../../api/user";

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

    .ant-picker.ant-picker-range {
        height: 44px;
    }
`;

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

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

type ReportPageListProps = {
    datasource: TCheckoutCustomer[];
    keyword?: string;
    pagination?: IPagination;
    filterParams: TSearchOrder;
    serviceMode: EOrderStatus | undefined;
    dateRange: RangeValue;
    setDateRange: React.Dispatch<React.SetStateAction<RangeValue>>;
    setServiceMode: React.Dispatch<React.SetStateAction<EOrderStatus | undefined>>;
    onChangePaging: ({ page }: { page: number }) => void;
    onFilter: (params: TSearchOrder) => void;
    onViewDetail: (customer: TCheckoutCustomer) => void;
    onAssignTechnician: (data: TCheckoutCustomer) => void;
    onCheckout: (data: TCheckoutCustomer) => void;
    onCancelService: (data: TCheckoutCustomer) => void;
}

const KeywordContext = React.createContext<string>('');

export const ReportPageList: React.FC<ReportPageListProps> = ({
    datasource,
    keyword,
    pagination,
    onChangePaging,
    filterParams,
    serviceMode,
    setServiceMode,
    dateRange,
    setDateRange,
    onFilter,
    onViewDetail,
    onAssignTechnician,
    onCheckout,
    onCancelService,
}) => {
    const dispatch = useDispatch();
    const { showSuccess, showError } = useNotification();
    const onChangePage = (page: number) => {
        onChangePaging({ page })
    };
    const [customerName, setCustomerName] = React.useState<string | undefined>();
    const [technicianName, setTechnicianName] = React.useState<string | undefined>();

    const columns: ColumnsType<TCheckoutCustomer> = [
        {
            title: 'No',
            dataIndex: 'id',
            field: 'id',
            key: 'id',
            width: '40px',
            sorter: true,
            render: (val: string, record: TCheckoutCustomer, index: number) => {
                return <div className="flex flex-col gap-1">
                    {index + 1}
                </div>
            },
        },
        {
            title: 'Customer Name',
            dataIndex: 'clientName',
            field: 'clientName',
            key: 'clientName',
            sorter: true,
            render: (val: string) => {
                return <TitleRenderer key={val} title={val} />;
            },
        },
        {
            title: 'Nail Technician',
            dataIndex: 'nailTechnician',
            field: 'nailTechnician',
            key: 'nailTechnician',
            sorter: false,
            render: (val: any, record: TCheckoutCustomer) => {
                if (!val) return null;
                const name = record?.nailTechnician?.firstName + ' ' + record?.nailTechnician?.lastName;
                return <TitleRenderer key={name} title={name} />;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            field: 'status',
            key: 'status',
            sorter: false,
            width: '120px',
            render: (val: string) => {
                const newVal = val as EOrderStatus;
                return <div className="flex">
                    <Tag style={{
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                        padding: '4px 8px',
                        color: '#FFFFFF',
                        backgroundColor: OrderStatusMappingColor[newVal],
                        borderColor: OrderStatusMappingColor[newVal]
                    }}>
                        {OrderStatusMap[newVal]}
                    </Tag>
                </div>
            },
        },
        {
            title: 'Sub total',
            dataIndex: 'totalPrice',
            field: 'totalPrice',
            width: '180px',
            key: 'totalPrice',
            align: 'right' as const,
            sorter: false,
            render: (val: any) => {
                return <div className="flex flex-col gap-1 text-right">
                    {formatNumber(val)}
                </div>
            },
        },
        {
            title: 'Check in Time',
            dataIndex: 'creationTime',
            field: 'creationTime',
            key: 'creationTime',
            width: '180px',
            sorter: true,
            render: (val: string) => {
                return <div className="flex flex-col gap-1">
                    {formatLocaleDateTimeString(val)}
                </div>
            },
        },
        {
            title: 'Check-Out Time',
            dataIndex: 'checkOutTime',
            field: 'checkOutTime',
            key: 'checkOutTime',
            width: '180px',
            sorter: true,
            render: (val: any) => {
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
                const allowActionService = [EOrderStatus.WAITING_SERVICE, EOrderStatus.IN_SERVICE];
                return <ActionMenu key={_id}>
                    <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onViewDetail(data);
                        }}
                    >
                        <BookingTooltip content="View Detail"
                            placement="top"
                            style={{
                                width: '25px',
                            }}
                            childNode={
                                <IconButton icon={<ICEyeTurnOn width={24} height={24} />} btnType="tertiary" />
                            }>
                        </BookingTooltip>
                    </div>
                    {allowActionService.includes(data.status) && <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onAssignTechnician(data);
                        }}
                    >
                        <BookingTooltip content="Assign Technician"
                            placement="top"
                            childNode={
                                <ICMaterialSymbol icon="assignment_ind"/>
                            }>
                        </BookingTooltip>
                    </div>}
                    {data.status === EOrderStatus.IN_SERVICE && <div className="flex w-[25px] h-[25px]" onClick={() => {
                        onCheckout(data);
                    }}>
                        <BookingTooltip content="Checkout"
                            placement="top"
                            childNode={<ICMaterialSymbol icon="shopping_cart_checkout" />}>
                        </BookingTooltip>
                    </div>}
                    {allowActionService.includes(data.status) && <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onCancelService(data);
                        }}
                    >
                        <BookingTooltip content="Cancel service"
                            placement="top"
                            childNode={
                                <ICMaterialSymbol icon="cancel" />
                            }>
                        </BookingTooltip>
                    </div>}
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

    const onSearchData = React.useCallback(() => {
        const newParams: TSearchOrder = {
            statuses: serviceMode ? [serviceMode] : undefined,
        };
        if (customerName) {
            newParams.customerName = customerName;
        }
        if (technicianName) {
            newParams.technicianName = technicianName;
        }
        if (dateRange) {
            newParams.fromDate = dateRange?.[0]?.format('YYYY-MM-DD');
            newParams.toDate = dateRange?.[1]?.format('YYYY-MM-DD');
        }
        delete newParams?.status;
        onFilter(newParams);
    } , [customerName, dateRange, serviceMode, technicianName]);

    const onExportExcel = React.useCallback(async () => {
        try {
            const newParams: TSearchOrder = {
                statuses: serviceMode && serviceMode !== 'ALL' ? [serviceMode] : undefined,
            };
            if (customerName) {
                newParams.customerName = customerName;
            }
            if (technicianName) {
                newParams.technicianName = technicianName;
            }
            if (dateRange) {
                newParams.fromDate = dateRange?.[0]?.format('YYYY-MM-DD');
                newParams.toDate = dateRange?.[1]?.format('YYYY-MM-DD');
            }
            dispatch(setLoading(true));
            const payload: TExportOrderSearch = {
                fromDate: newParams.fromDate,
                toDate: newParams.toDate,
                technicianName: newParams.technicianName,
                customerName: newParams.customerName,
                statuses: newParams.statuses || []
            };
            const response = await exportOrder(payload);
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition?.split('filename=')[1] || 'report.xlsx';
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showSuccess('Export successfully', 'Report has been exported');
            }
        }
        catch (error: any) {
            const errorMessage = error?.response?.data?.errorMessage || error?.response?.statusText;
            errorMessage && showError("Error", errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, customerName, dateRange, serviceMode, technicianName, showError, showSuccess]);

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex flex-col w-full px-[12px] py-[20px] shadow-e-03 items-end justify-end bg-white rounded-[12px]">
            <div className="flex flex-row w-full flex-wrap gap-3 justify-end items-center">
                <RangePicker 
                    value={dateRange}
                    onChange={setDateRange}
                    format={{
                        format: 'YYYY-MM-DD',
                        type: 'mask',
                    }}
                    size="large" />
                <BookingSelect 
                    options={OrderStatusOptions}
                    value={serviceMode}
                    onChange={(val) => setServiceMode(val)}
                    style={{ width: '200px' }}
                    label="Status"
                    placeholder="Select Status"
                />
                <BookingInput
                    placeholder="Customer Name"
                    hasClearIcon={true}
                    textSize="lg"
                    classInput="w-auto"
                    onClearValue={() => setCustomerName(undefined)}
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                    wrapperClassName="w-auto flex items-center justify-center"
                />
                <BookingInput
                    placeholder="Technician Name"
                    hasClearIcon={true}
                    textSize="lg"
                    classInput="w-auto"
                    value={technicianName}
                    onClearValue={() => setTechnicianName(undefined)}
                    onChange={(e) => setTechnicianName(e.target.value)}
                    wrapperClassName="w-auto flex items-center justify-center"
                />
                <div className="flex">
                    <BookingButton
                        type="primary"
                        btnSize="md"
                        onClick={onSearchData}>
                        Search
                    </BookingButton>
                </div>
                <div className="flex">
                    <BookingButton
                        btnType="secondary"
                        onClick={onExportExcel}
                        style={{
                            width: '80px',
                        }}
                        btnSize="md">
                        <div className="flex space-x-2 items-center">
                            <span>
                                Export
                            </span>
                        </div>
                    </BookingButton>
                </div>
            </div>
        </div>
        <div className="flex flex-col w-full h-full bg-white rounded-[12px] overflow-hidden shadow-e-03">
            <KeywordContext.Provider value={keyword ?? ''}>
                <Table
                    key="id"
                    className={classNames("white-header w-full")}
                    columns={columns}
                    dataSource={datasource}
                    rowClassName="cursor-pointer data-row"
                    rowKey="id"
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
        </div>
    )
}