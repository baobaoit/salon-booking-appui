import { Card, Col, Modal, Row } from "antd";
import React from "react"
import { useDispatch } from "react-redux"
import { TopHeader } from "./top-header";
import { TableList } from "./list";
import { cancelOrderService, getOrderStatistics, getSaleAnalytics, getTotalRevenue, searchOrders } from "../../api/user";
import { Direction, EOrderStatus, SearchQueryParams, SortProperty, TOrderStatistics, TPeriod, TSaleAnalytics, TSearchOrder, TTotalRevenue } from "../../api/user/type";
import { setLoading } from "../../redux/slices/appInfo";
import { TCheckoutCustomer } from "../customers/type";
import { BookingButton } from "../../components/button";
import { useCustomer } from "../../hooks/useCustomer";
import styled from "styled-components";
import { useNotification } from "../../hooks/useNotification";
import { CheckoutForm } from "../customers/checkout_customer";
import { useNavigation } from "../../hooks/useNavigate";
import { UpdateOrderForm } from "../customers/update_order";
import { ChartControl } from "./chart-control";

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

export const DashboardPage: React.FC = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    
    const [orderStatistics, setOrderStatistics] = React.useState<TOrderStatistics | undefined>(undefined);
    const [currentMode, setCurrentMode] = React.useState<EOrderStatus | undefined>(undefined);
    const [waitingServices, setWaitingServices] = React.useState<TCheckoutCustomer[]>([]);
    const [inServices, setInServices] = React.useState<TCheckoutCustomer[]>([]);

    const { showError, showSuccess } = useNotification();
    const [customerSelected, setCustomerSelected] = React.useState<TCheckoutCustomer | undefined>(undefined);
    const [showAssignTechnicianDialog, setShowAssignTechnicianDialog] = React.useState<boolean>(false);
    const [showConfirmCancelService, setShowConfirmCancelService] = React.useState(false);
    // checkout
    const [showCheckOutDialog, setShowCheckOutDialog] = React.useState(false);
    const [period, setPeriod] = React.useState<TPeriod>(TPeriod.WEEKLY);
    const [saleAnalytics, setSaleAnalytics] = React.useState<TSaleAnalytics[]>([]);
    const [totalRevenue, setTotalRevenue] = React.useState<TTotalRevenue>();

    const loadOrderStatistics = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const { data } = await getOrderStatistics();
            setOrderStatistics(data);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const loadSaleAnalytics = React.useCallback(async (val?: TPeriod) => {
        try {
            dispatch(setLoading(true));
            const { data } = await getSaleAnalytics(val || period);
            setSaleAnalytics(data?.content || []);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    } , [dispatch, period]);

    const loadTotalRevenue = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const { data } = await getTotalRevenue();
            setTotalRevenue(data);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    } , [dispatch]);

    const loadTopFiveWaitingServices = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const newQueryParams: SearchQueryParams = {
                page: 0,
                size: 5,
                direction: Direction.DESC,
                property: SortProperty.CREATED_DATE,
            };
            const payload: TSearchOrder = {
                statuses: [EOrderStatus.WAITING_SERVICE]
            };
            const { data } = await searchOrders(newQueryParams, payload);
            const _checkoutList = data?.content || [];
            setWaitingServices(_checkoutList);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const loadTopFiveInServices = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const newQueryParams: SearchQueryParams = {
                page: 0,
                size: 5,
                direction: Direction.DESC,
                property: SortProperty.CREATED_DATE,
            };
            const payload: TSearchOrder = {
                statuses: [EOrderStatus.IN_SERVICE]
            };
            const { data } = await searchOrders(newQueryParams, payload);
            const _checkoutList = data?.content || [];
            setInServices(_checkoutList);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    React.useEffect(() => {
        loadData();
    }, []);

    const loadData = React.useCallback(() => {
        loadOrderStatistics();
        loadTopFiveWaitingServices();
        loadTopFiveInServices();
        loadSaleAnalytics();
        loadTotalRevenue();
    }, []);

    const onShowAssignTechnician = React.useCallback((data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowAssignTechnicianDialog(true);
    }, []);

    // implement the checkout
    const onShowCheckoutDialog = React.useCallback(async (data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowCheckOutDialog(true);
    } , []);

    const onReload = React.useCallback(() => {
        setShowCheckOutDialog(false);
        loadData();
    } , []);

    const onNavigateToReport = (val: EOrderStatus | undefined) => {
        navigate({
            pathname: '/report',
            search: val ? `?status=${val}` : ''
        });
    }

    const onCancelService = React.useCallback((data: TCheckoutCustomer) => {
        setCustomerSelected(data);
        setShowConfirmCancelService(true);
    } , []);

    const doCancelService = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            await cancelOrderService(customerSelected?.id || '');
            setShowConfirmCancelService(false);
            loadData();
            showSuccess('Cancel service successfully');
        } catch (e) {
            showError('Error', 'Cancel service failed');
        } finally {
            dispatch(setLoading(false));
        }
    } , [customerSelected, dispatch, showError, showSuccess]);

    const onChangePeriod = React.useCallback((val: TPeriod) => {
        setPeriod(val);
        loadSaleAnalytics(val);
    } , []);

    return (
        <div className="flex flex-col gap-[15px] w-full">
            <TopHeader
                totalServices={orderStatistics?.totalServices}
                inServices={orderStatistics?.inServices}
                waitingServices={orderStatistics?.waitingServices}
            />
            <ChartControl
                period={period}
                totalRevenue={totalRevenue}
                onChangePeriod={onChangePeriod}
                saleAnalytics={saleAnalytics}
            />
            <Row className="w-full" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                    <Card bordered={true}
                        styles={{
                            body: {
                                paddingLeft: '0px',
                                paddingRight: '0px',
                            }
                        }}
                        style={{
                            cursor: 'pointer',
                        }}>
                        <div className="flex flex-col gap-[15px]">
                            <h3 className=" pl-[15px] text-[1rem] text-[#323A46] font-bold">Top 5 Waiting Services</h3>
                            <TableList data={waitingServices} 
                                mode={EOrderStatus.WAITING_SERVICE} 
                                activeMoreAction={orderStatistics?.waitingServices as number > 5}
                                onViewMore={onNavigateToReport}
                                onAssignTechnician={(data) => {
                                    setCurrentMode(EOrderStatus.WAITING_SERVICE);
                                    onShowAssignTechnician(data);
                                }}
                                onCancelService={(data) => {
                                    setCurrentMode(EOrderStatus.WAITING_SERVICE);
                                    onCancelService(data);
                                }}
                            />
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card bordered={true}
                        styles={{
                            body: {
                                paddingLeft: '0px',
                                paddingRight: '0px',
                            }
                        }}
                        style={{
                            cursor: 'pointer',
                        }}>
                        <div className="flex flex-col gap-[15px]">
                            <h3 className=" pl-[15px] text-[1rem] text-[#323A46] font-bold">Top 5 In Services</h3>
                            <TableList 
                                data={inServices} 
                                mode={EOrderStatus.IN_SERVICE} 
                                activeMoreAction={orderStatistics?.inServices as number > 5}
                                onAssignTechnician={(data) => {
                                    setCurrentMode(EOrderStatus.IN_SERVICE);
                                    onShowAssignTechnician(data);
                                }}
                                onViewMore={onNavigateToReport}
                                onCheckout={(data) => {
                                    setCurrentMode(EOrderStatus.IN_SERVICE);
                                    onShowCheckoutDialog(data);
                                }}
                                onCancelService={(data) => {
                                    setCurrentMode(EOrderStatus.IN_SERVICE);
                                    onCancelService(data);
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                centered
                onCancel={() => setShowAssignTechnicianDialog(false)}
                open={showAssignTechnicianDialog}
                maskClosable={false}
                destroyOnClose={true}
                width={1000}
                afterClose={() => {

                }}
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
                destroyOnClose={true}
                afterClose={() => {
                    setCustomerSelected(undefined);
                }}
                maskClosable={false}
                width={1000}
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
                onCancel={() => setShowConfirmCancelService(false)}
                open={showConfirmCancelService}
                maskClosable={false}
                destroyOnClose={true}
                width={600}
                afterClose={() => {
                }}
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
                            onClick={() => setShowConfirmCancelService(false)}
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
        </div>
    )
}
