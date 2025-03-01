import { combineReducers } from "redux";
import appInfo from "./slices/appInfo";
import userInfo from "./slices/userInfo";
import employee from "./slices/employee";
import customer from "./slices/customer";
import group from "./slices/group";
import nail_services from "./slices/nail_services";
import gift_card from "./slices/gift_card";
import credit_management from "./slices/credit_management";

const rootReducer = combineReducers({ appInfo, userInfo, employee, customer, group, nail_services, gift_card, credit_management});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
