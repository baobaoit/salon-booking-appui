import React from "react"
import { EnterEmail } from "./email"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLoading } from "../../../redux/slices/appInfo"
import { forgotPasswordApi, resetPasswordApi } from "../../../api/auth"
import { EnterPassword } from "../components/password"
import styled from "styled-components"
import classNames from "classnames"
import { useGeneralPageData } from "../../general"

const Wrapper = styled.div`
    background-color: #005984;
    background-image: url("/images/bg-pattern.png");
`;

export const ForgotPasswordPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [token, setToken] = React.useState<string>("");
    const [forgotStep, setForgotStep] = React.useState<number>(1);
    const [email, setEmail] = React.useState<string>("");
    const [otpErrorMessage, setOtpErrorMessage] = React.useState<string>("");
    const [isEmailNotFound, setIsEmailNotFound] = React.useState<boolean>(false);
    const [isBlockResend, setIsBlockResend] = React.useState<boolean>(false);

    const { apiNotification } = useGeneralPageData();

    const onSubmitEmail = async (email: string) => {
        dispatch(setLoading(true));
        try {
            setEmail(email);
            setOtpErrorMessage("");
            setIsBlockResend(false);
            await forgotPasswordApi(email);
            setForgotStep(2)
        } catch (e: any) {
            const status = e.response?.status;
            if (status === 404) { // Notfound email
                setIsEmailNotFound(true);
            }
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    const onResendOTP = async () => {
        dispatch(setLoading(true));
        try {
            await forgotPasswordApi(email);
        } catch (e) {
            console.error(e)
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const onSubmitNewPassword = async (password: string) => {
        dispatch(setLoading(true));
        try {
            await resetPasswordApi(email, password, token);
            apiNotification.success({
                message: "Success",
                description: "Change password success",
                placement: "topRight"
            })
            navigate("/login")
        } catch (e: any) {
            const status = e.response.status;
            if (status === 400) { // Invalid OTP
                const message = e.response.data.errorMessage;
                if (message === "New password does not match old password") setErrorMessage("Password does not match old password");
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
            <div className="flex w-screen h-screen overflow-x-hidden items-center justify-center rounded-[12px]">
                <div className="shadow-e-03 bg-white rounded-[12px] overflow-hidden box-border">
                    {forgotStep === 1 && <EnterEmail
                        isEmailNotFound={isEmailNotFound}
                        onSubmit={onSubmitEmail}
                    />}
                    {forgotStep === 2 && <EnterPassword
                        errorMessage={errorMessage}
                        onSubmit={onSubmitNewPassword}
                    />}
                </div>
            </div>
        </Wrapper>
    )
}
