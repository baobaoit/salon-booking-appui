import { ApiInstance } from "..";
import { PRICE_TYPE } from "../../utils/constants";
import { convert2QueryString } from "../../utils/convert2QueryString";
import { Direction, SearchQueryParams, SortFieldProperty, SortProperty } from "../user/type";

export type TSearchGroup = {
    name: string;
}

export type TGroupParams = {
    name: string;
}

export type TGroup = {
    id: string;
    name: string;
}

export type TGroupResponse = {
    content: TGroup[];
    direction: Direction;
    page: number;
    property: SortFieldProperty;
    size: number;
    totalPages: number;
    totalElements: number;
}

// Nail services
export type TNailServices = {
    group: TGroup;
    id: string;
    name: string;
    price: string;
    status?: string;
    startPrice?: number;
    endPrice?: number | null;
    priceType?: string | PRICE_TYPE;
}

export type TNailServicesResponse = {
    content: TNailServices[];
    direction: Direction;
    page: number;
    property: SortFieldProperty;
    size: number;
    totalPages: number;
    totalElements: number;
}

export type TSearchNailServices = {
    name: string;
    startPrice?: string;
    endPrice?: string;
    priceType?: string;
    groupId?: string;
}

export type TNailServiceParams = {
    name: string;
    startPrice: number;
    endPrice: number;
    priceType?: string;
    groupId: string;
}

export const getGroups = (queryParams: SearchQueryParams, payload: TSearchGroup) => {
    const requestURL = "/api/v1/groups/search?" + convert2QueryString(queryParams);
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const createGroup = (payload: TGroupParams) => {
    const requestURL = "/api/v1/groups";
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const updateGroup = (id: string, payload: TGroupParams) => {
    const requestURL = `/api/v1/groups/${id}`;
    return ApiInstance.getInstance().put(requestURL, payload);
}

export const deleteGroup = (id: string) => {
    const requestURL = `/api/v1/groups/${id}`;
    return ApiInstance.getInstance().delete(requestURL);
}

export const getGroup = (id: string) => {
    const requestURL = `/api/v1/groups/${id}`;
    return ApiInstance.getInstance().get(requestURL);
}

export const searchGroups = (name: string) => {
    const queryParams: SearchQueryParams = {
        page: 0,
        size: 10,
        direction: Direction.DESC,
        property: SortProperty.CREATED_DATE,
    }
    const requestURL = "/api/v1/groups/search?" + convert2QueryString(queryParams);
    return ApiInstance.getInstance().post(requestURL, {
        name
    });
}

// Nail services
export const getNailServices = (queryParams: SearchQueryParams, payload: TSearchNailServices) => {
    const requestURL = "/api/v1/nail-services/search?" + convert2QueryString(queryParams);
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const createNailService = (payload: TNailServiceParams) => {
    const requestURL = "/api/v1/nail-services";
    return ApiInstance.getInstance().post(requestURL, payload);
}

export const updateNailService = (id: string, payload: TNailServiceParams) => {
    const requestURL = `/api/v1/nail-services/${id}`;
    return ApiInstance.getInstance().put(requestURL, payload);
}

export const deleteNailService = (id: string) => {
    const requestURL = `/api/v1/nail-services/${id}`;
    return ApiInstance.getInstance().delete(requestURL);
}

export const getNailService = (id: string) => {
    const requestURL = `/api/v1/nail-services/${id}`;
    return ApiInstance.getInstance().get(requestURL);
}