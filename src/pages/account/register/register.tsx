import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Anchor } from "antd";
import styled from "styled-components";
import { isValidEmail } from "../../../utils";
import { BookingInput } from "../../../components/form/input";
import { ICAlert, ICUserV2 } from "../../../icons";
import { BookingButton } from "../../../components/button";

const WrapperLink = styled(Anchor.Link)`
    border: 0;
    padding: 0;
    margin-top: -2px;
    a {
        color: #0084FF;
    }
`;

type RegisterProps = {
    errorMessage?: string;
    onSubmit: (email: string) => void;
}
export const Register: React.FC<RegisterProps> = ({
    errorMessage = "",
    onSubmit
}) => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>("");
    const [emailError, setEmailError] = React.useState<string>("");
    const [isAccept, setIsAccept] = React.useState<boolean>(false);
    const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
    const canNext = React.useMemo(() => {
        return (email.length > 0 && isValidEmail(email) && email.length <= 50);
    }, [email]);

    const onGoogleResponse = () => {

    }
    const onNext = () => {
        setIsSubmit(true);
        if(!isAccept) return;
        setEmailError("");
        if(canNext){
            onSubmit(email);
        }else{
            if(!email) setEmailError("Email is required");
            else if (email.length > 255) setEmailError("Email is too long");
            else setEmailError("Email is invalid");
        }
    }

    React.useEffect(() => {
        if(email) setEmailError('');
    }
    , [email]);

    const hasErrorEmail = React.useMemo(() => {
        return isSubmit && (!email || !!emailError || !!errorMessage);
    }, [isSubmit, email, emailError, errorMessage]);

    return (
        <div className="flex flex-col p-[32px] max-w-[466px] gap-[48px]">
            {/* <div className="flex justify-center">
                <img src="/images/logo-login.jpg" alt="logo" />
            </div> */}
            <h3 className="text-standard-semi-bold text-primary-bold text-center">
                Sign up
            </h3>
            <div className="flex flex-col gap-[28px]">
                <div className="space-y-1">
                    <BookingInput
                        isError={hasErrorEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="large"
                        placeholder="Email"
                        maxLength={50}
                        prefix={hasErrorEmail ? <ICAlert /> : <ICUserV2 />}
                    />
                    {(!canNext || !!email) && <div className="pt-2 font-medium text-xs text-error-500">{emailError || errorMessage }</div>}
                </div>
                <BookingButton onClick={onNext} disabled={!isAccept}>
                    Continue
                </BookingButton>
                <div className="text-center text-body text-high-em">
                    Ready to join us? <Link to="/login" className="pl-2 text-info underline font-medium">Login</Link>
                </div>
            </div>

        </div>
    )
}
