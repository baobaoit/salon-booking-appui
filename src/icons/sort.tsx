import classNames from "classnames";
import { IconProps } from "./type";

type TSortProps = {
  order: "ascend" | "descend" | null | undefined;
};
export const ICSort: React.FC<TSortProps> = ({ order }) => {
  return order === "ascend" ? (
    <ICSortUp />
  ) : order === "descend" ? (
    <ICSortDown stroke="#7357FF" className="opacity-100" />
  ) : (
    <ICSortDown className="opacity-0" />
  );
};

const ICSortDown: React.FC<IconProps> = ({
  stroke = "#C6C5CA",
  className = "",
}) => {
  return (
    <svg
      width="18"
      height="18"
      className={classNames("group-hover:opacity-100", className)}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.625 3H16.125"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 15.375L2.25 12.375"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 2.625V15.375"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 6.75H14.625"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 10.5H13.125"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 14.25H11.625"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ICSortUp: React.FC = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.625 3.375H16.125"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 6L4.875 3"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.875 3V15.75"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 7.125H14.625"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 10.875H13.125"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.625 14.625H11.625"
        stroke="#7357FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
