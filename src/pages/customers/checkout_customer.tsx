import { AutoComplete, Collapse, Form, Input, InputNumber, SelectProps, Table } from "antd"
import React from "react";
import { EPaymentMethod, TCheckoutCustomer, UserEntity } from "./type";
import { BookingForm } from "../../components/form/form";
import { useForm } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import { BookingTextArea } from "../../components/form/textarea";
import { EOrderStatus, TOrder } from "../../api/user/type";
import classNames from "classnames";
import type { ColumnsType } from 'antd/es/table';
import { formatLocaleDateTimeString } from "../../utils";
import { BookingButton } from "../../components/button";
import { saveCheckOutCustomer } from "../../api/user";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { BookingTooltip } from "../../components/tooltip";
import { useNotification } from "../../hooks/useNotification";
import debouce from 'lodash/debounce';
import { useCustomer } from "../../hooks/useCustomer";
import { OrderServices } from "./order_services";
import { PaymentMethodPage } from "./payment_method";

const { Panel } = Collapse;

const Wrapper = styled.div`
    .ant-segmented .ant-segmented-item {
        background-color: transparent;
    }
    .ant-segmented .ant-segmented-item-selected {
        background-color: white;
        color: #005984;
    }
`;

const WrapperTable = styled.div`
    .ant-table-row {
        cursor: pointer;
    }
    .ant-form-item-label {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
`;

const WrapperForm = styled.div`
    box-shadow: 0 1px 2px 0 rgba(34,36,38,0.15);
    background-color: white;
    padding: 15px;
    .ant-form-item-explain {
        padding-top: 10px;
    }
`;

type CheckOutCustomerFormProps = {
    customerData?: UserEntity | TCheckoutCustomer | undefined;
    checkoutList: TCheckoutCustomer[];
    setCheckoutList: React.Dispatch<React.SetStateAction<TCheckoutCustomer[]>>;
    setShowCheckOutDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CheckOutCustomerForm: React.FC<CheckOutCustomerFormProps> = ({
    customerData,
    checkoutList,
    setCheckoutList,
    setShowCheckOutDialog,
}) => {
    const checkInList = React.useMemo(() => {
        return checkoutList.filter((item) => item.status === EOrderStatus.IN_SERVICE || item.status === EOrderStatus.WAITING_SERVICE);
    }, [checkoutList]);

    const onReload = React.useCallback((values: TCheckoutCustomer) => {
        if (checkoutList.length === 1) {
            setShowCheckOutDialog(false);
            return;
        }
        setCheckoutList((prev) => {
            return prev.map((item) => {
                if (item.id === values.id) {
                    return values;
                }
                return item;
            });
        });
    }, [checkoutList, setCheckoutList, setShowCheckOutDialog]);

    return <Wrapper className="flex flex-col gap-[5px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full">
            <ViewCheckoutTable
                mode={EOrderStatus.IN_SERVICE}
                data={checkInList} onReload={onReload}
                customerId={customerData?.id ?? ''} />
        </div>
    </Wrapper>
}

type TViewCheckoutTableProps = {
    customerId: string;
    data: TCheckoutCustomer[];
    mode: EOrderStatus;
    onReload: (param: TCheckoutCustomer) => void;
}

const ViewCheckoutTable: React.FC<TViewCheckoutTableProps> = ({ data, customerId, mode, onReload }) => {
    const [checkoutCustomerSelection, setCheckoutCustomerSelection] = React.useState<TCheckoutCustomer | null>(null);
    const columns: ColumnsType<TCheckoutCustomer> = [
        {
            title: 'Technician', dataIndex: 'id', key: 'id',
            render: (value, record) => {
                const hasSelected = checkoutCustomerSelection?.id === record.id;
                return <span className={
                    classNames([
                        {
                            'font-bold': hasSelected,
                        }
                    ])
                }>
                    {record.nailTechnician?.firstName} {record.nailTechnician?.lastName}
                </span>
            }
        },
        {
            title: 'Description', dataIndex: 'services', key: 'services',
            render: (text, record) => {
                const value = record.services.map((item) => item.name).join(', ');
                const hasSelected = checkoutCustomerSelection?.id === record.id;
                return <BookingTooltip content={value}
                    placement="top"
                    childNode={
                        <div className={classNames([
                            "line-clamp-1",
                            {
                                'font-bold': hasSelected
                            }])}>
                            {value}
                        </div>
                    }>
                </BookingTooltip>
            }
        },
        {
            title: 'Date', dataIndex: 'creationTime', key: 'creationTime',
            width: 200,
            render: (text, record) => {
                const hasSelected = checkoutCustomerSelection?.id === record.id;
                return <span className={classNames([
                    {
                        'font-bold': hasSelected
                    }])}>
                    {formatLocaleDateTimeString(record.creationTime)}
                </span>
            }
        },
    ];

    React.useEffect(() => {
        if (data.length > 0) {
            setCheckoutCustomerSelection(data[0]);
        } else {
            setCheckoutCustomerSelection(null);
        }
    }, [data]);

    return (
        <WrapperTable className="flex flex-col w-full gap-[32px]">
            {checkoutCustomerSelection && <div className="flex w-full items-center justify-center px-[30px]">
                <div className={classNames([
                    'flex w-full',
                    {
                        'pb-[30px]': data?.length === 1
                    }
                ])}>
                    <CheckoutForm data={checkoutCustomerSelection} nailTechnicianParams={checkoutCustomerSelection?.nailTechnician} customerId={customerId} mode={mode} onReload={onReload} />
                </div>
            </div>}
            {data?.length > 1 && <div className="flex flex-col w-full gap-2">
                <div className="flex text-left px-[15px]">
                    <h4 className="text-standard-bold">
                        Service activity list
                    </h4>
                </div>
                <Table
                    className="w-full"
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowClassName={(record) => {
                        return classNames([
                            {
                                'bg-[#F3FDF8]': checkoutCustomerSelection?.id === record.id,
                            }
                        ]);
                    }}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                setCheckoutCustomerSelection(record);
                            }
                        }
                    }}
                />
            </div>}
        </WrapperTable>
    )
}

