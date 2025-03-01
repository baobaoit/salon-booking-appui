import React from "react"
import styled from "styled-components"
import { EStatusGiftCard, ExpirationDate, StatusGiftCardMapping, StatusGiftCardMappingColor, TCustomers, TGiftCard, TGiftCardEntity, TGiftCardResponse } from "./type";
import classNames from 'classnames';
import { FormInstance } from "antd/lib/form/Form";
import { AutoComplete, Card, Col, DatePicker, Form, Input, InputNumber, Radio, Row, SelectProps, Table, Tag } from "antd";
import { BookingInput } from "../../components/form/input";
import { BookingForm } from "../../components/form/form";
import { BookingTextArea } from "../../components/form/textarea";
import debouce from 'lodash/debounce';
import { SearchOutlined } from '@ant-design/icons';
import { DEFAULT_PAGE_SIZE, Direction, SearchPayloadUsers, SearchQueryParams, SortProperty } from "../../api/user/type";
import { getCustomers } from "../../api/user";
import { setLoading } from "../../redux/actions";
import { UserEntity, UserResponse } from "../customers/type";
import { useDispatch } from "react-redux";
import { getGiftCard } from "../../api/gift-card";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const WrapperCard = styled(Card)`
    shadow: 0px 6px 16px -6px rgba(17, 12, 34, 0.1);
    border-radius: 12px;
    width: 100%;
    .ant-card-head {
        padding: 8px 20px;
        min-height: auto;
        .ant-card-head-title {
            font-size: 13px;
            font-weight: 600;
            color: #1a1a1a;
        }
    }
    .ant-card-body {
        padding: 15px 10px 20px 10px;
    }
`;

type TSaveGiftCardProps = {
    form: FormInstance;
    giftCardSelected: TGiftCardEntity | undefined;
    giftCode: string | undefined;
    disableEditGiftCard: boolean | undefined;
    customersSelected: UserEntity[] | undefined;
    setCustomersSelected: React.Dispatch<React.SetStateAction<UserEntity[] | undefined>>;
}

