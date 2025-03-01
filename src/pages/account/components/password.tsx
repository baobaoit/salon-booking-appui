import React from "react";
import { Navigator } from "../../../components/navigator";
import { haveAtLeastOneLowerCase, haveAtLeastOneNumber, haveAtLeastOneUpperCase, haveUnallowedCharacters, isStrongPassword } from "../../../utils";
import { BookingInputPassword, inputPasswordProps } from "../../../components/form/input";
import { ICTick, ICVerify } from "../../../icons";
import { BookingButton } from "../../../components/button";

type EnterPasswordProps = {
    onSubmit: (password: string) => void;
    errorMessage: string;
}
export const EnterPassword: React.FC<EnterPasswordProps> = ({
    onSubmit,
    errorMessage
}) => {
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const errorSamePassword = React.useMemo(() => {
        if (password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword) {
            return "Mật khẩu không khớp";
        }
        return ""
    }, [password, confirmPassword]);

    const errorPassword = React.useMemo(() => {
        return !password.length || isStrongPassword(password) ? "" : "Có ít nhất 1 chữ HOA, 1 chữ thường và 1 ký tự số";
    }, [password]);

    const canNext = React.useMemo(() => {
        return password.length && confirmPassword.length && !errorPassword && !errorSamePassword;
    }, [password, errorPassword, confirmPassword, errorSamePassword]);

    const rules = React.useMemo(() => {
        return [{
            name: "Password does not contain special characters",
            rule: !haveUnallowedCharacters(password)
        }, {
            name: "Password length is between 6 and 20",
            rule: password.length >= 6 && password.length <= 20
        }, {
            name: "At least 1 uppercase letter",
            rule: haveAtLeastOneUpperCase(password)
        }, {
            name: "At least 1 lowercase letter",
            rule: haveAtLeastOneLowerCase(password)
        }, {
            name: "At least 1 number",
            rule: haveAtLeastOneNumber(password)
        }]
    }, [password]);

    return (
        <div className="flex flex-col gap-[48px] p-[48px] min-w-[478px]">
            <Navigator
                current={3}
                total={3}
            />
            <div className="flex flex-col gap-[8px]">
                <h3 className="text-center mb-0 text-heading-5-bold text-high-em">
                    <div>
                        Input your new password
                    </div>
                </h3>
                <div className="text-center text-sub text-med-em">
                    Your password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and no special characters
                </div>
            </div>
            <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-[16px]">
                    <div className="space-y-1">
                        <BookingInputPassword 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="large"
                                {...inputPasswordProps((!!errorPassword || !!errorMessage), undefined)}
                                maxLength={20}
                            />
                    </div>
                    <div className="space-y-1">
                        <BookingInputPassword 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                size="large"
                                {...inputPasswordProps((!!errorSamePassword || !!errorMessage), undefined)}
                                maxLength={20}
                                placeholder="Nhập lại mật khẩu"
                            />
                        <div className="pt-2 font-medium text-xs text-error-500">{errorSamePassword}</div>
                    </div>
                </div>
                {errorMessage && <div className="pt-2 font-medium text-xs text-error-500">{errorMessage}</div>}
                <div className="flex flex-col gap-[4px]">
                    {
                        rules.map((rule, index) => (
                            <div key={index} className="text-body text-high-em flex gap-[8px]">
                                <ICVerify isValid={rule.rule} />
                                <span>{rule.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <BookingButton
                        disabled={!canNext}
                        onClick={onSubmit.bind(this, password)}
                    >
                        <div className="space-x-2 flex items-center justify-center">
                            <ICTick />
                            <span>
                                Confirm
                            </span>
                        </div>
                    </BookingButton>
                </div>
            </div>
        </div>
    )
}
