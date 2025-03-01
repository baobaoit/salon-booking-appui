import { AutoComplete, Form, Input, InputNumber, SelectProps } from "antd"
import React from "react";
import { BookingForm } from "../../components/form/form";
import { FormInstance } from "antd/lib/form/Form";
import { BookingInput } from "../../components/form/input";
import styled from "styled-components";
import dayjs from 'dayjs';
import debouce from 'lodash/debounce';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { searchGroups, TGroup, TNailServices } from "../../api/services";
import { BookingSelect } from "../../components/form/select";
import { PRICE_TYPE, PRICE_TYPE_OPTIONS } from "../../utils/constants";
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

type NailServicesFormProps = {
    nailServiceData?: TNailServices | undefined;
    form: FormInstance;
    groupServiceData: TGroup | undefined;
    groupId: string | undefined;
    priceType: PRICE_TYPE | undefined;
    setPriceType: React.Dispatch<React.SetStateAction<PRICE_TYPE | undefined>>;
    setGroupId: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export const NailServicesForm: React.FC<NailServicesFormProps> = ({
    nailServiceData,
    form,
    groupServiceData,
    groupId,
    setGroupId,
    priceType,
    setPriceType,
}) => {
    const [nailServicesOptions, setNailServicesOptions] = React.useState<SelectProps<object>['options']>([]);
    const handleSearchGroup = (value: string) => {
        onSearchKeyword(value);
    };
    const onSearchGroup = React.useCallback(async (value: string) => {
        try {
            const { data } = await searchGroups(value);
            const result = data?.content?.map((item: any) => {
                return {
                    value: item.name,
                    label: item.name,
                    id: item.id,
                }
            }) || [];
            setNailServicesOptions(result);
        } catch (e) {
            console.error(e);
        }
    }, []);
    const onSearchKeyword = React.useMemo(() => {
        return debouce(onSearchGroup, 600);
    }, [onSearchGroup]);

    React.useEffect(() => {
        return () => {
            onSearchKeyword.cancel();
        }
    }, [onSearchKeyword]);

    React.useEffect(() => {
        if (groupServiceData?.id) {
            form.setFieldsValue({ group: groupServiceData.name });
            setGroupId(groupServiceData.id);
            setNailServicesOptions([{
                value: groupServiceData.name,
                label: groupServiceData.name,
                id: groupServiceData.id,
            }]);
        } else {
            setPriceType(PRICE_TYPE.START_PRICE_ONLY);
        }
    } , [form, groupServiceData]);

    const twoPointDecimal = (value: number) => {
        return value.toFixed(2);
    };

    const hasPriceTypeInRage = React.useMemo(() => {
        return priceType === PRICE_TYPE.IN_RANGE;
    } , [priceType]);
    
    const childForm = (
        <div className="grid gap-[20px] grid-cols-[1fr]">
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
            <Form.Item
                name="group"
                label="Group"
            >
                <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    options={nailServicesOptions}
                    className="w-full"
                    showSearch
                    notFoundContent="Not found"
                    onSelect={(value) => {
                        const groupSelected = nailServicesOptions?.find((item) => item.value === value);
                        if (groupSelected) {
                            setGroupId(groupSelected.id);
                        }
                    }}
                    onSearch={handleSearchGroup}
                >
                    <Input.Search size="large" placeholder="Search group name" />
                </AutoComplete>
            </Form.Item>
            <Form.Item
                name="priceType"
                label="Price Type"
                required
                rules={[
                    {
                        required: true,
                        message: "Please input your price type!",
                    },
                ]}
            >
                <BookingSelect
                    hasFilterSort={false}
                    value={priceType}
                    options={PRICE_TYPE_OPTIONS}
                    placeholder="Select price type"
                    onChange={(value) => {
                        setPriceType(value as PRICE_TYPE);
                        form.setFieldsValue({ priceType: value });
                    }}
                />
            </Form.Item>
            <Form.Item
                name="startPrice"
                label="Start Price"
                required
                rules={[
                    {
                        required: true,
                        message: "Please input your start price!",
                    },
                ]}
            >
                <InputNumber
                    className="w-full"
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    precision={2}
                    onChange={(value) => {
                        const newValue = twoPointDecimal(value as number);
                        form.setFieldsValue({ startPrice: newValue });
                    }}
                />
            </Form.Item>
            {hasPriceTypeInRage && <Form.Item
                name="endPrice"
                label="End Price"
            >
                <InputNumber
                    className="w-full"
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    precision={2}
                    onChange={(value) => {
                        const newValue = twoPointDecimal(value as number);
                        form.setFieldsValue({ endPrice: newValue });
                    }}
                />
            </Form.Item>}
        </div>
    );

    React.useEffect(() => {
        if (nailServiceData) {
            form.setFieldsValue({
                name: nailServiceData.name,
                group: nailServiceData?.group?.name,
                startPrice: nailServiceData.startPrice,
                endPrice: nailServiceData.endPrice,
                priceType: nailServiceData?.priceType || PRICE_TYPE.START_PRICE_ONLY,
            });
            setPriceType(nailServiceData?.priceType as PRICE_TYPE || PRICE_TYPE.START_PRICE_ONLY);
        } else {
            form.resetFields(); 
        }
    }, [form, nailServiceData]);


    return <Wrapper className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border py-[20px] px-[5px]">
        <BookingForm
            labelCol={{ flex: '130px' }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            layout="horizontal"
            initialValues={{
                name: nailServiceData?.name,
                group: nailServiceData?.group?.name,
                startPrice: nailServiceData?.startPrice,
                endPrice: nailServiceData?.endPrice,
                priceType: nailServiceData?.priceType || PRICE_TYPE.START_PRICE_ONLY,
            } as any}
            className="w-full" form={form} name="createGroup" childNode={childForm} />
    </Wrapper>
}
