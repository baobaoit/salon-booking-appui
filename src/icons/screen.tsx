import { IconProps } from "./type";

export const ICScreen: React.FC<IconProps> = ({ fill = "#757B88" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 17H20C21.6569 17 23 15.6569 23 14V6C23 4.34315 21.6569 3 20 3H4C2.34315 3 1 4.34315 1 6V14C1 15.6569 2.34315 17 4 17H11V19H8C7.44772 19 7 19.4477 7 20C7 20.5523 7.44771 21 8 21H16C16.5523 21 17 20.5523 17 20C17 19.4477 16.5523 19 16 19H13V17ZM20 5H4C3.44772 5 3 5.44772 3 6V14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14V6C21 5.44772 20.5523 5 20 5Z"
        fill={fill}
      />
    </svg>
  );
};
