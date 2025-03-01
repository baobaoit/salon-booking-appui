import { IconProps } from "./type";

export const ICBriefcase: React.FC<IconProps> = ({ fill = "#C6C5CA" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3H16V7H22V21H2V7H8V3ZM10 7H14V5H10V7ZM4 9V19H20V9H4Z"
        fill={fill}
      />
    </svg>
  );
};
