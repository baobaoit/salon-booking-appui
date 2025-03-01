import { User } from "../../api/user";
import { Direction, EOrderStatus, SortFieldProperty, SortProperty, TNailService } from "../../api/user/type";

export type TStatus = "ACTIVE" | "DELETED";

export interface IPagination {
    page: number; 
    limit: number;
    totalPages: number;
    totalElements: number;
    direction?: Direction;
    property?: SortProperty;
    size?: number;
}

export type UserEntity = User & {
    dob?: string;
    gender?: string;
    email?: string;
    createdAt?: string;
    updatedAt?: string;
    status?: TStatus;
    password?: string;
    hasRedeemed?: boolean;
};

export type UserResponse = {
    content: UserEntity[];
    direction: Direction;
    page: number;
    property: SortFieldProperty;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface ISearchCustomers {
    page: number;
    size: number;
    direction?: string;
    property?: string;
    userRole?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;

    code?: string;
    statuses?: string;
}

export type TCheckoutCustomer = {
    id: string;
    clientName: string;
    nailTechnician: UserEntity;
    clientNotes: string;
    creationTime: string;
    status: EOrderStatus;
    totalPrice: string;
    checkOutNotes: string;
    services: TNailService[];
    discount?: number;
    customerId?: string;
    checkOutTime?: string;
}

export enum EPaymentMethod {
    GIFT_CARD_BALANCE = "GIFT_CARD_BALANCE",
    OTHER = "OTHER"
};

export type TRedeemGiftCode = {
    giftCode: string;
};


export type TGiftCardBalances = {
    date: string;
    description: string;
    orderId: string;
    giftCardId: string;
    activityType: string;
    amount: number;
    closingBalance: number;
    uuid: string;
};