import React from "react"
import styled from "styled-components"
import { EStatusGiftCard, TGiftCardSearch } from "./type";
import classNames from 'classnames';

const Status = styled.div`
    &.active {
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 50%;
            height: 4px;
            border-radius: 0px 0px 4px 4px;
            background-color: #007faa;
        }
    }
`;

type TFilterStatusProps = {
    status: EStatusGiftCard | undefined;
    setStatus: (value: EStatusGiftCard) => void;
    code: string;
    onChangeFilter: (value: TGiftCardSearch) => void;
}
const STATUS = [
    {
        label: "All",
        value: undefined,
    },
    {
        label: "Redeemable",
        value: EStatusGiftCard.REDEEMABLE,
    },
    {
        label: "Full",
        value: EStatusGiftCard.FULL,
    },
    {
        label: "Partial",
        value: EStatusGiftCard.PARTIAL,
    },
    {
        label: "Deactivated",
        value: EStatusGiftCard.DEACTIVATED,
    },
    {
        label: "Expired",
        value: EStatusGiftCard.EXPIRED,
    },
];
export const FilterStatus: React.FC<TFilterStatusProps> = ({
    status,
    setStatus,
    code,
    onChangeFilter,
}) => {
    const onToggle = React.useCallback((value: any) => {
        setStatus(value);
        const newStatues = value === undefined ? [] : [value];
        const newParams: TGiftCardSearch = {
            code: code,
            statuses: newStatues,
        };
        onChangeFilter(newParams);
    }, [setStatus, onChangeFilter]);

    const renderStatus = React.useMemo(() => {
        return STATUS.map((item, index) => {
            return <Status
                key={index} 
                onClick={() => onToggle(item.value)}
                className={classNames(
                    "relative cursor-pointer p-[8px_24px] text-body-medium",
                    "flex items-center justify-center",
                    {
                        "text-primary active": item.value === status
                    },
                    {
                        "text-low-em": item.value !== status
                    }
                )}>
                {item.label}
            </Status>

        })
    }, [status, onToggle]);

    return <div className="flex items-center justify-start bg-white border-b border-solid border-outline-med rounded-t-[12px]">
        {renderStatus}
    </div>
}