export const SaveGiftCard: React.FC<TSaveGiftCardProps> = ({
    form,
    giftCode,
    giftCardSelected,
    disableEditGiftCard,
    customersSelected,
    setCustomersSelected,
}) => {
    const dispatch = useDispatch();
    const [expirationDateRadio, setExpirationDateRadio] = React.useState<ExpirationDate>(ExpirationDate.NOT_EXPIRED);
    const [customers, setCustomers] = React.useState<UserEntity[]>([]);
    const [customerOptions, setCustomerOptions] = React.useState<SelectProps<object>['options']>([]);
    const [giftCardDetails, setGiftCardDetails] = React.useState<TGiftCard | undefined>(undefined);
    const [customerNameSelection, setCustomerNameSelection] = React.useState<string | undefined>(undefined);

    const loadCustomers = React.useCallback(async (searchKeywork: string | undefined) => {
        const newSearchQueryParamsUsers: SearchQueryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const newSearchKeywork = searchKeywork;
        const searchPayloadUsersTemp: SearchPayloadUsers = {};
        const isNumber = /^\d+$/.test(newSearchKeywork || '');
        if (isNumber) {
            searchPayloadUsersTemp.phoneNumber = newSearchKeywork || undefined;
        } else {
            searchPayloadUsersTemp.name = newSearchKeywork || undefined;
        }
        const newSearchPayloadUsers = { ...searchPayloadUsersTemp };
        dispatch(setLoading(true));
        try {
            const { data } = await getCustomers(newSearchQueryParamsUsers, newSearchPayloadUsers);
            const userResponse: UserResponse = data;
            const newCustomers = userResponse.content || [];
            setCustomers(newCustomers);
            dispatch(setLoading(false));
        } catch (e) {
            console.error(e);
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleSearchCustomer = (value: string) => {
        onSearchKeyword(value);
    };

    const onSearchCustomer = React.useCallback(async (value: string) => {
        try {
            await loadCustomers(value);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const onSearchKeyword = React.useMemo(() => {
        return debouce(onSearchCustomer, 600);
    }, [onSearchCustomer]);

    React.useEffect(() => {
        return () => {
            onSearchKeyword.cancel();
        }
    }, [onSearchKeyword]);

    React.useEffect(() => {
        if (customers && customers.length > 0) {
            const newOptions = customers.map((item) => {
                const fullName = `${item.firstName} ${item.lastName}`;
                return {
                    ...item,
                    value: fullName,
                    label: fullName,
                }
            });
            setCustomerOptions(newOptions);
        }
    }, [customers]);

    const onSelectCustomer = (value: string) => {
        const customer = customers.find((item) => `${item.firstName} ${item.lastName}` === value);
        if (customer) {
            const isCustomerSelected = customersSelected?.find((item) => item.id === customer.id);
            if (!isCustomerSelected) {
                setCustomersSelected([...(customersSelected || []), customer]);
            }
        }
        // reset value search
        form.setFieldsValue({
            customers: [],
        });
        setCustomerNameSelection('');
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: UserEntity) => {
                return <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <span>{record.firstName} {record.lastName}</span>
                    </div>
                </div>
            },
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: UserEntity) => {
                const hasRedeemed = record.hasRedeemed;
                const statusCard = giftCardDetails?.status as EStatusGiftCard;
                const status = hasRedeemed ? EStatusGiftCard.REDEEMABLE : statusCard;
                if (hasRedeemed || disableEditGiftCard) {
                    return <div className="flex items-center gap-3">
                        <Tag style={{
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 500,
                            lineHeight: '16px',
                            padding: '4px 8px',
                            color: '#FFFFFF',
                            backgroundColor: StatusGiftCardMappingColor[status],
                            borderColor: StatusGiftCardMappingColor[status],
                        }}>
                            {StatusGiftCardMapping[status]}
                        </Tag>
                    </div>
                }
                return <div className="flex items-center gap-3" onClick={() => {
                    const newCustomersSelected = customersSelected?.filter((item) => item.id !== record.id);
                    setCustomersSelected(newCustomersSelected);
                }}>
                    <span className={classNames('text-sm text-primary cursor-pointer')}>Remove</span>
                </div>
            },
        },
    ];

    const childForm = (
        <div className="flex flex-col w-full gap-[30px]">
            <Row
                wrap
                itemType="flex"
                gutter={30} style={{
                    width: '100%',
                }}>
                <Col span={12} style={{ display: 'flex' }}>
                    <WrapperCard title="Gift card details"
                        bordered={true}>
                        <div className="flex flex-col gap-3 w-full">
                            <Form.Item
                                name="giftCode"
                                label="Gift card code"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input gift card code!",
                                    },
                                ]}
                            >
                                <BookingInput isRequired={true} disabled />
                            </Form.Item>
                            <Form.Item
                                name="initialValue"
                                label="Initial value"
                            >
                                <InputNumber
                                    className="w-full"
                                    size="large"
                                    disabled={disableEditGiftCard}
                                    addonBefore="$" formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
                            </Form.Item>

                        </div>
                    </WrapperCard>
                </Col>
                <Col span={12} style={{ display: 'flex' }}>
                    <div className="flex flex-col gap-3 w-full">
                        <WrapperCard title="Expiration date" bordered={true}>
                                <div className="flex flex-col gap-3">
                                    <span className="text-sm">
                                        Countries have different laws for gift card expiry dates. Please check the laws in your country before changing this date.
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        <Radio.Group
                                            value={expirationDateRadio}
                                            disabled={disableEditGiftCard}
                                            onChange={(e) => {
                                                setExpirationDateRadio(e.target.value);
                                                console.log(e);
                                            }}
                                        >
                                            <Radio value={ExpirationDate.NOT_EXPIRED}> No expiration date </Radio>
                                            <Radio value={ExpirationDate.EXPIRED}> Set expiration date </Radio>
                                        </Radio.Group>
                                        {expirationDateRadio === ExpirationDate.EXPIRED && (<Form.Item name="expirationDate">
                                            <DatePicker
                                                className="w-full min-h-[44px]"
                                                format="YYYY-MM-DD HH:mm"
                                                showTime
                                                disabled={disableEditGiftCard}
                                                style={{ width: '100%' }}
                                                placeholder="Select expiration date"
                                            />
                                        </Form.Item>)}
                                    </div>
                                </div>
                        </WrapperCard>
                        <WrapperCard title="Note" bordered={true}>
                            <Form.Item
                                name="notes"
                            >
                                <BookingTextArea disabled={disableEditGiftCard} />
                            </Form.Item>
                        </WrapperCard>
                    </div>
                </Col>
            </Row>
            <Row gutter={30} style={{
                width: '100%',
            }}>
                <Col span={24}>
                    <WrapperCard title="Customer" bordered={true}>
                        <div className="flex flex-col w-full gap-[20px]">
                            {customersSelected && customersSelected?.length > 0 && <div className="flex w-full">
                                <div className="flex flex-col gap-3 overflow-y-auto w-full">
                                    <Table 
                                        key="id"
                                        rowKey="id"
                                        columns={columns} 
                                        pagination={false}
                                        scroll={{ y: `300px` }}
                                        dataSource={customersSelected} />
                                </div>
                            </div>}
                            <Form.Item
                                name="customers"
                            >
                                <AutoComplete
                                    popupClassName="certain-category-search-dropdown"
                                    options={customerOptions}
                                    className="w-full"
                                    showSearch
                                    disabled={disableEditGiftCard}
                                    value={customerNameSelection}
                                    notFoundContent="Not found"
                                    onSelect={(value) => {
                                        onSelectCustomer(value);
                                    }}
                                    onSearch={handleSearchCustomer}
                                >
                                    <Input
                                        prefix={<SearchOutlined />}
                                        size="large"
                                        placeholder="Search customer" />
                                </AutoComplete>
                            </Form.Item>
                        </div>
                    </WrapperCard>
                </Col>
            </Row>
        </div>
    );

    React.useEffect(() => {
        if (giftCode) {
            form.setFieldsValue({
                giftCode: giftCode,
            });
        }
    }, [form, giftCode]);

    React.useEffect(() => {
        if (!giftCardSelected) {
            setExpirationDateRadio(ExpirationDate.NOT_EXPIRED);
            setCustomersSelected([]);
            setCustomerOptions([]);
        }
    }, [giftCardSelected]);

    const onLoadGiftCardDetails = React.useCallback(async (giftCardId: string) => {
        try {
            dispatch(setLoading(true));
            const result = await getGiftCard(giftCardId);
            if (result?.data) {
                const giftCard = result.data as TGiftCard;
                setGiftCardDetails(giftCard);
                const expirationDateValue = giftCard.hasExpirationDate ? ExpirationDate.EXPIRED : ExpirationDate.NOT_EXPIRED;
                setExpirationDateRadio(expirationDateValue);
                const expirationDateTemp = giftCard.hasExpirationDate && giftCard.expirationDate ? dayjs.utc(giftCard.expirationDate).local() : undefined;
                form.setFieldsValue({
                    giftCode: giftCard.giftCode,
                    initialValue: giftCard.initialBalance,
                    expirationDate: expirationDateTemp,
                    notes: giftCard.notes,
                });
                const customers = giftCard.customers.map((item: TCustomers) => {
                    return {
                        ...item.customer,
                        hasRedeemed: item.hasRedeemed,
                    }
                });
                setCustomersSelected(customers);
            }
            
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
        }
    } , [dispatch, form]);


    React.useEffect(() => {
        if (giftCardSelected?.id) {
            onLoadGiftCardDetails(giftCardSelected.id);
        }
    } , [giftCardSelected, form]);

    return <div className="flex items-center justify-start w-full bg-white">
        <BookingForm
            labelWrap
            layout="vertical"
            className="w-full"
            form={form}
            name="createGiftCard"
            childNode={childForm} />
    </div>
}
