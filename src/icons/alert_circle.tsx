import { IconProps } from "./type";

export const ICAlertCircle: React.FC<IconProps> = ({ fill = "#BEC0CA" }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00033 5.16669C8.36852 5.16669 8.66699 5.46516 8.66699 5.83335V8.50002C8.66699 8.86821 8.36852 9.16669 8.00033 9.16669C7.63213 9.16669 7.33366 8.86821 7.33366 8.50002V5.83335C7.33366 5.46516 7.63213 5.16669 8.00033 5.16669Z"
        fill={fill}
      />
      <path
        d="M8.00033 10.5C7.63213 10.5 7.33366 10.7985 7.33366 11.1667C7.33366 11.5349 7.63213 11.8334 8.00033 11.8334H8.00699C8.37518 11.8334 8.67366 11.5349 8.67366 11.1667C8.67366 10.7985 8.37518 10.5 8.00699 10.5H8.00033Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666992 8.50002C0.666992 4.44993 3.95024 1.16669 8.00033 1.16669C12.0504 1.16669 15.3337 4.44993 15.3337 8.50002C15.3337 12.5501 12.0504 15.8334 8.00033 15.8334C3.95024 15.8334 0.666992 12.5501 0.666992 8.50002ZM8.00033 2.50002C4.68662 2.50002 2.00033 5.18631 2.00033 8.50002C2.00033 11.8137 4.68662 14.5 8.00033 14.5C11.314 14.5 14.0003 11.8137 14.0003 8.50002C14.0003 5.18631 11.314 2.50002 8.00033 2.50002Z"
        fill={fill}
      />
    </svg>
  );
};
