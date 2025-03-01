import { ApiInstance } from "..";

export const loginApi = (userName: string, password: string ) => {
  return ApiInstance.getInstance().post("/api/v1/auth/login", {
    username: userName,
    password,
  });
};

export const registerApi = (email: string, password: string) => {
  return ApiInstance.getInstance().post("/api/auth/signup", {
    email,
    password,
  });
};

export const forgotPasswordApi = (email: string) => {
  return ApiInstance.getInstance().post("/api/auth/forgot-password", { email });
};

export const resetPasswordApi = (
  email: string,
  newPassword: string,
  token: string
) => {
  return ApiInstance.getInstance().put(
    "/api/auth/forgot-password/reset-password",
    { email, newPassword, secondOtp: token }
  );
};

export const isExistedEmailApi = async (email: string) => {
  try {
    const result = await ApiInstance.getInstance().post(
      `/api/auth/checking-existed-user`,
      {
        email,
      }
    );
    return result.data.isExisted;
  } catch (err) {
    throw err;
  }
};

export const logout = () => {
  return ApiInstance.getInstance().post("/api/auth/logout", {});
};
