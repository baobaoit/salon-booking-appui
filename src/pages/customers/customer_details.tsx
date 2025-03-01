import React from "react";
import { Tabs } from "antd";
import { UserEntity } from "./type";
import { ActivityCustomer } from "./activity_customer";
import { GeneralInfoCustomer } from "./general_info";

type CustomerDetailsProps = {
    customerSelected: UserEntity;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({
    customerSelected
}) => {
    const [tabSelecetd, setTabSelected] = React.useState<string>('general');
    const tabOptions = [
        {
            label: 'General information',
            key: 'general',
            children: <GeneralInfoCustomer customerSelected={customerSelected} />
        },
        {
            label: 'Gift card activity',
            key: 'gift-card',
            children: <ActivityCustomer customerSelected={customerSelected} />
        },
    ];

    const onChangeTabs = (key: string) => {
        setTabSelected(key);
    };

    return <div className="flex flex-col gap-[15px] w-full overflow-hidden h-full items-start box-border">
        <div>
            <h4 className=" text-title-semi-bold">
                Customer details
            </h4>
        </div>
        <Tabs
            tabPosition="left"
            style={{ width: '100%' }}
            activeKey={tabSelecetd}
            onChange={(key) => onChangeTabs(key)}
            items={tabOptions}
        />
    </div>
}
