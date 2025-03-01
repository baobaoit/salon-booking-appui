import { Input, InputProps } from "antd";
import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import { ICAlert } from "../../icons/alert";
import { ICEye, ICEyeOff } from "../../icons/eye";
import { ICLock } from "../../icons/lock";
import { ICClose } from "../../icons";

const InputStyled = styled(Input)`
  ${({ disabled }: any) =>
    disabled &&
    `
        color: #D9D8DC;
        border-color: #ECECED !important;
        opacity: 0.4000000059604645;
    `}
`;

const InputPasswordStyled = styled(Input.Password)`
  ${({ disabled }: any) =>
    disabled &&
    `
        color: #D9D8DC;
        border-color: #ECECED !important;
        opacity: 0.4000000059604645;
    `}
`;

const WrapperInput = styled.div`
    &.has-focus {
        .clear-icon {
            svg {
                &.svgFillColor {
                    path {
                        fill: #007faa;
                    }
                }
            }
        }
    }
    &.has-disabled {
        .booking-input-control {
            &:focus,
            &:hover,
            &.ant-input-affix-wrapper-focused, .ant-input-affix-wrapper:focus {
                box-shadow: none;
            }
        }
    }
    .booking-input-control {
        color: var(--text-high-em)
        box-shadow: 0px 1px 2px -1px rgba(17, 12, 34, 0.08);
        border-color: #ECECED;
        &:hover {
            border-color: #D9D8DC;
            box-shadow: 0px 2px 4px -2px rgba(17, 12, 34, 0.12);
        }
        &:focus {
            border-color: #007faa;
            box-shadow: 0px 0px 0px 4px #e6f0fe, 0px 2px 4px 0px rgba(17, 12, 34, 0.12);
            overflow: hidden;
        }
        &.ant-input-affix-wrapper-focused, .ant-input-affix-wrapper:focus {
            border-color: #007faa;
            box-shadow: 0px 0px 0px 4px #e6f0fe, 0px 2px 4px 0px rgba(17, 12, 34, 0.12);
            overflow: hidden;
            .ant-input-prefix {
                svg {
                    &.svgStrokeColor {
                        path {
                            stroke: var(--text-primary);
                        }
                    }
                }
                svg {
                    &.svgFillColor {
                        path {
                            fill: var(--text-primary);
                        }
                        g {
                            g {
                                path {
                                    fill: var(--text-primary);
                                }
                            }
                        }
                    }
                }
            }
        }
        &.has-error {
            border-color: #FF8080;
            box-shadow: 0px 0px 0px 4px #FFE0E0, 0px 2px 4px 0px rgba(17, 12, 34, 0.12);
            overflow: hidden;
        }
        .ant-input {
            &:focus {
                border-color: #007faa;
                box-shadow: 0px 0px 0px 4px #E2DCFF, 0px 2px 4px 0px rgba(17, 12, 34, 0.12);
                overflow: hidden;
            }
        }
        .ant-input::placeholder {
            color: #B3B1B8;
        }
        input {
            color: var(--text-high-em) !important;
        }
    }
`;

export const TEXT_SIZE_MAPPING_PROPS = {
  lg: {
    fontSize: "14px",
    padding: "9px",
    lineHeight: "24px",
    fontweight: 500,
  },
  md: {
    fontSize: "12px",
    padding: "8px 7px",
    lineHeight: "16px",
    fontweight: 500,
  },
  sm: {
    fontSize: "10px",
    padding: "4px 6px",
    lineHeight: "16px",
    fontweight: 500,
  },
};

type BookingInputProps = InputProps & {
  isError?: boolean;
  label?: string;
  isRequired?: boolean;
  hasClearIcon?: boolean;
  onClearValue?: (event?: any) => void;
  wrapperClassName?: string;
  classInput?: string;
  textSize?: "lg" | "md" | "sm";
  hasError?: boolean;
  isEmptyPassword?: boolean;
  forceDisable?: boolean;
  inputRef?: React.RefObject<any>;
  isNotShowPrefix?: boolean;
};

