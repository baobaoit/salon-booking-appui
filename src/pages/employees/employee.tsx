import { DatePicker, Form, Radio } from "antd"
import React from "react";
import { BookingForm } from "../../components/form/form";
import { FormInstance } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { UserEntity } from "../customers/type";
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { BookingPhoneNumber } from "../../components/form/phonenumber";
dayjs.extend(customParseFormat);

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

type EmployeeFormProps = {
    employeeData: UserEntity | undefined;
    form: FormInstance;
}
export const EmployeeForm: React.FC<EmployeeFormProps> = ({
    employeeData,
    form
}) => {
    const [phoneNumber, setPhoneNumber] = React.useState<string | undefined>(undefined);
    const childForm = (
        <div className="grid gap-[10px] grid-cols-[1fr]">
            <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
            >
                <BookingInput isRequired={true} />
            </Form.Item>
            <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your last name!",
                    },
                ]}
            >
                <BookingInput isRequired={true} onChange={(e) => {
                    const phoneNumber = form.getFieldValue('phoneNumber');
                    if (phoneNumber) {
                        const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
                        if (parsedPhoneNumber) {
                            const formattedPhoneNumber = parsedPhoneNumber.formatInternational();
                            form.setFieldsValue({ phoneNumber: formattedPhoneNumber });
                        }
                    }
                }} />
            </Form.Item>
            <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone number!",
                    },
                    {
                        min: 12,
                        message: "Phone number must be at least 10 characters!",
                    },
                    {
                        validator: (_, value) => {
                            if (value) {
                                const isValid = isValidPhoneNumber(value, 'US');
                                if (!isValid) {
                                    return Promise.reject('Invalid phone number!');
                                }
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <BookingPhoneNumber value={phoneNumber} onChange={(value) => {
                    setPhoneNumber(value);
                    form.setFieldsValue({ phoneNumber: value });
                }} />
            </Form.Item>
            {/* <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}>
                <BookingInputPassword
                    size="large"
                    maxLength={20}
                    isNotShowPrefix={true}
                    placeholder="Enter Password"
                />
            </Form.Item> */}
            <Form.Item label="Date of Birth" name="dobDate">
                <DatePicker 
                    className="w-full min-h-[44px]" 
                    format={{
                        type: 'mask',
                        format: 'YYYY-MM-DD'
                    }}
                    placeholder="YYYY-MM-DD" 
                />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: 'email',
                    }
                ]}
            >
                <BookingInput />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
                <Radio.Group>
                    <Radio value="MALE"> Male </Radio>
                    <Radio value="FEMALE"> Female </Radio>
                </Radio.Group>
            </Form.Item>

        </div>
    );

    React.useEffect(() => {
        if (employeeData) {
            const dobDateTemp = employeeData.dob ? dayjs(employeeData.dob, 'YYYY-MM-DD') : undefined;
            form.setFieldsValue({
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                phoneNumber: employeeData.phoneNumber,
                dob: dobDateTemp,
                email: employeeData.email,
                gender: employeeData.gender,
                password: employeeData.password || ''
            });
            setPhoneNumber(employeeData.phoneNumber);
        } else {
            form.resetFields();
        }
    }, [form, employeeData]);


    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border py-[20px] px-[5px]">
        <BookingForm
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            layout="horizontal"
            className="w-full" form={form} name="createCustomer" childNode={childForm} />
    </Wrapper>
}
