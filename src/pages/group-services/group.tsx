import { Form } from "antd"
import React from "react";
import { BookingForm } from "../../components/form/form";
import { FormInstance } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TGroup } from "../../api/services";
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

type GroupFormProps = {
    groupData?: TGroup | undefined;
    form: FormInstance;
}
export const GroupForm: React.FC<GroupFormProps> = ({
    groupData,
    form
}) => {
    const childForm = (
        <div className="grid gap-[10px] grid-cols-[1fr]">
            <Form.Item
                name="name"
                label="Name"
                required
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                    },
                ]}
            >
                <BookingInput 
                    hasClearIcon={true} 
                    onClearValue={() => form.setFieldsValue({ name: "" })}
                    isRequired={true} />
            </Form.Item>
        </div>
    );

    React.useEffect(() => {
        if (groupData) {
            form.setFieldsValue({
                name: groupData.name,
            });
        } else {
            form.resetFields(); 
        }
    }, [form, groupData]);


    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border py-[20px] px-[5px]">
        <BookingForm
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            layout="horizontal"
            className="w-full" form={form} name="createGroup" childNode={childForm} />
    </Wrapper>
}
