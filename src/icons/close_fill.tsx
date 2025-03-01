import { IconProps } from "./type";

export const CloseFill: React.FC<IconProps> = ({ fill = "#3FB483" }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_564_1570)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 9C18 13.9707 13.9707 18 9 18C4.0293 18 0 13.9707 0 9C0 4.0293 4.0293 0 9 0C13.9707 0 18 4.0293 18 9ZM7.30322 5.60583C6.83459 5.1372 6.07479 5.1372 5.60616 5.60583C5.13753 6.07446 5.13753 6.83426 5.60616 7.30289L7.30328 9.00001L5.60616 10.6971C5.13753 11.1658 5.13753 11.9256 5.60616 12.3942C6.07479 12.8628 6.83459 12.8628 7.30322 12.3942L9.00034 10.6971L10.6975 12.3942C11.1661 12.8628 11.9259 12.8628 12.3945 12.3942C12.8631 11.9256 12.8631 11.1658 12.3945 10.6971L10.6974 9.00001L12.3945 7.30289C12.8631 6.83426 12.8631 6.07446 12.3945 5.60583C11.9259 5.1372 11.1661 5.1372 10.6975 5.60583L9.00034 7.30295L7.30322 5.60583Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_564_1570">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
