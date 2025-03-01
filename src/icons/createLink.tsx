import { IconProps } from "./type";

export const ICCreateLink: React.FC = () => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="56"
        height="56"
        rx="28"
        fill="url(#paint0_linear_3467_5108)"
      />
      <path
        d="M23.379 26.1906L21.1455 28.424C20.3114 29.2582 19.8317 30.3931 19.8405 31.5859C19.8493 32.7787 20.3184 33.9206 21.1922 34.7674C22.0388 35.6411 23.181 36.1103 24.3736 36.119C25.5934 36.128 26.7015 35.6753 27.5357 34.8412L29.7692 32.6077M32.622 29.8095L34.8554 27.576C35.6896 26.7419 36.1692 25.6069 36.1605 24.4141C36.1517 23.2213 35.6825 22.0794 34.8088 21.2327C33.9623 20.3862 32.8204 19.917 31.6276 19.9082C30.4348 19.8995 29.2997 20.3519 28.4655 21.1861L26.232 23.4195M24.6136 31.3272L31.314 24.6268"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3467_5108"
          x1="0"
          y1="28"
          x2="56.175"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7357FF" />
          <stop offset="1" stopColor="#6E4CF8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ICCreateLinkV2: React.FC<IconProps> = ({ stroke = "#46485C" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.379 10.1906L5.14554 12.424C4.31141 13.2582 3.83173 14.3931 3.8405 15.5859C3.84926 16.7787 4.31844 17.9206 5.19216 18.7674C6.03884 19.6411 7.18097 20.1103 8.37359 20.119C9.59342 20.128 10.7015 19.6753 11.5357 18.8412L13.7692 16.6077M16.622 13.8095L18.8554 11.576C19.6896 10.7419 20.1692 9.60693 20.1605 8.41412C20.1517 7.2213 19.6825 6.07942 18.8088 5.23268C17.9623 4.3862 16.8204 3.91699 15.6276 3.90822C14.4348 3.89946 13.2997 4.35191 12.4655 5.18607L10.232 7.41952M8.61359 15.3272L15.314 8.62683"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
