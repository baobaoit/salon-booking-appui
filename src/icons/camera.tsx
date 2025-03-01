import { IconProps } from "./type";

export const ICCamera: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.12596 1.83397C6.26506 1.62533 6.49924 1.5 6.75 1.5H11.25C11.5008 1.5 11.7349 1.62533 11.874 1.83397L13.1514 3.75H15.75C16.3467 3.75 16.919 3.98705 17.341 4.40901C17.7629 4.83097 18 5.40326 18 6V14.25C18 14.8467 17.7629 15.419 17.341 15.841C16.919 16.2629 16.3467 16.5 15.75 16.5H2.25C1.65326 16.5 1.08097 16.2629 0.65901 15.841C0.237053 15.419 0 14.8467 0 14.25V6C0 5.40326 0.237053 4.83097 0.65901 4.40901C1.08097 3.98705 1.65326 3.75 2.25 3.75H4.84861L6.12596 1.83397ZM7.15139 3L5.87404 4.91602C5.73494 5.12467 5.50076 5.25 5.25 5.25H2.25C2.05109 5.25 1.86032 5.32902 1.71967 5.46967C1.57902 5.61032 1.5 5.80109 1.5 6V14.25C1.5 14.4489 1.57902 14.6397 1.71967 14.7803C1.86032 14.921 2.05109 15 2.25 15H15.75C15.9489 15 16.1397 14.921 16.2803 14.7803C16.421 14.6397 16.5 14.4489 16.5 14.25V6C16.5 5.80109 16.421 5.61032 16.2803 5.46967C16.1397 5.32902 15.9489 5.25 15.75 5.25H12.75C12.4992 5.25 12.2651 5.12467 12.126 4.91602L10.8486 3H7.15139Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 7.5C7.75736 7.5 6.75 8.50736 6.75 9.75C6.75 10.9926 7.75736 12 9 12C10.2426 12 11.25 10.9926 11.25 9.75C11.25 8.50736 10.2426 7.5 9 7.5ZM5.25 9.75C5.25 7.67893 6.92893 6 9 6C11.0711 6 12.75 7.67893 12.75 9.75C12.75 11.8211 11.0711 13.5 9 13.5C6.92893 13.5 5.25 11.8211 5.25 9.75Z"
        fill={fill}
      />
    </svg>
  );
};

export const ICCameraOff: React.FC<IconProps> = ({ fill = "white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.28033 0.21967C0.987437 -0.0732233 0.512563 -0.0732233 0.21967 0.21967C-0.0732233 0.512563 -0.0732233 0.987437 0.21967 1.28033L2.68934 3.75H2.25C1.65326 3.75 1.08097 3.98705 0.65901 4.40901C0.237053 4.83097 1.11759e-08 5.40326 1.11759e-08 6V14.25C1.11759e-08 14.8467 0.237053 15.419 0.65901 15.841C1.08097 16.2629 1.65326 16.5 2.25 16.5H15.4393L16.7197 17.7803C17.0126 18.0732 17.4874 18.0732 17.7803 17.7803C18.0732 17.4874 18.0732 17.0126 17.7803 16.7197L16.2806 15.2199C16.2805 15.2198 16.2806 15.22 16.2806 15.2199L12.0009 10.9403C11.9944 10.9335 11.9877 10.9268 11.9809 10.9203L7.82976 6.7691C7.82318 6.76227 7.8165 6.75559 7.80971 6.74905L1.28033 0.21967ZM13.9393 15L11.4927 12.5533C11.3062 12.7211 11.1028 12.8703 10.8853 12.9982C10.4104 13.2775 9.87974 13.4488 9.3311 13.4998C8.78247 13.5508 8.22934 13.4802 7.71106 13.2932C7.19279 13.1061 6.7221 12.8071 6.33249 12.4175C5.94287 12.0279 5.6439 11.5572 5.45684 11.0389C5.26979 10.5207 5.19924 9.96753 5.25022 9.4189C5.3012 8.87026 5.47246 8.3396 5.75181 7.86467C5.87974 7.64717 6.0289 7.4438 6.19669 7.25735L4.18934 5.25H2.25C2.05109 5.25 1.86032 5.32902 1.71967 5.46967C1.57902 5.61032 1.5 5.80109 1.5 6V14.25C1.5 14.4489 1.57902 14.6397 1.71967 14.7803C1.86032 14.921 2.05109 15 2.25 15H13.9393ZM7.2598 8.32046C7.18003 8.41563 7.10805 8.5175 7.04474 8.62515C6.87713 8.91011 6.77438 9.2285 6.74379 9.55768C6.7132 9.88687 6.75553 10.2187 6.86776 10.5297C6.97999 10.8407 7.15938 11.1231 7.39315 11.3569C7.62691 11.5906 7.90933 11.77 8.22029 11.8822C8.53126 11.9945 8.86314 12.0368 9.19232 12.0062C9.5215 11.9756 9.83989 11.8729 10.1249 11.7053C10.2325 11.6419 10.3344 11.57 10.4295 11.4902L7.2598 8.32046Z"
        fill={fill}
      />
      <path
        d="M6.75 1.5C6.33579 1.5 6 1.83579 6 2.25C6 2.66421 6.33579 3 6.75 3H10.8486L12.126 4.91603C12.2651 5.12467 12.4992 5.25 12.75 5.25H15.75C15.9489 5.25 16.1397 5.32902 16.2803 5.46967C16.421 5.61032 16.5 5.80109 16.5 6V13.005C16.5 13.4192 16.8358 13.755 17.25 13.755C17.6642 13.755 18 13.4192 18 13.005V6C18 5.40326 17.7629 4.83097 17.341 4.40901C16.919 3.98705 16.3467 3.75 15.75 3.75H13.1514L11.874 1.83397C11.7349 1.62533 11.5008 1.5 11.25 1.5H6.75Z"
        fill={fill}
      />
    </svg>
  );
};

