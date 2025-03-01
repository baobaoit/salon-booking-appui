import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import 'react-phone-number-input/style.css';
// import PhoneInput from "react-phone-number-input/input";
import PhoneInput, { type Value } from 'react-phone-number-input'

const WrapperInput = styled.div`
  input {
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
    color: #110C22;
    border: 1px solid #ECECED;
    padding: 10px;
    width: 100%;
    border-radius: 8px;
    &:focus {
      border-color: #007faa;
      box-shadow: 0px 0px 0px 4px #e6f0fe, 0px 2px 4px 0px rgba(17, 12, 34, 0.12);
      outline: 0;
      background-color: var(--ant-input-active-bg);
    }
  }
`;

type BookingPhoneNumberProps = {
  value: string | undefined;
  onChange: (value: string) => void;
};

export const BookingPhoneNumber: React.FC<BookingPhoneNumberProps> = ({
  value,
  onChange,
}) => {
  const [valueControl, setValueControl] = React.useState<Value>(value as Value);
  React.useEffect(() => {
    if (value && value.indexOf('-') !== -1) {
      const newValueTemp = value.replace(/-/g, '');
      setValueControl(`+1${newValueTemp}` as Value);
    }
  } , [value]);
  return (
    <WrapperInput
      className={classNames([
        "relative",
      ])}
    >
      <PhoneInput
          country="US"
          value={valueControl}
          onChange={(val: any) => {
            if (val === undefined) return;
            onChange(val);
          }}
      />
    </WrapperInput>
  );
};