type CheckoutFormProps = {
    customerId: string;
    data: TCheckoutCustomer | undefined;
    mode: EOrderStatus;
    nailTechnicianParams: UserEntity | undefined;
    onReload: (param: TCheckoutCustomer) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ customerId, nailTechnicianParams, data, mode, onReload }) => {
    const { showError, showSuccess } = useNotification();
    const { loadNailTechnician, nailTechnician, setNailTechnician } = useCustomer();
    const [formCheckout] = useForm();
    const dispatch = useDispatch();
    const [technicianId, setTechnicianId] = React.useState<string>('');
    const [serviceIds, setServiceIds] = React.useState<string[]>([]);

    const [balance, setBalance] = React.useState(0);
    const [paymentMethod, setPaymentMethod] = React.useState<EPaymentMethod | undefined>(EPaymentMethod.GIFT_CARD_BALANCE);
    const [subtotalPrice, setSubtotalPrice] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);

    const calculateTotalPrice = React.useMemo(() => {
        const subTotal = formCheckout.getFieldValue('subtotalPrice') || 0;
        if (subTotal === 0) {
            return 0;
        }
        if (paymentMethod === EPaymentMethod.GIFT_CARD_BALANCE) {
            const total = subTotal - balance - discount;
            return total < 0 ? 0 : total;
        }
        return subTotal - discount;
    } , [formCheckout, balance, subtotalPrice, paymentMethod, discount]);

    React.useEffect(() => {
        setTotalPrice(calculateTotalPrice);
    }, [calculateTotalPrice]);

    const onSubmit = React.useCallback(async () => {
        try {
            const values = await formCheckout.validateFields();
            dispatch(setLoading(true));
            if (!technicianId) {
                showError('Check-out failed', 'Please select technician');
                dispatch(setLoading(false));
                return;
            }
            if (values.subtotalPrice === 0) {
                showError('Check-out failed', 'Sub total must be greater than 0');
                dispatch(setLoading(false));
                return;
            }
            if (serviceIds.length === 0) {
                showError('Check-out failed', 'Please select service');
                dispatch(setLoading(false));
                return;
            }
            const isSame = serviceIds.every((id) => serviceIds.indexOf(id) === serviceIds.lastIndexOf(id));
            if (!isSame) {
                showError('Check-out failed', 'Please correct services');
                dispatch(setLoading(false));
                return;
            }
            const payload: TOrder = {
                orderId: data?.id ?? '',
                technicianId: technicianId,
                services: serviceIds,
                totalPrice: totalPrice,
                discount: values.discount ?? 0,
                checkOutNotes: values.checkOutNotes,

                paymentMethod: paymentMethod ?? EPaymentMethod.GIFT_CARD_BALANCE,
                subtotalPrice: values.subtotalPrice ?? 0,
            }
            const response = await saveCheckOutCustomer(customerId, payload);
            if (response?.data) {
                showSuccess('Check-out success', 'Check-out customer successfully');
            }
            dispatch(setLoading(false));
            if (response?.data) {
                onReload(response?.data);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'An error occurred';
            showError('Check-out failed', errorMessage);
            dispatch(setLoading(false));
        }

    }, [dispatch, showSuccess, totalPrice, paymentMethod, showError, formCheckout, customerId, serviceIds, data, technicianId]);

    React.useEffect(() => {
        if (nailTechnicianParams) {
            setNailTechnician([nailTechnicianParams]);
            setTechnicianId(nailTechnicianParams.id);
            formCheckout.setFieldsValue({
                technician: `${nailTechnicianParams.firstName} ${nailTechnicianParams.lastName}`,
            });
        }
    }, [nailTechnicianParams, formCheckout]);

    React.useEffect(() => {
        formCheckout.setFieldsValue({
            totalPrice: data?.totalPrice || 0,
            discount: data?.discount || 0,
            checkOutNotes: data?.checkOutNotes || '',
            creationTime: formatLocaleDateTimeString(data?.creationTime ?? ''),
            technician: nailTechnicianParams ? `${nailTechnicianParams.firstName} ${nailTechnicianParams.lastName}` : '',
        });
    }, [data, mode, formCheckout, nailTechnicianParams]);

    const [nailTechnicianOptions, setNailTechnicianOptions] = React.useState<SelectProps<object>['options']>([]);
    const handleSearchNailTechnician = (value: string) => {
        onSearchKeyword(value);
    };
    const onSearchNailTechnician = React.useCallback(async (value: string) => {
        try {
            await loadNailTechnician(value);
        } catch (e) {
            console.error(e);
        }
    }, []);
    const onSearchKeyword = React.useMemo(() => {
        return debouce(onSearchNailTechnician, 600);
    }, [onSearchNailTechnician]);

    React.useEffect(() => {
        return () => {
            onSearchKeyword.cancel();
        }
    }, [onSearchKeyword]);

    React.useEffect(() => {
        if (nailTechnician && nailTechnician.length > 0) {
            const newOptions = nailTechnician.map((item) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                return {
                    ...item,
                    value: fullName,
                    label: fullName,
                }
            });
            setNailTechnicianOptions(newOptions);
        }
    }, [nailTechnician]);

    const childForm = (
        <div className="grid gap-[20px] grid-cols-[1fr]">
            <Collapse
                    defaultActiveKey={['1']}
                    className="w-full"
                >
                    <Panel header="Assignment"
                        key="1">
                        <div className="flex flex-col gap-[25px]">
                            <Form.Item
                                name="technician"
                                label="Technician"
                                required
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Please select technician'
                                        }
                                    ]
                                }
                            >
                                <AutoComplete
                                    popupClassName="certain-category-search-dropdown"
                                    options={nailTechnicianOptions}
                                    className="w-full"
                                    showSearch
                                    notFoundContent="Not found"
                                    onSelect={(value) => {
                                        const nailTechnician = nailTechnicianOptions?.find((item) => item.value === value);
                                        if (nailTechnician) {
                                            setTechnicianId(nailTechnician.id);
                                        }
                                    }}
                                    onSearch={handleSearchNailTechnician}
                                >
                                    <Input.Search size="large" placeholder="Search nail technician name" />
                                </AutoComplete>
                            </Form.Item>
                            <Form.Item
                                name="creationTime"
                                label="Check-In Time"
                            >
                                <BookingInput disabled={true} />
                            </Form.Item>
                        </div>
                    </Panel>
            </Collapse>
            <div className="flex flex-row gap-[20px] items-center">
                <Collapse
                    defaultActiveKey={['1']}
                    className="w-full"
                >
                    <Panel header="Service order list"
                        key="1">
                        <OrderServices
                            formOrderServices={formCheckout}
                            isRequiredServices={true}
                            setServiceIds={setServiceIds}
                            nailServices={data?.services || []}
                        />
                    </Panel>
                </Collapse>
            </div>
            <div className="flex flex-row gap-[20px] items-center">
                <Collapse
                    defaultActiveKey={['1']}
                    className="w-full"
                >
                    <Panel header="Payment Method"
                        key="1">
                            <PaymentMethodPage 
                                customerId={customerId}
                                balance={balance}
                                setBalance={setBalance}
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                            />
                    </Panel>
                </Collapse>
            </div>
            <div className="flex flex-row gap-[20px] items-center">
                <Collapse
                    defaultActiveKey={['1']}
                    className="w-full"
                >
                    <Panel header="Amount"
                        key="1">
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-col">
                                        <Form.Item
                                            name="subtotalPrice"
                                            label="Sub total"
                                            required
                                            rules={
                                                [
                                                    {
                                                        required: true,
                                                        message: 'Please enter sub total'
                                                    }
                                                ]
                                            }
                                        >
                                            <InputNumber addonAfter="$" 
                                                min={0}
                                                value={subtotalPrice}
                                                onChange={(value) => {
                                                    setSubtotalPrice(value || 0);
                                                }}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                        </Form.Item>
                                    </div>
                                    <div className="flex flex-col">
                                        <Form.Item
                                            name="discount"
                                            label="Discount"
                                        >
                                            <InputNumber 
                                                addonAfter="$" 
                                                min={0}
                                                value={discount}
                                                onChange={(value) => {
                                                    setDiscount(value || 0);
                                                }}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                                        </Form.Item>
                                    </div>
                                </div>
                                <Form.Item
                                    name="checkOutNotes"
                                    label="Client notes"
                                >
                                    <BookingTextArea disabled={mode === EOrderStatus.CHECK_OUT} />
                                </Form.Item>
                            </div>
                    </Panel>
                </Collapse>
            </div>
            {mode !== EOrderStatus.CHECK_OUT && 
            (<div className="flex flex-row items-center justify-end gap-[20px]">
                <div className="flex flex-row items-center gap-3">
                    <h4 className=" text-title-bold">
                        Total price
                    </h4>
                    <InputNumber addonAfter="$" 
                        min={0}
                        value={totalPrice}
                        size="large"
                        onChange={(value) => {
                            setTotalPrice(value || 0);
                        }}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 
                    />
                </div>
                <div>
                    <Form.Item>
                        <div className="flex items-end justify-end">
                            <div>
                                <BookingButton
                                    btnType="primary"
                                    onClick={onSubmit}
                                    btnSize="sm">
                                    Checkout
                                </BookingButton>
                            </div>
                        </div>
                    </Form.Item>
                </div>

            </div>)}

        </div>
    );


    return <WrapperForm className="flex w-full">
        <BookingForm
            labelCol={{ flex: '130px' }}
            labelWrap
            disabled={mode === EOrderStatus.CHECK_OUT}
            layout="horizontal"
            name={`CheckOutCustomer-${data?.id}`}
            className="w-full" form={formCheckout} childNode={childForm} />
    </WrapperForm>
}