import { IconProps } from "./type";

export const ICMobile: React.FC<IconProps> = ({
  fill = "#C6C5CA",
  className = "svgStrokeColor",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 3H7C6.44772 3 6 3.44772 6 4V21C6 21.5523 6.44772 22 7 22H17C17.5523 22 18 21.5523 18 21V4C18 3.44772 17.5523 3 17 3Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.016 18.016L12 18"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
