import { AutoComplete, Button, Form, SelectProps } from "antd"
import React from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { TNailService } from "../../api/user/type";
import { MinusCircleOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
    .ant-row {
        align-items: center;
        width: 100%;
        .ant-col {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            width: 100%;
            .ant-form-item-control-input {
                width: 100%;
            }
        }
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

const FormWrapper = styled.div`
    .ant-form-item {
        width: 100%;
        max-width: 600px;
    }
    .ant-form-item .ant-form-item-control-input-content,
    ant-form-item-control-input-content {
        display: flex;
        flex-direction: row;
    }
    .ant-form-item .ant-form-item-control-input {
        align-items: flex-start;
        flex-direction: row;
    }
    .ant-form-horizontal .ant-form-item-control {
        margin-left: 0;
    }
`;

type AddServicesProps = {
    nailServicesSelected: TNailService[];
    setNailServicesSelected: React.Dispatch<React.SetStateAction<TNailService[]>>;
    setServiceIds: React.Dispatch<React.SetStateAction<string[]>>;
    nailServices: TNailService[];
    setNailServices: React.Dispatch<React.SetStateAction<TNailService[]>>;
}
export const AddServices: React.FC<AddServicesProps> = ({
    nailServicesSelected,
    setNailServicesSelected,
    setServiceIds,
    nailServices,
    setNailServices,
}) => {
    const [nailServicesOptions, setNailServicesOptions] = React.useState<SelectProps<object>['options']>([]);

    const onSelectedService = React.useCallback((value: string, index: number) => {
        const newService = nailServices.find(service => {
            const fullValue = `${service.name} ${service.price}`;
            return fullValue === value;
        });
        if (newService) {
            const newServices = [...nailServicesSelected];
            newServices[index] = newService;
            setNailServicesSelected(newServices);
            // set values for options
            setNailServicesOptions(nailServices.filter((item: any) => {
                const fullValue = `${item.name} ${item.price}`;
                return newServices.map((service) => `${service.name} ${service.price}`).indexOf(fullValue) === -1;
            }));
            setServiceIds(newServices.map((service) => service.id));
        }
    } , [nailServices, nailServicesSelected]);

    const onRemoveService = React.useCallback((value: number) => {
        const newServices = nailServicesSelected.filter((item, index) => index !== value);
        setNailServicesSelected(newServices);
        // set values for options
        setNailServicesOptions(nailServices.filter((item: any) => {
            const fullValue = `${item.name} ${item.price}`;
            return newServices.map((service) => `${service.name} ${service.price}`).indexOf(fullValue) === -1;
        }));
        setServiceIds(newServices.map((service) => service.id));
    } , [nailServices, nailServicesSelected]);

    React.useEffect(() => {
        setNailServicesOptions(nailServices.filter((item: any) => {
            const fullValue = `${item.name} ${item.price}`;
            return nailServicesSelected.map((service) => `${service.name} ${service.price}`).indexOf(fullValue) === -1;
        }));
    }, [nailServices, nailServicesSelected]);


    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border py-[10px] px-[5px]">
        <div className="flex flex-col w-full gap-[10px]">
            <div className="text-body-semi-bold underline">Service order list</div>
            <div className="flex flex-col items-start gap-[20px]">
                <FormWrapper className="flex flex-col gap-[10px] w-full items-center">
                    <Form.List
                        name="services"
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={null}
                                        required={false}
                                        key={field.key}
                                        style={{ 
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        <span className="flex items-center mr-3 text-center">{index + 1}.</span>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            style={{ width: '100%' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input this field.",
                                                },
                                            ]}
                                            noStyle
                                        >   
                                            <AutoComplete
                                                options={nailServicesOptions}
                                                placeholder="Search nail services"
                                                filterOption={(inputValue, option) =>
                                                    nailServicesOptions!.map((item: any) => item.value).indexOf(inputValue) !== -1
                                                }
                                                onSelect={(value) => {
                                                    onSelectedService(value, index);
                                                }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="ml-3"
                                                onClick={() => {
                                                    remove(field.name);
                                                    onRemoveService(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                {errors?.length > 0 && <Form.Item className="items-start">
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>}

                                <Form.Item className="items-start">
                                    <Button
                                        type="dashed"
                                        style={{ width: '130px' }}
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add more
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </FormWrapper>
            </div>
        </div>
    </Wrapper>
}
