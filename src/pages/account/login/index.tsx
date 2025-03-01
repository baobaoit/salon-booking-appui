import React from "react"
import { useForm } from 'antd/lib/form/Form';
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components";
import classNames from "classnames";
import { BookingButton } from "../../../components/button";
import { BookingCheckBox } from "../../../components/form/checkbox";
import { BookingForm } from "../../../components/form/form";
import { BookingInput, BookingInputPassword } from "../../../components/form/input";
import { ICAlert, ICUserV2 } from "../../../icons";
import { UserInfo } from "../../../models/user_info";
import { setLoading } from "../../../redux/slices/appInfo";
import { loginApi } from "../../../api/auth";
import { setUserInfo } from "../../../redux/actions";
import { notification as Notification } from "antd";
import { ApiInstance } from "../../../api";

const Wrapper = styled.div`
    background-color: #005984;
    background-image: url("/images/bg-pattern.png");
`;

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = Notification.useNotification();
    const [loginForm] = useForm();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    const [emailError, setEmailError] = React.useState<string>("");
    const [isEmptyPassword, isIsEmptyPassword] = React.useState<string>("");
    const [rememberToken, setRememberToken] = React.useState<boolean>(false);

    const hasError = React.useMemo(() => {
        return error?.length > 0;
    }, [error]);

    const onLogin = async () => {
        if (!email) {
            setEmailError("Username is required");
            return;
        } else {
            setEmailError("");
        }
        if (!password) {
            isIsEmptyPassword("Password is required");
            return;
        } else {
            isIsEmptyPassword("");
        }
        dispatch(setLoading(true));
        try {
            const result = await loginApi(email, password);
            api.success({
                message: "Success",
                description: "Login success",
                placement: "topRight"
            });
            const newData: UserInfo = {
                accessToken: result.data.access_token,
            };
            if (newData.accessToken) {
                ApiInstance.setToken(newData.accessToken);
                dispatch(setUserInfo({
                    token: newData.accessToken,
                }));
            }
            console.log("Login success");
            navigate("/");
        } catch (e: any) {
            const status = e.response?.status;
            const errorMessage = e.response?.data?.detail;
            if (status === 401) { 
                setError("Invalid username or password");
            } else {
                setError(errorMessage);
            }
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <Wrapper 
            className={classNames([
                "flex",
                "w-screen",
                "h-screen",
                "items-center",
                "justify-center",
            ])}
        >
            {contextHolder}
            <div className="shadow-e-03 w-[478px] p-[32px] flex flex-col gap-[24px] rounded-[12px] overflow-hidden box-border bg-white">
                <div className="flex flex-col items-center justify-center gap-[15px]">
                    <h1 className="text-[24px] font-bold">
                        Hello!
                    </h1>
                </div>
                <BookingForm form={loginForm} name="loginForm" childNode={<>
                    <div className="form flex flex-col w-full gap-[16px]">
                        <div>
                            <BookingInput
                                isError={hasError || !!emailError}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="large"
                                maxLength={50}
                                placeholder="Enter User Name"
                                prefix={hasError || !!emailError ? <ICAlert /> : <ICUserV2 fill="#C6C5CA" width={24} height={24} />}
                            />
                            <div className="pt-2 font-medium text-xs text-error-500">{emailError}</div>
                        </div>
                        <div>
                            <BookingInputPassword isError={hasError || !!isEmptyPassword}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="large"
                                maxLength={20}
                                placeholder="Enter Password"
                            />
                            <div className="pt-2 font-medium text-xs text-error-500">{error || isEmptyPassword}</div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[24px]">
                        <div className="flex items-center justify-between">
                            <BookingCheckBox
                                className="purple-checkbox"
                                checked={rememberToken} onChange={(e) => {
                                    setRememberToken(e.target.checked)
                                }}>
                                <span className="text-body text-high-em">
                                    Remember me
                                </span>
                            </BookingCheckBox>
                            <Link to="/forgot-password" className="pl-4">
                                <span className="text-body text-info-500 underline font-medium">
                                    Forgot password?
                                </span>
                            </Link>
                        </div>
                        <div>
                            <BookingButton htmlType="submit" onClick={onLogin}>
                                Login
                            </BookingButton>
                        </div>
                        <div className="flex gap-[16px] items-center justify-center text-center text-high-em text-body">
                            <span>
                                Don't have an account?
                            </span>
                            <Link to="/register" className="underline text-info-500 font-medium">
                                Register
                            </Link>
                        </div>
                    </div>
                </>} />
            </div>
        </Wrapper>
    )
}

