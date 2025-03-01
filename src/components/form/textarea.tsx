import { TextAreaProps } from "antd/lib/input";
import TextArea from "antd/lib/input/TextArea";
import classNames from "classnames";
import styled from "styled-components";

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
  .booking-input-control {
    color: var(--text-high-em)
    box-shadow: 0px 1px 2px -1px rgba(17, 12, 34, 0.08);
    border-color: #ececed;
    &:hover {
      border-color: #d9d8dc;
      box-shadow: 0px 2px 4px -2px rgba(17, 12, 34, 0.12);
    }
    &:focus {
      border-color: #007faa;
      box-shadow:
        0px 0px 0px 4px #e6f0fe,
        0px 2px 4px 0px rgba(17, 12, 34, 0.12);
      overflow: hidden;
    }
    &.ant-input-affix-wrapper-focused,
    .ant-input-affix-wrapper:focus {
      border-color: #007faa;
      box-shadow:
        0px 0px 0px 4px #e2dcff,
        0px 2px 4px 0px rgba(17, 12, 34, 0.12);
      overflow: hidden;
      .ant-input-prefix {
        svg {
          &.svgStrokeColor {
            path {
              stroke: #007faa;
            }
          }
        }
      }
    }
    .ant-input {
      &:focus {
        border-color: #007faa;
        box-shadow:
          0px 0px 0px 4px #e6f0fe,
          0px 2px 4px 0px rgba(17, 12, 34, 0.12);
        overflow: hidden;
      }
    }
    .ant-input::placeholder {
      color: #b3b1b8;
    }
  }
`;

type BookingTextAreaProps = TextAreaProps & {
  label?: string;
  parentClassName?: string;
  isRequired?: boolean;
};
export const BookingTextArea: React.FC<BookingTextAreaProps> = ({
  style,
  isRequired,
  parentClassName,
  label,
  ...props
}) => {
  return (
    <WrapperInput className={classNames(["space-y-1", parentClassName])}>
      {label && (
        <label className="space-x-1 text-body-medium text-med-em">
          <span>{label}</span>
          {isRequired && <span className="text-red-500 text-xs">(*)</span>}
        </label>
      )}
      <TextArea
        className="booking-input-control"
        {...props}
        style={{
          borderRadius: "4px",
          padding: "8px",
          fontSize: "14px",
          fontWeight: 500,
          ...style,
        }}
      />
    </WrapperInput>
  );
};
