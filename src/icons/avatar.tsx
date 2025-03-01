import { IconProps } from "./type";

export const ICAvatar: React.FC<IconProps> = ({ width = 48, height = 48 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3637_14807)">
        <rect width="48" height="48" rx="24" fill="#E2E4EB" />
        <ellipse
          cx="24.0001"
          cy="18.055"
          rx="9.46789"
          ry="9.46789"
          fill="#A6A8B4"
        />
        <ellipse
          cx="24.0003"
          cy="53.1743"
          rx="22.2385"
          ry="22.3486"
          fill="#A6A8B4"
        />
      </g>
      <defs>
        <clipPath id="clip0_3637_14807">
          <rect width={width} height={height} rx="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
