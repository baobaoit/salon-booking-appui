import { Steps, StepProps } from "antd";
import React from "react";
import styled from "styled-components";

const StyledSteps = styled(Steps)``;

type BookingStepProps = StepProps & {
  current: number;
  status?: "wait" | "process" | "finish" | "error";
  childNode: React.ReactElement | React.ReactNode;
};
export const BookingStep: React.FC<BookingStepProps> = ({
  style,
  current = 1,
  status,
  childNode,
  ...props
}) => {
  return (
    <StyledSteps
      current={current}
      status={status}
      items={[
        {
          title: "Finished",
          description: "",
        },
        {
          title: "In Progress",
          description: "",
          subTitle: "Left 00:00:08",
        },
        {
          title: "Waiting",
          description: "",
        },
      ]}
      {...props}
    />
  );
};
