import { Collapse, Radio } from "antd"
import React from "react";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import { BookingButton } from "../../components/button";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { getGiftCardBalance, redeemGiftCode } from "../../api/gift-card";
import { EPaymentMethod, TRedeemGiftCode } from "./type";
import { formatNumberNoneCurrency } from "../../utils";
import { useNotification } from "../../hooks/useNotification";

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


type PaymentMethodPageProps = {
    customerId: string;
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    paymentMethod: EPaymentMethod | undefined;
    setPaymentMethod: React.Dispatch<React.SetStateAction<EPaymentMethod | undefined>>;
}
export const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({
    customerId,
    balance,
    setBalance,
    paymentMethod,
    setPaymentMethod,
}) => {
    const dispatch = useDispatch();
    const { showError, showSuccess } = useNotification();
    const [giftCode, setGiftCode] = React.useState<string>("");
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

    React.useEffect(() => {
        if (customerId) {
            loadBalance(customerId);
        }
    }, [customerId]);

    const onChangePaymentMethod = React.useCallback((e: any) => {
        setPaymentMethod(e.target.value);
        loadBalance(customerId);
    } ,[customerId]);

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
            const result = await redeemGiftCode(customerId, payload);
            if (result?.data?.balance) {
                showSuccess('Success', 'Redeem gift code successfully');
                setGiftCode("");
                setBalance(result.data.balance);
            }
        } catch (e: any) {
            const errorMessage = e.response?.data?.detail;
            showError('Error', errorMessage || 'An error occurred');
        } finally {
            dispatch(setLoading(false));
        }
    } ,[dispatch, giftCode, customerId, showSuccess, setBalance, showError]);
    
    return <Wrapper className="flex flex-col gap-[5px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex flex-col gap-[20px] items-start justify-start w-full px-[30px]">
            <div className="flex items-start justify-start w-full">
                <Collapse defaultActiveKey={['1']} className="w-1/2">
                    <Panel header="Add a gift card or promotion code or voucher" key="1">
                        <div className="flex flex-col items-center justify-center gap-[5px] w-full">
                            <div className="flex gap-[15px] w-full">
                                <BookingInput textSize="md" 
                                    value={giftCode}
                                    onChange={(e) => setGiftCode(e.target.value)}
                                    wrapperClassName="w-full" placeholder="Gift card or promotion code or voucher" />
                                <div>
                                    <BookingButton type="primary" 
                                        onClick={onRedeemGiftCode}
                                        btnSize="sm" style={{
                                            height: "34px",
                                        }}>
                                        Apply
                                    </BookingButton>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </div>
            <div className="flex flex-col">
                <Radio.Group className="flex gap-2" onChange={onChangePaymentMethod} value={paymentMethod}>
                    <Radio value={EPaymentMethod.GIFT_CARD_BALANCE}> 
                        Gift card balance: ${formatNumberNoneCurrency(balance)}
                    </Radio>
                    <Radio value={EPaymentMethod.OTHER}>
                        Others
                    </Radio>
                </Radio.Group>
            </div>
        </div>
    </Wrapper>
}
