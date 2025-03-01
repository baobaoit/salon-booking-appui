import { AutoComplete, Form, Input, SelectProps } from "antd"
import React from "react";
import { UserEntity } from "./type";
import { BookingForm } from "../../components/form/form";
import { FormInstance } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import { BookingTextArea } from "../../components/form/textarea";
import debouce from 'lodash/debounce';
import { useCustomer } from "../../hooks/useCustomer";
import { TNailService } from "../../api/user/type";
import { AddServices } from "./add_services";

const Wrapper = styled.div`
    .ant-row {
        align-items: center;
    }
    .ant-form-item-has-error {
        .ant-row {
            align-items: flex-start;
        }
    }
    .ant-form-item-explain {
        padding-top: 5px;
    }
`;

type CheckInCustomerFormProps = {
    customerData?: UserEntity | undefined;
    form: FormInstance;
    serviceIds: string[];
    setServiceIds: React.Dispatch<React.SetStateAction<string[]>>;
    setTechnicianId: React.Dispatch<React.SetStateAction<string>>;
    nailServices: TNailService[];
    setNailServices: React.Dispatch<React.SetStateAction<TNailService[]>>;
}
export const CheckInCustomerForm: React.FC<CheckInCustomerFormProps> = ({
    customerData,
    form,
    serviceIds,
    setServiceIds,
    setTechnicianId,
    nailServices,
    setNailServices,
}) => {
    const [nailServicesSelected, setNailServicesSelected] = React.useState<TNailService[]>([]);
    const { loadNailTechnician, nailTechnician } = useCustomer();
    const [clientName, setClientName] = React.useState<string>('');

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
                name="name"
                label="Client name"
            >
                <BookingInput disabled />
            </Form.Item>
            <Form.Item
                name="nailTechnician"
                label="Technician"
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
            {customerData && <AddServices
                nailServicesSelected={nailServicesSelected} 
                setNailServicesSelected={setNailServicesSelected}
                setServiceIds={setServiceIds}
                nailServices={nailServices}
                setNailServices={setNailServices}
            />}
            <Form.Item
                name="clientNotes"
                label="Client Notes"
            >
                <BookingTextArea placeholder="She wants to leave at 4:30 PM tomorrow" />
            </Form.Item>

        </div>
    );

    React.useEffect(() => {
        if (customerData) {
            const name = `${customerData.firstName} ${customerData.lastName}`;
            setClientName(name);
            form.setFieldsValue({
                name: name,
            });
        }
    }, [form, customerData]);

    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border py-[20px] px-[5px]">
        <BookingForm
            initialValues={{
                name: clientName,
                nailTechnician: '',
                clientNotes: '',
            }}
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            layout="horizontal"
            className="w-full" form={form} name="CheckInCustomer" childNode={childForm} />
    </Wrapper>
}
