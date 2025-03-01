import { Direction, SortFieldProperty } from "../../api/user/type";
import { UserEntity } from "../customers/type";

export enum EStatusGiftCard {
    REDEEMABLE = 'REDEEMABLE',
    FULL = 'FULL',
    PARTIAL = 'PARTIAL',
    DEACTIVATED = 'DEACTIVATED',
    EXPIRED = 'EXPIRED',
}

export const StatusGiftCardMapping = {
    [EStatusGiftCard.REDEEMABLE]: 'Redeemable',
    [EStatusGiftCard.FULL]: 'Full',
    [EStatusGiftCard.PARTIAL]: 'Partial',
    [EStatusGiftCard.DEACTIVATED]: 'Deactivated',
    [EStatusGiftCard.EXPIRED]: 'Expired',
}

export const StatusGiftCardMappingColor = {
    [EStatusGiftCard.REDEEMABLE]: '#0BAA60',
    [EStatusGiftCard.FULL]: 'blue',
    [EStatusGiftCard.PARTIAL]: 'orange',
    [EStatusGiftCard.DEACTIVATED]: '#FF4D4F',
    [EStatusGiftCard.EXPIRED]: 'gray',
}

export enum ExpirationDate {
    EXPIRED = 'EXPIRED',
    NOT_EXPIRED = 'NOT_EXPIRED',
};

export type TGiftCardRequest = {
    giftCode: string;
    initialValue?: number;
    expirationDate?: number;
    notes?: string;
    customers?: string[];
};

export type TCustomers = {
    customer: UserEntity;
    hasRedeemed: boolean;
};

export type TGiftCard = {
    id: string;
    giftCode: string;
    hasExpirationDate: boolean;
    expirationDate: string;
    initialBalance: number;
    createdBy: string;
    notes: string;
    status: EStatusGiftCard;
    customers: TCustomers[];
};

export type TGiftCardEntity = {
    uuid: string;
    id: string;
    giftCode: string;
    status: EStatusGiftCard;
    customerId: string;
    customerName: string;
    isRedeemed: boolean;
    dateIssued: string;
    initialValue: number;
    createdBy: string;
};

export type TGiftCardResponse = {
    content: TGiftCardEntity[];
    direction: Direction;
    page: number;
    property: SortFieldProperty;
    size: number;
    totalPages: number;
    totalElements: number;

    code?: string;
    statuses?: EStatusGiftCard[];
};

export type TGiftCardSearch = {
    code: string;
    statuses: EStatusGiftCard[];
};

export type TGiftCardBalancesSearch = {
    customerId: string;
};