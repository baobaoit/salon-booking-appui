import React from "react";
import { UserEntity } from "./type";

type GeneralInfoCustomerProps = {
    customerSelected: UserEntity;
}

export const GeneralInfoCustomer: React.FC<GeneralInfoCustomerProps> = ({
    customerSelected
}) => {

    return <div className="flex flex-col gap-[15px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full">
            <h4 className=" text-title-semi-bold">
                General information
            </h4>
        </div>
        <div className="flex w-full flex-col gap-[20px]">
            <div className="grid grid-cols-3 w-full gap-[60px]">
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        First Name
                    </label>
                    <span className="font-bold">
                        {customerSelected.firstName}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        Last Name
                    </label>
                    <span className="font-bold">
                        {customerSelected.lastName}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        Phone Number
                    </label>
                    <span className="font-bold">
                        {customerSelected?.phoneNumber}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-3 w-full gap-[60px]">
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        Gender
                    </label>
                    <span className="font-bold">
                        {customerSelected?.gender}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        Birth Date
                    </label>
                    <span className="font-bold">
                        {customerSelected?.dob || 'N/A'}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs">
                        Email Address
                    </label>
                    <span className="font-bold">
                        {customerSelected?.email || 'N/A'}
                    </span>
                </div>
            </div>
        </div>

    </div>
}
