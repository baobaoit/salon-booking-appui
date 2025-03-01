import React from "react"
import { Register } from "./register"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/slices/appInfo"
import { isExistedEmailApi, registerApi } from "../../../api/auth"
import { EnterPassword } from "../components/password";
import styled from "styled-components";
import classNames from "classnames";

const Wrapper = styled.div`
    background-color: #005984;
    background-image: url("/images/bg-pattern.png");
`;

export const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();
    const [registerStep, setRegisterStep] = React.useState<number>(1);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [otpErrorMessage, setOtpErrorMessage] = React.useState<string>("");
    const navigate = useNavigate();

    const onRegister = async (password: string) => {
        dispatch(setLoading(true));
        try {
            await registerApi(email, password);
            setRegisterStep(3)
        } catch (e: any) {
            console.error(e)
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const onEnterEmail = async (email: string) => {
        setEmailError("");
        setEmail(email);
        dispatch(setLoading(true));
        try {
            const isExisted = await isExistedEmailApi(email);
            if (isExisted) {
                setEmailError("Email is existed");
            } else {
                setRegisterStep(2)
            }
        } catch (e) {
            console.error(e)
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    const onEnterPassword = (password: string) => {
        setPassword(password);
        onRegister(password)
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
            <div className="shadow-e-03 w-[478px] p-[32px] flex flex-col gap-[24px] rounded-[12px] overflow-hidden box-border bg-white">
                <div className="shadow-e-03 bg-white rounded-[12px] overflow-hidden box-border">
                    {registerStep === 1 && <Register
                        errorMessage={
                            emailError
                        }
                        onSubmit={onEnterEmail}
                    />}
                    {registerStep === 2 && <EnterPassword
                        onSubmit={onEnterPassword}
                        errorMessage=""
                    />}
                </div>
            </div>
        </Wrapper>
    )
}
