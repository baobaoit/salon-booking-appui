import { Button, ButtonProps } from "antd";
import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import { ICClose } from "../icons/index";

const BookingButtonControl = styled(Button)`
  &.booking-btn-primary {
    &:hover {
      background: var(--tc-primary-p-400) !important;
      box-shadow: var(--shadow-e-02);
    }
    &:focus {
      background: var(--tc-primary-p-400) !important;
      box-shadow: var(--shadow-pressed-primary);
    }
    &.cursor-not-allowed {
      &:hover {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
  &.booking-btn-secondary {
    &:hover {
      border-color: var(--tc-primary-p-75) !important;
      background: var(--tc-primary-p-50) !important;
      box-shadow: var(--shadow-e-02);
    }
    &:focus {
      border-color: var(--tc-primary-p-75) !important;
      background: var(--tc-primary-p-50) !important;
      box-shadow: var(--shadow-pressed-primary);
    }
    &.cursor-not-allowed {
      &:hover {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
  &.booking-btn-sub {
    &:hover {
      border-color: var(--tc-gray-g-75) !important;
      background: var(--tc-gray-g-25) !important;
      box-shadow: var(--shadow-e-02);
    }
    &:focus {
      border-color: var(--tc-gray-g-75) !important;
      background: var(--tc-gray-g-25) !important;
      box-shadow: var(--shadow-pressed-gray);
    }
    &.cursor-not-allowed {
      &:hover {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
  &.booking-btn-info {
    &:hover {
      background: var(--tc-system-info-400) !important;
      box-shadow: var(--shadow-e-02);
    }
    &:focus {
      background: var(--tc-system-info-400) !important;
      box-shadow: var(--shadow-pressed-info);
    }
    &.cursor-not-allowed {
      &:hover {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
  &.booking-btn-sub-info {
    &:hover {
      border-color: var(--tc-system-info-75) !important;
      background: var(--tc-system-info-25) !important;
      box-shadow: var(--shadow-e-02);
    }
    &:focus {
      border-color: var(--tc-system-info-75) !important;
      background: var(--tc-system-info-25) !important;
      box-shadow: var(--shadow-pressed-info);
    }
    &.cursor-not-allowed {
      &:hover {
        border-color: transparent !important;
        background: transparent !important;
        box-shadow: none;
      }
    }
  }
`;

type BookingButtonProps = ButtonProps & {
  btnType?:
    | "primary"
    | "secondary"
    | "sub"
    | "outline"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | "sub_info"
    | "tertiary"
    | "tertiary_info"
    | "sub_danger"
    | "sub_rounded_primary";
  btnSize?: "lg" | "md" | "sm" | "xs";
  onlyRole?: string;
  width?: string;
};

const BUTTON_TYPE_MAPPING_PROPS = {
  primary: {
    background: "#007faa",
    color: "white",
    borderRadius: "8px",
    fontWeight: 700,
  },
  danger: {
    background: "#F03D3D",
    color: "white",
    borderRadius: "8px",
    fontWeight: 500,
  },
  secondary: {
    background: "#F9F8FF",
    color: "#0084FF",
    border: "1px solid #E2DCFF",
    borderRadius: "8px",
    fontWeight: 700,
  },
  sub: {
    background: "white",
    color: "#4F4B5C",
    border: "1px solid #ECECED",
    borderRadius: "8px",
    fontWeight: 700,
  },
  outline: {
    background: "white",
    color: "#000000",
    border: "1px solid #7357FF",
    borderRadius: "8px",
    fontWeight: 700,
  },
  info: {
    background: "#0084FF",
    color: "white",
    borderRadius: "8px",
    fontWeight: 700,
  },
  success: {
    background: "#0BAA60",
    color: "white",
    borderRadius: "8px",
    fontWeight: 700,
  },
  warning: {
    background: "#E09400",
    color: "white",
    borderRadius: "8px",
    fontWeight: 700,
  },
  sub_info: {
    background: "white",
    color: "#0084FF",
    border: "1px solid #C2E2FF",
    borderRadius: "8px",
    fontWeight: 700,
  },
  sub_danger: {
    background: "white",
    color: "#F03D3D",
    border: "1px solid #FFE0E0",
    borderRadius: "8px",
    fontWeight: 700,
  },
  tertiary: {
    background: "transparent",
    color: "#4F4B5C",
    border: 0,
    fontWeight: 700,
  },
  tertiary_info: {
    background: "transparent",
    color: "#0084FF",
    border: 0,
    fontWeight: 700,
  },
  sub_rounded_primary: {
    background: "transparent",
    color: "#7357FF",
    borderRadius: "144px",
    border: "1px solid var(--tc-primary-p-75)",
  },
};

