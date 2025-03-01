import { AutoComplete, Button, Form, FormInstance, SelectProps } from "antd"
import React from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { TNailService } from "../../api/user/type";
import { MinusCircleOutlined } from "@ant-design/icons";
import debouce from 'lodash/debounce';
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { DEFAULT_PAGE_SIZE_SERVICES } from "../../utils/constants";
import { getNailServices } from "../../api/user";

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

type OrderServicesProps = {
    nailServices: TNailService[];
    formOrderServices: FormInstance;
    isRequiredServices: boolean;
    setServiceIds: React.Dispatch<React.SetStateAction<string[]>>;
}
export const OrderServices: React.FC<OrderServicesProps> = ({
    nailServices,
    formOrderServices,
    isRequiredServices = true,
    setServiceIds,
}) => {
    const dispatch = useDispatch();
    const [nailServicesSelected, setNailServicesSelected] = React.useState<TNailService[]>([]);
    const [nailServicesOptions, setNailServicesOptions] = React.useState<SelectProps<TNailService>['options']>([]);
    const [keepNailServicesOptions, setKeepNailServicesOptions] = React.useState<SelectProps<TNailService>['options']>([]);

    const onSelectedService = React.useCallback((value: string, index: number) => {
        if (nailServicesOptions === null) {
            return;
        }
        const newService = nailServicesOptions?.find(service => {
            return service.label === value;
        });
        if (newService) {
            setNailServicesSelected(prev => {
                const newServices: TNailService = {
                    ...newService,
                    label: `${newService.name} ${newService.price}`,
                    id: newService.id,
                    name: newService.name,
                    price: newService.price,
                };
                return [...prev, newServices];
            });
            setNailServicesOptions(keepNailServicesOptions?.filter((item: any) => {
                const fullValue = `${item.name} ${item.price}`;
                return nailServicesSelected.map((service) => `${service.name} ${service.price}`).indexOf(fullValue) === -1;
            }));
            setServiceIds(prev => {
                return [...prev, newService.id];
            });
        }
    } , [keepNailServicesOptions, nailServicesOptions, nailServicesSelected, setServiceIds]);

    const onRemoveService = React.useCallback((value: number) => {
        const newServices = nailServicesSelected.filter((item, index) => index !== value);
        setNailServicesSelected(newServices);
        setNailServicesOptions(keepNailServicesOptions?.filter((item: any) => {
            const fullValue = `${item.name} ${item.price}`;
            return newServices.map((service) => `${service.name} ${service.price}`).indexOf(fullValue) === -1;
        }));
        setServiceIds(newServices.map((service) => service.id));
    } , [keepNailServicesOptions, nailServicesSelected, setServiceIds]);

    const loadNailServices = React.useCallback(async (name: string) => {
        const queryParams = {
            page: 0,
            size: DEFAULT_PAGE_SIZE_SERVICES
        };
        dispatch(setLoading(true));
        try {
            const { data } = await getNailServices(name, queryParams.page, queryParams.size);
            const nailServicesTemp: TNailService[] = data && data.content;
            const nailServicesTempOptions = nailServicesTemp.map((item) => {
                const fullValue = `${item.name} ${item.price}`;
                return {
                    ...item,
                    value: fullValue,
                    label: fullValue,
                    id: item.id,
                }
            });
            setKeepNailServicesOptions(nailServicesTempOptions);
            setNailServicesOptions(nailServicesTempOptions);
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, nailServicesSelected]);

    const onSearchNailService = React.useCallback(async (value: string) => {
        try {
            await loadNailServices(value);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleSearchServices = (value: string) => {
        onSearchKeywordServices(value);
    };

    const onSearchKeywordServices = React.useMemo(() => {
        return debouce(onSearchNailService, 600);
    }, [onSearchNailService]);

    React.useEffect(() => {
        return () => {
            onSearchKeywordServices.cancel();
        }
    }, [onSearchKeywordServices]);

    React.useEffect(() => {
        if (nailServices && nailServices.length > 0) {
            formOrderServices.setFieldsValue({
                services: nailServices.map((item) => {
                    return {
                        nailServices: `${item.name} ${item.price}`,
                    }
                })
            });
            setNailServicesSelected(nailServices);
            setNailServicesOptions(nailServices.map((item) => {
                const fullValue = `${item.name} ${item.price}`;
                return {
                    ...item,
                    value: fullValue,
                    label: fullValue,
                    id: item.id,
                }
            }));
            setKeepNailServicesOptions(nailServices.map((item) => {
                const fullValue = `${item.name} ${item.price}`;
                return {
                    ...item,
                    value: fullValue,
                    label: fullValue,
                    id: item.id,
                }
            }));
            setServiceIds(nailServices.map((service) => service.id));
        } else {
            setNailServicesSelected([]);
            setNailServicesOptions([]);
            setKeepNailServicesOptions([]);
            setServiceIds([]);
            formOrderServices.resetFields();
        }
    } , [formOrderServices, nailServices, setServiceIds]);

    const renderNailServicesOptions = React.useMemo(() => {
        const selectedServices = nailServicesSelected.map((service) => `${service.name} ${service.price}`);
        return nailServicesOptions?.filter((item: any) => {
            const fullValue = `${item.name} ${item.price}`;
            return selectedServices.indexOf(fullValue) === -1;
        });
    } , [nailServicesOptions, nailServicesSelected]);

    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border px-[5px]">
        <div className="flex flex-col w-full gap-[10px]">
            <div className="text-body-semi-bold underline">Services:</div>
            <div className="flex flex-col items-start gap-[20px]">
                <FormWrapper className="flex flex-col gap-[10px] w-full items-center">
                    <Form.List
                        name="services"
                        rules={isRequiredServices ? [
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('At least 1 services'));
                                    }
                                },
                            },
                        ] : []}
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
                                            name={[index, "nailServices"]}
                                            validateTrigger={['onChange', 'onBlur']}
                                            style={{ width: '100%' }}
                                            key={index}
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
                                                options={renderNailServicesOptions}
                                                className="w-full"
                                                key={field.key}
                                                showSearch
                                                popupClassName="certain-category-search-dropdown"
                                                placeholder="Search nail services"
                                                onSelect={(value) => {
                                                    onSelectedService(value, index);
                                                }}
                                                onSearch={handleSearchServices}
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
                                        onClick={() => {
                                            add();
                                        }}
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
