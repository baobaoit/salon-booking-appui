import { IconProps } from "./type";

export const ICUndo: React.FC<IconProps> = ({ stroke = "#7357FF" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.227 13.773C4.8531 14.4007 5.59708 14.8986 6.4162 15.2378C7.23531 15.5771 8.1134 15.7512 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27213 12.7279 2.25 9 2.25C7.13625 2.25 5.44875 3.00563 4.227 4.227C3.60525 4.84875 2.25 6.375 2.25 6.375"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 3.375V6.375H5.25"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
