import { AutoComplete, Form, Input, SelectProps } from "antd"
import React from "react";
import { TCheckoutCustomer, UserEntity } from "./type";
import { BookingForm } from "../../components/form/form";
import { useForm } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import { BookingTextArea } from "../../components/form/textarea";
import { EOrderStatus, TUpdateOrder } from "../../api/user/type";
import { formatLocaleDateTimeString } from "../../utils";
import { BookingButton } from "../../components/button";
import { updateOrder } from "../../api/user";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { useNotification } from "../../hooks/useNotification";
import debouce from 'lodash/debounce';
import { useCustomer } from "../../hooks/useCustomer";
import { OrderServices } from "./order_services";

const WrapperForm = styled.div`
    box-shadow: 0 1px 2px 0 rgba(34,36,38,0.15);
    background-color: white;
    padding: 15px;
    .ant-form-item-explain {
        padding-top: 10px;
    }
`;

type UpdateOrderFormProps = {
    data: TCheckoutCustomer | undefined;
    mode: EOrderStatus;
    nailTechnicianParams: UserEntity | undefined;
    onCompletedForm: (param: TCheckoutCustomer) => void;
}

export const UpdateOrderForm: React.FC<UpdateOrderFormProps> = ({nailTechnicianParams, data, mode, onCompletedForm }) => {
    const { showError, showSuccess } = useNotification();
    const { loadNailTechnician, nailTechnician, setNailTechnician } = useCustomer();
    const [form] = useForm();
    const dispatch = useDispatch();
    const [technicianId, setTechnicianId] = React.useState<string>('');
    const [serviceIds, setServiceIds] = React.useState<string[]>([]);

    const onSubmit = React.useCallback(async () => {
        try {
            const values = await form.validateFields();
            dispatch(setLoading(true));
            if (!technicianId) {
                showError('Assigned failed', 'Please select technician');
                dispatch(setLoading(false));
                return;
            }
            if (serviceIds.length > 0) {
                const isSame = serviceIds.every((id) => serviceIds.indexOf(id) === serviceIds.lastIndexOf(id));
                if (!isSame) {
                    showError('Assigned failed', 'Please correct services');
                    dispatch(setLoading(false));
                    return;
                }
            }
            const orderId = data?.id ?? '';
            const payload: TUpdateOrder = {
                technicianId: technicianId,
                services: serviceIds,
                clientNotes: values.clientNotes,
            }
            const response = await updateOrder(orderId, payload);
            if (response?.data) {
                showSuccess('Assigned success', 'Assigned technician and services successfully');
            }
            dispatch(setLoading(false));
            if (response?.data) {
                onCompletedForm(response?.data);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Please input correct information';
            showError('Assigned failed', errorMessage);
            dispatch(setLoading(false));
        }

    }, [dispatch, showSuccess, showError, form, serviceIds, data, technicianId]);

    React.useEffect(() => {
        if (nailTechnicianParams) {
            setNailTechnician([nailTechnicianParams]);
            setTechnicianId(nailTechnicianParams.id);
            form.setFieldsValue({
                technician: `${nailTechnicianParams.firstName} ${nailTechnicianParams.lastName}`,
            });
        }
    }, [nailTechnicianParams, form]);

    React.useEffect(() => {
        form.setFieldsValue({
            clientNotes: data?.clientNotes || '',
            creationTime: formatLocaleDateTimeString(data?.creationTime ?? ''),
            technician: nailTechnicianParams ? `${nailTechnicianParams.firstName} ${nailTechnicianParams.lastName}` : '',
        });
    }, [data, mode, form, nailTechnicianParams]);

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
            <OrderServices
                formOrderServices={form}
                isRequiredServices={false}
                setServiceIds={setServiceIds}
                nailServices={data?.services || []}
            />
            <Form.Item
                name="clientNotes"
                label="Client notes"
            >
                <BookingTextArea disabled={mode === EOrderStatus.CHECK_OUT} />
            </Form.Item>
            <Form.Item>
                <div className="flex w-full items-end justify-end">
                    <div className="max-w-[100px]">
                        <BookingButton
                            btnType="primary"
                            onClick={onSubmit}
                            btnSize="sm">
                            Assign
                        </BookingButton>
                    </div>
                </div>
            </Form.Item>

        </div>
    );

    return <WrapperForm className="flex w-full">
        <BookingForm
            labelCol={{ flex: '130px' }}
            labelWrap
            disabled={mode === EOrderStatus.CHECK_OUT}
            layout="horizontal"
            name={`CheckOutCustomer-${data?.id}`}
            className="w-full" form={form} childNode={childForm} />
    </WrapperForm>
}