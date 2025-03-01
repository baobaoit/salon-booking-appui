import React from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../../../utils";
import { ICNext, ICUserV2 } from "../../../icons";
import { BookingButton } from "../../../components/button";
import { BookingInput } from "../../../components/form/input";
import { Navigator } from "../../../components/navigator";

type EnterEmailProps = {
    isEmailNotFound?: boolean;
    onSubmit: (email: string) => void;
}
export const EnterEmail: React.FC<EnterEmailProps> = ({
    isEmailNotFound = false,
    onSubmit
}) => {
    const [email, setEmail] = React.useState<string>("");
    const isValid = React.useMemo(() => {
        return email.length > 0 && isValidEmail(email) && email.length <= 50;
    }, [email]);
    
    return (
        <div className="flex flex-col gap-[48px] p-[48px] min-w-[478px]">
            <Navigator
                current={1}
                total={3}
            />
            <div className="flex flex-col gap-[8px]">
                <h3 className="text-center text-heading-5-bold text-high-em">
                    <div>
                        Input email or username to find
                    </div>
                    <div>
                        your account
                    </div>
                </h3>
                <div className="text-center text-med-em text-sub">
                    We will send you a link to reset your password <br /> to your email
                </div>
            </div>
            <div className="flex flex-col gap-[24px]">
                <div className="space-y-1">
                    <BookingInput
                        isError={isEmailNotFound}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="large"
                        maxLength={50}
                        placeholder="Email"
                        prefix={<ICUserV2 width={24} height={24} fill="var(--icon-low-em)" />}
                    />
                    <div className="pt-2 font-medium text-xs text-error-500">{isEmailNotFound ? "Account not found" : ""}</div>
                </div>
                <BookingButton
                    disabled={!isValid}
                    onClick={onSubmit.bind(this, email)}
                >
                    <div className="space-x-2 flex items-center justify-center">
                        <span>
                            Continue
                        </span>
                        <ICNext fill={!isValid ? '#D9D8DC' : 'white'} />
                    </div>
                </BookingButton>
            </div>

            <div className="text-body text-center">
                <Link to="/login">
                    <a href="#" title="link" className="text-info-500 underline text-body">
                        Return to login
                    </a>
                </Link>
            </div>
        </div>
    )
}
