import { ApiInstance } from "..";
import { USER_ROLES } from "../../utils/constants";
import { convert2QueryString } from "../../utils/convert2QueryString";
import { SearchPayloadUsers, SearchQueryParams, TCheckInCustomer, TExportOrderSearch, TOrder, TPeriod, TSearchOrder, TUpdateOrder, TUserRequest } from "./type";

export type User = {
    firstName: string;
    lastName: string;
    id: string;
    phoneNumber: string;
    role: string;
    userId: string;
}

export const updateUserInfo = (userInfo: Partial<User>) => {
    const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token;
    const instance = ApiInstance.getInstance();
    ApiInstance.setToken(token);

    return instance.put("/api/v1/users/me", userInfo, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getUsers = (queryParams: SearchQueryParams, payload: SearchPayloadUsers) => {
    const requestURL = "/api/v1/users/search?" + convert2QueryString(queryParams);
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const getCustomers = (queryParams: SearchQueryParams, payload: SearchPayloadUsers) => {
    const requestURL = "/api/v1/users/search?" + convert2QueryString(queryParams);
    const newPayload = {
        ...payload,
        userRoles: [USER_ROLES.ROLE_CUSTOMER]
    };
    return ApiInstance.getInstance().post(requestURL, newPayload);
}

export const getNailTechnician = (queryParams: SearchQueryParams, payload: SearchPayloadUsers) => {
    const requestURL = "/api/v1/users/search?" + convert2QueryString(queryParams);
    const newPayload = {
        ...payload,
        userRoles: [USER_ROLES.EMPLOYEE]
    };
    return ApiInstance.getInstance().post(requestURL, newPayload);
}

export const getEmployees = (queryParams: SearchQueryParams, payload: SearchPayloadUsers) => {
    const requestURL = "/api/v1/users/search?" + convert2QueryString(queryParams);
    const newPayload = {
        ...payload,
        userRoles: [USER_ROLES.EMPLOYEE]
    };
    return ApiInstance.getInstance().post(requestURL, newPayload);
}

export const getNailServices = (name: string, page: number, size: number) => {
    const queryParams = {
        page,
        size
    };
    const requestURL = "/api/v1/nail-services/search?" + convert2QueryString(queryParams);
    return ApiInstance.getInstance().post(requestURL, { name });
}

export const getUserInfo = (accessToken?: string) => {
    if (accessToken) {
        ApiInstance.setToken(accessToken);
        return ApiInstance.getInstance().get("/api/v1/users/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    return ApiInstance.getInstance().get("/api/v1/users/me");
}

export const changePasswordAPI = (currentPassword: string, newPassword: string) => {
    return ApiInstance.getInstance().put("/api/v1/users/me/change-my-password", {
        currentPassword,
        newPassword
    });
}

export const saveCustomer = (customer: TUserRequest) => {
    return ApiInstance.getInstance().post("/api/v1/customers", customer);
}

export const saveEmployee = (employee: TUserRequest) => {
    const payload = {
        ...employee,
        role: USER_ROLES.EMPLOYEE
    };
    return ApiInstance.getInstance().post("/api/v1/users", payload);
}

export const updateUser = (id: string, user: TUserRequest) => {
    return ApiInstance.getInstance().put(`/api/v1/users/${id}`, user);
}

export const deleteUser = (id: string) => {
    return ApiInstance.getInstance().delete(`/api/v1/users/${id}`);
};

export const checkInCustomer = (customerId: string, payload: TCheckInCustomer) => {
    return ApiInstance.getInstance().post(`/api/v1/customers/${customerId}/check-in`, payload);
}

export const searchOrders = (queryParams: SearchQueryParams, payload: TSearchOrder) => {
    const requestURL = "/api/v1/orders/search?" + convert2QueryString(queryParams);
    const statuses = payload.statuses?.length === 1 && payload.statuses[0] === 'ALL' ? [] : payload.statuses;
    const newPayload = {
        ...payload,
        statuses
    };
    return ApiInstance.getInstance().post(requestURL, newPayload);
}

export const saveCheckOutCustomer = (customerId: string, payload: TOrder) => {
    return ApiInstance.getInstance().post(`/api/v1/customers/${customerId}/check-out`, payload);
}

export const assignTechnician = (orderId: string, technicianId: string) => {
    return ApiInstance.getInstance().put(`/api/v1/orders/${orderId}/assign-technician/${technicianId}`);
}

export const cancelOrderService = (orderId: string) => {
    return ApiInstance.getInstance().put(`/api/v1/orders/${orderId}/cancel`);
}

export const getOrderStatistics = () => {
    return ApiInstance.getInstance().get("/api/v1/statistics/order");
}

export const updateOrder = (orderId: string, payload: TUpdateOrder) => {
    return ApiInstance.getInstance().put(`/api/v1/orders/${orderId}`, payload);
}

export const getSaleAnalytics = (period: TPeriod) => {
    return ApiInstance.getInstance().get(`/api/v1/statistics/sale-analystics?period=${period}`);
}

export const getTotalRevenue = () => {
    return ApiInstance.getInstance().get(`/api/v1/statistics/total-revenue`);
}

export const exportUser = (userRoles: string[]) => {
    return ApiInstance.getInstance().post(`/api/v1/users/report`, { userRoles }, {
        responseType: 'blob',
    });
}

export const exportOrder = (payload: TExportOrderSearch) => {
    return ApiInstance.getInstance().post(`/api/v1/orders/report`, payload, {
        responseType: 'blob',
    });
}