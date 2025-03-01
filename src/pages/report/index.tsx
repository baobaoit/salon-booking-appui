import React from "react";
import styled from "styled-components";
import { ReportPageList } from "./list";
import { Direction, EOrderStatus, OrderStatusMap, OrderStatusMappingColor, SearchQueryParams, SortFieldProperty, SortFieldPropertyMap, SortProperty, TSearchOrder, TUpdateOrder } from "../../api/user/type";
import { useDispatch } from "react-redux";
import { IPagination, TCheckoutCustomer } from "../customers/type";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { setLoading } from "../../redux/slices/appInfo";
import { cancelOrderService, searchOrders } from "../../api/user";
import { SearchParamsStateType, useFilter } from "../../hooks/useFilter";
import { useSearchParams } from "react-router-dom";
import { Form, Modal, InputNumber, Tag } from "antd";
import { BookingInput } from "../../components/form/input";
import { BookingButton } from "../../components/button";
import { useForm } from "antd/lib/form/Form";
import { formatLocaleDateTimeString } from "../../utils";
import { CheckoutForm } from "../customers/checkout_customer";
import { useNotification } from "../../hooks/useNotification";
import { BookingTextArea } from "../../components/form/textarea";
import { UpdateOrderForm } from "../customers/update_order";
import _ from "lodash";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const Wrapper = styled.div`
`;

