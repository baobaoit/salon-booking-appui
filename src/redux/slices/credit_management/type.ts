import { Direction, SortFieldProperty } from "../../../api/user/type";

export type TCreditManagement = {
    customerId: string;
    customerName: string;
    availableCredit: number;
    totalCredit: number;
    availableNoGiftCard: number;
    redeemNoGiftCard: number;
}

export type TCreditManagementResponse = {
    content: TCreditManagement[];
    direction: Direction;
    page: number;
    property: SortFieldProperty;
    size: number;
    totalPages: number;
    totalElements: number;
}

export type TCustomerCredit = {
    customerId: string;
    customerName: string;
    totalCredit: number;
    availableCredit: number;
    totalNoGiftCard: number;
    availableNoGiftCard: number;
    redeemNoGiftCard: number;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
}