import { IconProps } from "./type";

export const ICCheckboxList: React.FC<IconProps> = ({
  width = 24,
  height = 25,
  stroke = "#7357FF",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 5.5H21M11 12.5H21M11 19.5H21"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 3.5H4C3.44772 3.5 3 3.94772 3 4.5V6.5C3 7.05228 3.44772 7.5 4 7.5H6C6.55228 7.5 7 7.05228 7 6.5V4.5C7 3.94772 6.55228 3.5 6 3.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5H4C3.44772 10.5 3 10.9477 3 11.5V13.5C3 14.0523 3.44772 14.5 4 14.5H6C6.55228 14.5 7 14.0523 7 13.5V11.5C7 10.9477 6.55228 10.5 6 10.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17.5H4C3.44772 17.5 3 17.9477 3 18.5V20.5C3 21.0523 3.44772 21.5 4 21.5H6C6.55228 21.5 7 21.0523 7 20.5V18.5C7 17.9477 6.55228 17.5 6 17.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ICCheckboxListLine: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 3.5C2 3.22386 2.22386 3 2.5 3H2.50098C2.77712 3 3.00098 3.22386 3.00098 3.5V3.501C3.00098 3.63569 2.94664 3.76468 2.85026 3.85877C2.75389 3.95286 2.62363 4.00409 2.48898 4.00086L2.488 4.00083C2.21661 3.99432 2 3.77245 2 3.50098V3.5ZM4 3.5C4 3.22386 4.22386 3 4.5 3H9.5C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 3.77614 4 3.5ZM2 6C2 5.72386 2.22386 5.5 2.5 5.5H2.50098C2.77712 5.5 3.00098 5.72386 3.00098 6V6.001C3.00098 6.13568 2.94664 6.26467 2.85028 6.35876C2.75391 6.45284 2.62366 6.50408 2.48902 6.50086L2.48804 6.50083C2.21664 6.49434 2 6.27246 2 6.00098V6ZM4 6C4 5.72386 4.22386 5.5 4.5 5.5H9.5C9.77614 5.5 10 5.72386 10 6C10 6.27614 9.77614 6.5 9.5 6.5H4.5C4.22386 6.5 4 6.27614 4 6ZM2 8.5C2 8.22386 2.22386 8 2.5 8H2.50098C2.77712 8 3.00098 8.22386 3.00098 8.5V8.501C3.00098 8.63568 2.94664 8.76467 2.85028 8.85876C2.75391 8.95284 2.62366 9.00408 2.48902 9.00086L2.48804 9.00083C2.21664 8.99434 2 8.77246 2 8.50098V8.5ZM4 8.5C4 8.22386 4.22386 8 4.5 8H9.5C9.77614 8 10 8.22386 10 8.5C10 8.77614 9.77614 9 9.5 9H4.5C4.22386 9 4 8.77614 4 8.5Z"
        fill="var(--icon-high-em)"
      />
    </svg>
  );
};
