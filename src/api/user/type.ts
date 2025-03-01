import { EPaymentMethod } from "../../pages/customers/type";

export enum Direction {
    ASC = 'ASC',
    DESC = 'DESC'
};

export enum DirectionControl {
    asc = 'asc',
    desc = 'desc'
};

export const DEFAULT_PAGE_SIZE = 20;

export const DirectionControlMap = {
    [Direction.ASC]: DirectionControl.asc,
    [Direction.DESC]: DirectionControl.desc
};

export enum SortProperty {
    CREATED_DATE = 'CREATED_DATE',
    ID = 'ID',
    FIRST_NAME = 'FIRST_NAME',
    LAST_NAME = 'LAST_NAME',
    USER_ID = 'USER_ID',
    PHONE_NUMBER = 'PHONE_NUMBER',
    ROLE_ID = 'ROLE_ID',
    CHECK_OUT_TIME = 'CHECK_OUT_TIME',
    creationTime = 'CREATED_DATE',
    DATE_ISSUED = 'DATE_ISSUED',

    CUSTOMER_NAME = 'CUSTOMER_NAME',
    AVAILABLE_CREDIT = 'AVAILABLE_CREDIT',
    TOTAL_CREDIT = 'TOTAL_CREDIT',
    AVAILABLE_NO_GIFT_CARD = 'AVAILABLE_NO_GIFT_CARD',
    REDEEM_NO_GIFT_CARD = 'REDEEM_NO_GIFT_CARD',

    AMOUNT = 'AMOUNT',
    CLOSING_BALANCE = 'CLOSING_BALANCE',
};

export enum SortFieldProperty {
    createdDate = 'createdDate',
    id = 'id',
    firstName = 'firstName',
    lastName = 'lastName',
    userId = 'userId',
    phoneNumber = 'phoneNumber',
    roleId = 'roleId',
    checkOutTime = 'checkOutTime',
    creationTime = 'creationTime',
    dateIssued = 'dateIssued',

    customerName = 'customerName',
    availableCredit = 'availableCredit',
    totalCredit = 'totalCredit',
    availableNoGiftCard = 'availableNoGiftCard',
    redeemNoGiftCard = 'redeemNoGiftCard',

    amount = 'amount',
    closingBalance = 'closingBalance',
};

export const SortFieldPropertyMap = {
    [SortFieldProperty.createdDate]: SortProperty.CREATED_DATE,
    [SortFieldProperty.id]: SortProperty.ID,
    [SortFieldProperty.firstName]: SortProperty.FIRST_NAME,
    [SortFieldProperty.lastName]: SortProperty.LAST_NAME,
    [SortFieldProperty.userId]: SortProperty.USER_ID,
    [SortFieldProperty.phoneNumber]: SortProperty.PHONE_NUMBER,
    [SortFieldProperty.roleId]: SortProperty.ROLE_ID,
    [SortFieldProperty.checkOutTime]: SortProperty.CHECK_OUT_TIME,
    [SortFieldProperty.creationTime]: SortProperty.creationTime,
    [SortFieldProperty.dateIssued]: SortProperty.DATE_ISSUED,

    [SortFieldProperty.customerName]: SortProperty.CUSTOMER_NAME,
    [SortFieldProperty.availableCredit]: SortProperty.AVAILABLE_CREDIT,
    [SortFieldProperty.totalCredit]: SortProperty.TOTAL_CREDIT,
    [SortFieldProperty.availableNoGiftCard]: SortProperty.AVAILABLE_NO_GIFT_CARD,
    [SortFieldProperty.redeemNoGiftCard]: SortProperty.REDEEM_NO_GIFT_CARD,

    [SortFieldProperty.amount]: SortProperty.AMOUNT,
    [SortFieldProperty.closingBalance]: SortProperty.CLOSING_BALANCE,

};

export type SearchPayloadUsers = {
    name?: string | undefined;
    phoneNumber?: string;
    userRoles?: string[];
}

export type SearchQueryParams = {
    page: number;
    size: number;
    direction: Direction;
    property: SortProperty;
}

export enum EGender {
    OTHER = 'OTHER',
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export type TUserRequest = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userId?: string;
    dob?: string;
    email?: string;
    gender: EGender;
    password?: string;
}

export type TNailService = {
    id: string;
    name: string;
    price: string;
    group?: string;
    label?: string;
};

export type TCheckInCustomer = {
    technicianId: string;
    clientNotes: string;
    services: string[];
}

export enum EOrderStatus {
    CHECK_OUT = 'CHECK_OUT',
    IN_SERVICE = 'IN_SERVICE',
    WAITING_SERVICE = 'WAITING_SERVICE',
    CANCELLED = 'CANCEL',
    ALL = 'ALL'
};

export const OrderStatusMap = {
    [EOrderStatus.CHECK_OUT]: 'Checkout',
    [EOrderStatus.IN_SERVICE]: 'In Service',
    [EOrderStatus.WAITING_SERVICE]: 'Waiting Service',
    [EOrderStatus.CANCELLED]: 'Cancelled',
    [EOrderStatus.ALL]: 'All'
};

export const OrderStatusMappingColor = {
    [EOrderStatus.IN_SERVICE]: '#1C92FF',
    [EOrderStatus.CHECK_OUT]: '#0BAA60',
    [EOrderStatus.WAITING_SERVICE]: '#E09400',
    [EOrderStatus.CANCELLED]: '#FF0000',
    [EOrderStatus.ALL]: '#000000'
}

export const OrderStatusOptions = [
    { label: 'All', value: EOrderStatus.ALL },
    { label: 'Waiting Service', value: EOrderStatus.WAITING_SERVICE },
    { label: 'In Service', value: EOrderStatus.IN_SERVICE },
    { label: 'Checkout', value: EOrderStatus.CHECK_OUT },
    { label: 'Cancelled', value: EOrderStatus.CANCELLED }
];

export enum ECustomerStatus {
    DELETED = 'DELETED',
    ACTIVE = 'ACTIVE',
};

export type TSearchOrder = {
    customerId?: string;
    statuses?: EOrderStatus[];
    customerStatuses?: ECustomerStatus[];
    fromDate?: string;
    toDate?: string;
    technicianName?: string;
    customerName?: string;
    status?: EOrderStatus;
    page?: number;
}

export type TOrder = {
    orderId: string;
    technicianId: string;
    totalPrice: number;
    services: string[];
    checkOutNotes?: string;
    discount?: number;

    paymentMethod: EPaymentMethod;
    subtotalPrice: number;
}

export type TOrderStatistics = {
    inServices: number;
    totalServices: number;
    waitingServices: number;
}

export type TUpdateOrder = {
    clientNotes?: string;
    technicianId: string;
    services?: string[];
}

export enum TPeriod {
    TODAY = 'TODAY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
}

export const PeriodMap = {
    [TPeriod.TODAY]: 'Today',
    [TPeriod.WEEKLY]: 'Weekly',
    [TPeriod.MONTHLY]: 'Monthly',
}

export const PeriodMapValue = {
    'Today': TPeriod.TODAY,
    'Weekly': TPeriod.WEEKLY,
    'Monthly': TPeriod.MONTHLY,
}

export type TSaleAnalytics = {
    revenue: number;
    totalServices: number;
    dateTime: string;
}

export type TTotalRevenue = {
    revenue: number;
    totalToday: number;
}

export type TExportOrderSearch = {
    customerId?: string;
    statuses?: EOrderStatus[];
    customerStatuses?: ECustomerStatus[];
    fromDate?: string;
    toDate?: string;
    technicianName?: string;
    customerName?: string;
};