const BUTTON_TYPE_TEXT_MAPPING = {
  primary: "booking-btn-primary",
  danger: "booking-btn-danger",
  secondary: "booking-btn-secondary",
  sub: "booking-btn-sub",
  outline: "booking-btn-outline",
  info: "booking-btn-info",
  success: "booking-btn-success",
  warning: "booking-btn-warning",
  sub_info: "booking-btn-sub-info",
  sub_danger: "booking-btn-sub-danger",
  tertiary: "booking-btn-tertiary",
  tertiary_info: "booking-btn-tertiary-info",
  sub_rounded_primary: "booking-btn-sub-rounded-primary",
};

const BUTTON_SIZE_MAPPING_PROPS = {
  lg: {
    fontSize: "16px",
    padding: "16px 24px",
    lineHeight: "24px",
  },
  md: {
    fontSize: "14px",
    padding: "10px 20px",
    lineHeight: "24px",
  },
  sm: {
    fontSize: "14px",
    padding: "8px 16px",
    lineHeight: "24px",
  },
  xs: {
    fontSize: "10px",
    padding: "4px 8px",
    lineHeight: "16px",
  },
};

const ICON_BUTTON_SIZE_MAPPING_PROPS = {
  lg: {
    fontSize: "16px",
    padding: "16px",
    lineHeight: "24px",
  },
  md: {
    fontSize: "16px",
    padding: "10px",
    lineHeight: "24px",
  },
  sm: {
    fontSize: "14px",
    padding: "11px",
    lineHeight: "24px",
    width: "40px",
    height: "40px",
    minWidth: "40px",
  },
  xs: {
    fontSize: "10px",
    padding: "4px 8px",
    lineHeight: "16px",
  },
};

export const BookingButton: React.FC<BookingButtonProps> = ({
  btnType = "primary",
  btnSize = "lg",
  width = "100%",
  style,
  ...props
}) => {
  const extraStyle = React.useMemo(() => {
    if (props.disabled) {
      return {
        width,
        height: "auto",
        ...BUTTON_TYPE_MAPPING_PROPS[btnType],
        ...BUTTON_SIZE_MAPPING_PROPS[btnSize],
        ...style,
        background: "#F2F2F2",
        color: "#D6D7DD",
        border: "1px solid transparent",
      };
    }
    return {
      width,
      height: "auto",
      border: 0,
      ...BUTTON_TYPE_MAPPING_PROPS[btnType],
      ...BUTTON_SIZE_MAPPING_PROPS[btnSize],
      ...style,
    };
  }, [btnType, btnSize, props.disabled, style, width]);

  return (
    <BookingButtonControl
      {...props}
      className={classNames([
        "shadow-e-01",
        BUTTON_TYPE_TEXT_MAPPING[btnType],
        {
          "cursor-not-allowed": props.disabled,
        },
      ])}
      style={{
        boxSizing: "border-box",
        overflow: "hidden",
        ...extraStyle,
      }}
    />
  );
};

type CloseButtonProps = ButtonProps & {
  color?: string;
  text?: string;
  fill?: string;
};
export const CloseButton: React.FC<CloseButtonProps> = ({
  color = "#3FB483",
  text = "",
  fill = "#9A9CA9",
}) => {
  return (
    <div className="flex items-center p-[11px] border rounded-[8px] shadow-e-01 border-[#ECECED] cursor-pointer box-border overflow-hidden">
      <ICClose height={18} width={18} fill={fill} />
      {text && (
        <span
          className="font-bold"
          style={{
            color: `${color}`,
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
  btnType?:
    | "primary"
    | "secondary"
    | "sub"
    | "outline"
    | "danger"
    | "info"
    | "success"
    | "warning"
    | "sub_info"
    | "tertiary"
    | "sub_danger"
    | "sub_rounded_primary";
  btnSize?: "lg" | "md" | "sm" | "xs";
};
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  btnType = "primary",
  btnSize = "lg",
  ...props
}) => {
  const extraStyle = React.useMemo(() => {
    if (props.disabled) {
      return {
        ...BUTTON_TYPE_MAPPING_PROPS[btnType],
        ...ICON_BUTTON_SIZE_MAPPING_PROPS[btnSize],
        background: "#F3F3F4",
        color: "#D6D7DD",
        border: 0,
      };
    }
    return {
      ...BUTTON_TYPE_MAPPING_PROPS[btnType],
      ...ICON_BUTTON_SIZE_MAPPING_PROPS[btnSize],
    };
  }, [btnType, btnSize, props.disabled]);

  return (
    <BookingButtonControl
      className={classNames([
        "shadow-e-01",
        BUTTON_TYPE_TEXT_MAPPING[btnType],
        {
          "cursor-not-allowed": props.disabled,
        },
      ])}
      style={{
        width: "auto",
        height: "auto",
        boxSizing: "border-box",
        overflow: "hidden",
        ...extraStyle,
      }}
      {...props}
    >
      {icon}
    </BookingButtonControl>
  );
};