export const BookingInput: React.FC<BookingInputProps> = ({
  style,
  label,
  hasClearIcon,
  isRequired,
  onClearValue,
  isError,
  classInput,
  wrapperClassName = "",
  textSize = "lg",
  forceDisable,
  inputRef,
  ...props
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const { value, disabled } = props;
  const inputElementRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (inputRef) {
      inputElementRef.current = inputRef;
    }
  } , [inputRef]);

  return (
    <WrapperInput
      className={classNames([
        "relative",
        {
          "has-label": label,
          "has-focus": hasFocus,
          "has-disabled": forceDisable || disabled,
        },
        wrapperClassName,
      ])}
    >
      {label && (
        <label className="space-x-1 text-med-em text-body-medium">
          <span>{label}</span>
          {isRequired && <span className="text-red-500 text-xs">(*)</span>}
        </label>
      )}
      <InputStyled
        {...props}
        disabled={disabled}
        ref={inputElementRef}
        className={classNames([
          "booking-input-control text-high-em text-body-medium p-[10px]",
          {
            "has-clear-icon": hasClearIcon,
            "has-error": isError,
          },
          classInput,
        ])}
        onFocus={(event) => {
          if (forceDisable || disabled) {
            setHasFocus(false);
            inputElementRef.current?.blur();
            event.stopPropagation();
            return;
          }
          setHasFocus(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setHasFocus(false);
          props.onBlur?.(event);
        }}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          ...TEXT_SIZE_MAPPING_PROPS[textSize],
          // borderColor: isError ? "#F55858" : "#ECECED",
          ...style,
        }}
      />
      {!!hasClearIcon && !!value && (
        <span
          aria-hidden="true"
          className="absolute cursor-pointer right-[35px] z-[1] clear-icon"
          style={{
            top: label ? "50%" : "12px",
          }}
          onClick={onClearValue}
        >
          <ICClose width={18} height={18} />
        </span>
      )}
    </WrapperInput>
  );
};

export const inputPasswordProps: any = (isError?: boolean, isNotShowPrefix?: boolean) => {
  return {
    style: {
      boxSizing: "border-box",
      overflow: "hidden",
      borderRadius: "8px",
      padding: "8px",
      border: "1px solid #ECECED",
      borderColor: isError ? "#F55858" : "#ECECED",
      fontSize: "14px",
      fontWeight: 500,
    },
    size: "large",
    placeholder: "Mật khẩu",
    prefix: isNotShowPrefix ? null : (isError ? <ICAlert /> : <ICLock />),
    iconRender: (visible: boolean) =>
      visible ? (
        <ICEye className="svgFillColor" />
      ) : (
        <ICEyeOff className="svgFillColor" />
      ),
  };
};

export const BookingInputPassword: React.FC<BookingInputProps> = ({
  style,
  label,
  hasClearIcon,
  isRequired,
  onClearValue,
  isError,
  classInput,
  wrapperClassName = "",
  textSize = "lg",
  hasError,
  isEmptyPassword,
  placeholder,
  inputRef,
  isNotShowPrefix,
  ...props
}) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const { disabled } = props;
  const inputElementRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (inputRef) {
      inputElementRef.current = inputRef;
    }
  } , [inputRef]);

  return (
    <WrapperInput
      className={classNames([
        "space-y-1 relative",
        {
          "has-label": label,
          "has-focus": hasFocus,
        },
        wrapperClassName,
      ])}
    >
      {label && (
        <label className="space-x-1 text-med-em text-body-medium">
          <span>{label}</span>
          {isRequired && <span className="text-red-500 text-xs">(*)</span>}
        </label>
      )}
      <InputPasswordStyled
        {...props}
        {...inputPasswordProps((hasError || isEmptyPassword), isNotShowPrefix)}
        disabled={disabled}
        placeholder={placeholder}
        ref={inputElementRef}
        className={classNames([
          "booking-input-control text-high-em text-body-medium p-[10px]",
          {
            "has-clear-icon": hasClearIcon,
            "has-error": isError,
          },
          classInput,
        ])}
        onFocus={(event) => {
          setHasFocus(true);
          props.onFocus?.(event);
        }}
        onBlur={(event) => {
          setHasFocus(false);
          props.onBlur?.(event);
        }}
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          ...TEXT_SIZE_MAPPING_PROPS[textSize],
          ...style,
        }}
      />
    </WrapperInput>
  );
};