export const ICCameraError: React.FC<IconProps> = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3499_23525)">
        <rect x="1" width="40" height="40" rx="20" fill="white" />
        <path
          clipRule="evenodd"
          d="M18.126 12.834C18.2651 12.6253 18.4992 12.5 18.75 12.5H23.25C23.5008 12.5 23.7349 12.6253 23.874 12.834L25.1514 14.75H27.75C28.3467 14.75 28.919 14.9871 29.341 15.409C29.7629 15.831 30 16.4033 30 17V25.25C30 25.8467 29.7629 26.419 29.341 26.841C28.919 27.2629 28.3467 27.5 27.75 27.5H14.25C13.6533 27.5 13.081 27.2629 12.659 26.841C12.2371 26.419 12 25.8467 12 25.25V17C12 16.4033 12.2371 15.831 12.659 15.409C13.081 14.9871 13.6533 14.75 14.25 14.75H16.8486L18.126 12.834ZM19.1514 14L17.874 15.916C17.7349 16.1247 17.5008 16.25 17.25 16.25H14.25C14.0511 16.25 13.8603 16.329 13.7197 16.4697C13.579 16.6103 13.5 16.8011 13.5 17V25.25C13.5 25.4489 13.579 25.6397 13.7197 25.7803C13.8603 25.921 14.0511 26 14.25 26H27.75C27.9489 26 28.1397 25.921 28.2803 25.7803C28.421 25.6397 28.5 25.4489 28.5 25.25V17C28.5 16.8011 28.421 16.6103 28.2803 16.4697C28.1397 16.329 27.9489 16.25 27.75 16.25H24.75C24.4992 16.25 24.2651 16.1247 24.126 15.916L22.8486 14H19.1514Z"
          fill="#4F4B5C"
        />
        <path
          clipRule="evenodd"
          d="M21 18.5C19.7574 18.5 18.75 19.5074 18.75 20.75C18.75 21.9926 19.7574 23 21 23C22.2426 23 23.25 21.9926 23.25 20.75C23.25 19.5074 22.2426 18.5 21 18.5ZM17.25 20.75C17.25 18.6789 18.9289 17 21 17C23.0711 17 24.75 18.6789 24.75 20.75C24.75 22.8211 23.0711 24.5 21 24.5C18.9289 24.5 17.25 22.8211 17.25 20.75Z"
          fill="#4F4B5C"
        />
        <rect
          x="1.5"
          y="0.5"
          width="39"
          height="39"
          rx="19.5"
          stroke="#ECECED"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3499_23525"
          x="0"
          y="0"
          width="42"
          height="42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_3499_23525"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0666667 0 0 0 0 0.0470588 0 0 0 0 0.133333 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3499_23525"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3499_23525"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