const WrapperForm = styled.div`
    .ant-form-item-explain {
        padding-top: 10px;
    }
    .ant-form-item-label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
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
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export const ReportPage: React.FC = () => {
    const dispatch = useDispatch();
    const { showError, showSuccess } = useNotification();
    const [searchParams] = useSearchParams();
    const [customerServices, setCustomerServices] = React.useState<TCheckoutCustomer[]>([]);
    const status = searchParams.get('status');
    const fromDate = searchParams.get('fromDate') || '';
    const toDate = searchParams.get('toDate') || '';
    const [dateRange, setDateRange] = React.useState<RangeValue>(null);
    const filtersDefaults: SearchParamsStateType = {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: DEFAULT_PAGE_SIZE },
        direction: { type: 'string', default: Direction.DESC },
        property: { type: 'string', default: SortProperty.CREATED_DATE },
        customerName: { type: 'string', default: '' },
        technicianName: { type: 'string', default: '' },
        status: { type: 'string', default: status || EOrderStatus.ALL },
        fromDate: { type: 'string', default: fromDate },
        toDate: { type: 'string', default: toDate },
    }
    const [filterParams, setFilterParams] = useFilter(filtersDefaults);
    
    React.useEffect(() => {
        if (fromDate && toDate) {
            setDateRange([fromDate ? dayjs(fromDate) : null, toDate ? dayjs(toDate) : null]);
        }
    } , [fromDate, toDate]);

    const [sortData, setSortData] = React.useState<TSortData>({ field: 'CREATED_DATE', order: 'desc' });
    const [pagination, setPagination] = React.useState<IPagination>();
    const [serviceMode, setServiceMode] = React.useState<EOrderStatus | undefined>(status === null ? EOrderStatus.ALL : status as EOrderStatus);
    const [currentParams, setCurrentParams] = React.useState<TSearchOrder>({});

    const [showViewDetailDialog, setShowViewDetailDialog] = React.useState<boolean>(false);
    const [customerSelected, setCustomerSelected] = React.useState<TCheckoutCustomer | undefined>(undefined);
    const [viewForm] = useForm();

    const [showAssignTechnicianDialog, setShowAssignTechnicianDialog] = React.useState<boolean>(false);

    const [showConfirmCancelServiceDialog, setShowConfirmCancelServiceDialog] = React.useState<boolean>(false);
    const [showCheckOutDialog, setShowCheckOutDialog] = React.useState(false);

    const onChangeSort = React.useCallback((data: TSortData) => {
        setSortData(data);
        const propertyTemp = data.field as SortFieldProperty;
        const property = propertyTemp ? SortFieldPropertyMap[propertyTemp] : undefined;
        const directionTemp = data.order as string;
        const direction = directionTemp ? Direction[directionTemp.toUpperCase() as keyof typeof Direction] : undefined;
        const searchQueryParams: SearchQueryParams = {
            page: 0,
            size: pagination?.limit || DEFAULT_PAGE_SIZE,
            direction: direction || Direction.DESC,
            property: property || SortProperty.CREATED_DATE,
        };
        loadData(searchQueryParams, currentParams);
    }, [currentParams, pagination]);

    const loadData = React.useCallback(async (queryParams?: SearchQueryParams | undefined, params?: TSearchOrder) => {
        try {
            const searchQueryParamsDefault: SearchQueryParams = {
                page: params?.page || 0,
                size: DEFAULT_PAGE_SIZE,
                direction: Direction.DESC,
                property: SortProperty.CREATED_DATE,
            };
            const newSearchQueryParams: SearchQueryParams = queryParams || searchQueryParamsDefault;
            const currentPayload = _.pickBy(filterParams, (value, key) => key !== 'page' && key !== 'size' && key !== 'direction' && key !== 'property');
            const statuses = serviceMode ? [serviceMode] : [];
            let payload: TSearchOrder = {
                ...currentPayload,
                statuses: statuses,
            };
            if (params) {
                payload = params;
            }
            setCurrentParams(payload);
            dispatch(setLoading(true));
            const newFilterParams = {
                ...payload,
                page: newSearchQueryParams.page,
                size: newSearchQueryParams.size,
                direction: newSearchQueryParams.direction,
                property: newSearchQueryParams.property,
            };
            setFilterParams(newFilterParams);
            const { data } = await searchOrders(newSearchQueryParams, payload);
            const page = (data.page || 0) + 1;
            const property = data.property ? SortFieldPropertyMap[data.property as SortFieldProperty] : SortProperty.CREATED_DATE;
            const newPagination: IPagination = {
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                limit: data.size,
                page: page,
                direction: data.direction as Direction,
                property: property,
            };
            setPagination(newPagination);
            const _checkoutList = data?.content || [];
            setCustomerServices(_checkoutList);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, serviceMode, filterParams]);

    const onChangePaging = React.useCallback((pageData: any) => {
        const searchQueryParams: SearchQueryParams = {
            page: pageData.page - 1,
            size: pagination?.limit || DEFAULT_PAGE_SIZE,
            direction: pagination?.direction as Direction,
            property: pagination?.property || SortProperty.CREATED_DATE,
        };
        loadData(searchQueryParams, currentParams);
    }, [pagination, currentParams]);

    React.useEffect(() => {
        loadData();
    }, []);

    const onFilter = React.useCallback((params: TSearchOrder) => {
        const searchQueryParams: SearchQueryParams = {
            page: 0,
            size: pagination?.limit || DEFAULT_PAGE_SIZE,
            direction: pagination?.direction as Direction || Direction.DESC,
            property: pagination?.property || SortProperty.CREATED_DATE,
        };
        loadData(searchQueryParams, params);
    }, [pagination]);

    const onShowAssignTechnician = React.useCallback((data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowAssignTechnicianDialog(true);
    }, []);

    const onShowCheckoutDialog = React.useCallback(async (data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowCheckOutDialog(true);
    }, []);

    const onReload = React.useCallback(() => {
        setShowCheckOutDialog(false);
        loadData();
    }, [loadData]);

    const onShowConfirmCancelServiceDialog = React.useCallback((data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowConfirmCancelServiceDialog(true);
    }, []);

    const doCancelService = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            await cancelOrderService(customerSelected?.id || '');
            setShowConfirmCancelServiceDialog(false);
            loadData();
            showSuccess('Cancel service successfully');
        } catch (e) {
            showError('Error', 'Cancel service failed');
        } finally {
            dispatch(setLoading(false));
        }
    }, [customerSelected, dispatch, loadData, showError, showSuccess]);

    const onViewDetail = React.useCallback((data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowViewDetailDialog(true);
        const creationTime = formatLocaleDateTimeString(data.creationTime);
        const nailTechnician = data?.nailTechnician ? (data?.nailTechnician?.firstName + ' ' + data?.nailTechnician?.lastName) : '';
        const notes = data?.status === EOrderStatus.CHECK_OUT ? data?.checkOutNotes : data?.clientNotes;
        viewForm.setFieldsValue({
            nailTechnician: nailTechnician,
            creationTime: creationTime || '',
            totalPrice: data.totalPrice,
            discount: data.discount,
            checkOutNotes: notes,
        });
    }, [viewForm]);

    return (
        <Wrapper className="flex flex-col items-center justify-start h-full">
            <div className="flex flex-row items-start h-full w-full">
                <SortDataContext.Provider value={{ sortData, setSortData: onChangeSort }}>
                    <ReportPageList
                        datasource={customerServices}
                        keyword={filterParams?.firstName}
                        filterParams={filterParams}
                        pagination={pagination}
                        serviceMode={serviceMode}
                        setServiceMode={setServiceMode}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        onChangePaging={onChangePaging}
                        onFilter={onFilter}
                        onViewDetail={onViewDetail}
                        onAssignTechnician={onShowAssignTechnician}
                        onCheckout={onShowCheckoutDialog}
                        onCancelService={onShowConfirmCancelServiceDialog}
                    />
                </SortDataContext.Provider>
            </div>
            <Modal
                centered
                onCancel={() => setShowViewDetailDialog(false)}
                open={showViewDetailDialog}
                maskClosable={false}
                width={1000}
                destroyOnClose
                title={
                    <div className="flex gap-[10px] font-bold text-[18px]">
                        {customerSelected?.clientName || 'View Detail'}
                        {customerSelected?.status && <div className="flex">
                            <Tag style={{
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontWeight: 500,
                                lineHeight: '16px',
                                padding: '4px 8px',
                                color: '#FFFFFF',
                                backgroundColor: OrderStatusMappingColor[customerSelected?.status],
                                borderColor: OrderStatusMappingColor[customerSelected?.status]
                            }}>
                                {OrderStatusMap[customerSelected?.status]}
                            </Tag>
                        </div>}
                    </div>
                }
                footer={
                    <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                        <BookingButton
                            btnType="sub_info"
                            btnSize="sm"
                            onClick={() => setShowViewDetailDialog(false)}
                        >
                            Close
                        </BookingButton>
                    </div>
                }>
                <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                    <WrapperForm className="flex flex-col gap-3 pt-[20px] w-full">
                        <Form
                            labelCol={{ flex: '130px' }}
                            labelWrap
                            form={viewForm} layout="horizontal" className="w-full">
                            <Form.Item
                                label="Nail Technician"
                                name="nailTechnician"
                            >
                                <BookingInput disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="creationTime"
                                label="Check-In Time"
                            >
                                <BookingInput disabled={true} />
                            </Form.Item>
                            <div className="flex flex-col w-full">
                                <div className="font-bold underline">
                                    Service order list
                                </div>
                                <div className="flex w-full items-center justify-center">
                                    <div className="flex flex-col gap-[5px] w-full max-w-[600px]">
                                        {
                                            customerSelected?.services?.map((item, index) => {
                                                return <div key={index} className="flex w-full items-center justify-between gap-[20px]">
                                                    <div className="flex gap-[10px]">
                                                        <span>{index + 1}.</span>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div>
                                                        {item.price}
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3 pt-[20px]">
                                <div className="flex flex-col">
                                    <Form.Item
                                        name="totalPrice"
                                        label="Sub total"
                                    >
                                        <InputNumber addonAfter="$" disabled formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                    </Form.Item>
                                </div>
                                <div className="flex flex-col">
                                    <Form.Item
                                        name="discount"
                                        label="Discount"
                                    >
                                        <InputNumber addonAfter="$" disabled formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                name="checkOutNotes"
                                label="Client notes"
                            >
                                <BookingTextArea disabled />
                            </Form.Item>
                        </Form>
                    </WrapperForm>
                </div>
            </Modal>
            <Modal
                centered
                onCancel={() => setShowAssignTechnicianDialog(false)}
                open={showAssignTechnicianDialog}
                maskClosable={false}
                destroyOnClose
                width={1000}
                title={
                    <div className="font-bold text-[18px]">
                        {customerSelected?.clientName || 'Assign Nail Technician'}
                    </div>
                }
                footer={null}>
                <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                    <WrapperForm className="flex flex-col gap-3 w-full">
                        <UpdateOrderForm 
                            data={customerSelected} 
                            nailTechnicianParams={customerSelected?.nailTechnician} 
                            mode={customerSelected?.status as EOrderStatus} 
                            onCompletedForm={() => {
                                setShowAssignTechnicianDialog(false);
                                loadData();
                            }} 
                        />
                    </WrapperForm>
                </div>
            </Modal>
            <Modal
                centered
                onCancel={() => setShowCheckOutDialog(false)}
                open={showCheckOutDialog}
                afterClose={() => {
                    setCustomerSelected(undefined);
                }}
                maskClosable={false}
                width={1000}
                destroyOnClose
                styles={{
                    header: {
                        padding: '15px 10px',
                        borderBottom: '1px solid #E5E5E5',
                    },
                    content: {
                        padding: '0px',
                    },
                    body: {
                        padding: '5px 0 0 0',
                    }
                }}
                title={
                    <div className="text-[18px]">
                        <span className="text-[#007faa]">{customerSelected?.clientName}</span> Check Out
                    </div>
                }
                footer={null}>
                <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                    {showCheckOutDialog && <CheckoutForm
                        data={customerSelected}
                        nailTechnicianParams={customerSelected?.nailTechnician}
                        customerId={customerSelected?.customerId || ''}
                        mode={EOrderStatus.IN_SERVICE}
                        onReload={onReload} />}
                </div>
            </Modal>
            <Modal
                centered
                onCancel={() => setShowConfirmCancelServiceDialog(false)}
                open={showConfirmCancelServiceDialog}
                maskClosable={false}
                width={600}
                destroyOnClose
                title={
                    <div className="text-[18px]">
                        Confirm Cancel Service
                    </div>
                }
                footer={
                    <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                        <BookingButton
                            btnType="sub_info"
                            btnSize="sm"
                            onClick={() => setShowConfirmCancelServiceDialog(false)}
                        >
                            Close
                        </BookingButton>
                        <BookingButton
                            btnType="primary"
                            btnSize="sm"
                            onClick={doCancelService}
                        >
                            Confirm
                        </BookingButton>
                    </div>
                }>
                <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                    <div className="flex flex-col gap-[20px] w-full">
                        <div className="text-[16px]">
                            Are you sure you want to cancel this service?
                        </div>
                    </div>
                </div>
            </Modal>

        </Wrapper>
    )
}
