import { Form, FormProps } from "antd";
import React from "react";
import styled from "styled-components";

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 0px;
  }
  .ant-form-item-has-error {
    .hr-input-control {
      box-shadow:
        0px 0px 0px 4px #ffe0e0,
        0px 2px 4px 0px rgba(17, 12, 34, 0.12);
      border-color: #ff8080;
      &:hover {
        border-color: #ff8080;
        box-shadow:
          0px 0px 0px 4px #ffe0e0,
          0px 2px 4px 0px rgba(17, 12, 34, 0.12);
      }
      &:focus {
        border-color: #ff8080;
        box-shadow:
          0px 0px 0px 4px #ffe0e0,
          0px 2px 4px 0px rgba(17, 12, 34, 0.12);
        overflow: hidden;
      }
      &.ant-input-affix-wrapper-focused,
      .ant-input-affix-wrapper:focus {
        border-color: #ff8080;
        box-shadow:
          0px 0px 0px 4px #ffe0e0,
          0px 2px 4px 0px rgba(17, 12, 34, 0.12);
        overflow: hidden;
        .ant-input-prefix {
          svg {
            &.svgStrokeColor {
              path {
                stroke: #ff8080;
              }
            }
          }
          svg {
            &.svgFillColor {
              path {
                fill: #ff8080;
              }
            }
          }
        }
      }
      .ant-input-prefix {
        svg {
          &.svgStrokeColor {
            path {
              stroke: #ff8080;
            }
          }
        }
        svg {
          &.svgFillColor {
            path {
              fill: #ff8080;
            }
          }
        }
      }
      .ant-input {
        &:focus {
          border-color: #ff8080;
          box-shadow:
            0px 0px 0px 4px #ffe0e0,
            0px 2px 4px 0px rgba(17, 12, 34, 0.12);
          overflow: hidden;
        }
      }
    }
  }
`;

type BookingFormProps = FormProps & {
  form?: any;
  childNode: React.ReactElement | React.ReactNode;
};
export const BookingForm: React.FC<BookingFormProps> = ({
  style,
  form,
  childNode,
  ...props
}) => {
  return (
    <StyledForm form={form} labelWrap autoComplete="off" {...props}>
      {childNode}
    </StyledForm>
  );
};
