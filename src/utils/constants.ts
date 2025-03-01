export const WHITE_LIST_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const BACKGROUND_MAX_WIDTH = 1920;
export const BACKGROUND_MAX_HEIGHT = 1080;
export const AVATAR_MAX_WIDTH = 1080;
export const AVATAR_MAX_HEIGHT = 720;
export const EMAIL_REGEX =
  /^[A-Za-z0-9_!#$%&'*+\\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

export enum LANGUAGE {
  VN = "vn",
  EN = "en",
};

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_SIZE_SERVICES = 100;

export const USER_ROLES = {
  EMPLOYEE: "ROLE_TECHNICIAN",
  ROLE_MANAGER: "ROLE_MANAGER",
  ROLE_CUSTOMER: "ROLE_CUSTOMER",
};


export enum PRICE_TYPE {
  START_PRICE_ONLY = "START_PRICE_ONLY",
  START_PRICE_AND_ABOVE = "START_PRICE_AND_ABOVE",
  IN_RANGE = "IN_RANGE",
}

export const PRICE_TYPE_OPTIONS = [
  { label: "Start price only", value: PRICE_TYPE.START_PRICE_ONLY },
  { label: "Start price and above", value: PRICE_TYPE.START_PRICE_AND_ABOVE },
  { label: "In range", value: PRICE_TYPE.IN_RANGE },
];