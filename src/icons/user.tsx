import { IconProps } from "./type";

export const ICUser: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
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
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ICUserV2: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
  width = 18,
  height = 18,
  className = "svgFillColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.82182 3.75C7.74487 3.75 6.87182 4.62305 6.87182 5.7C6.87182 6.77696 7.74487 7.65 8.82182 7.65C9.89878 7.65 10.7718 6.77696 10.7718 5.7C10.7718 4.62305 9.89878 3.75 8.82182 3.75ZM5.37182 5.7C5.37182 3.79462 6.91644 2.25 8.82182 2.25C10.7272 2.25 12.2718 3.79462 12.2718 5.7C12.2718 7.60538 10.7272 9.15 8.82182 9.15C6.91644 9.15 5.37182 7.60538 5.37182 5.7ZM1.60686 13.8644C2.78703 11.8959 5.27539 10.7071 8.82182 10.7071C12.3682 10.7071 14.8566 11.8959 16.0368 13.8644C16.2498 14.2196 16.1344 14.6803 15.7792 14.8933C15.4239 15.1062 14.9633 14.9909 14.7503 14.6357C13.9423 13.288 12.0734 12.2071 8.82182 12.2071C5.57026 12.2071 3.70132 13.288 2.89337 14.6357C2.68038 14.9909 2.21972 15.1062 1.86446 14.8933C1.50921 14.6803 1.39387 14.2196 1.60686 13.8644Z"
        fill={fill}
      />
    </svg>
  );
};

export const ICUserV3: React.FC<IconProps> = ({
  fill = "var(--icon-high-em)",
  width = 24,
  height = 24,
  className = "svgFillColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8004 3.40002C9.36445 3.40002 8.20039 4.56408 8.20039 6.00002C8.20039 7.43596 9.36445 8.60002 10.8004 8.60002C12.2363 8.60002 13.4004 7.43596 13.4004 6.00002C13.4004 4.56408 12.2363 3.40002 10.8004 3.40002ZM6.20039 6.00002C6.20039 3.45951 8.25988 1.40002 10.8004 1.40002C13.3409 1.40002 15.4004 3.45951 15.4004 6.00002C15.4004 8.54053 13.3409 10.6 10.8004 10.6C8.25988 10.6 6.20039 8.54053 6.20039 6.00002ZM22.3076 12.8744C22.6981 13.265 22.6981 13.8981 22.3076 14.2887L21.1054 15.4908L22.3075 16.6929C22.698 17.0834 22.698 17.7166 22.3075 18.1071C21.917 18.4977 21.2838 18.4977 20.8933 18.1071L19.6912 16.905L18.4892 18.107C18.0987 18.4976 17.4655 18.4976 17.075 18.107C16.6845 17.7165 16.6845 17.0833 17.075 16.6928L18.277 15.4908L17.0749 14.2888C16.6844 13.8982 16.6844 13.2651 17.0749 12.8745C17.4654 12.484 18.0986 12.484 18.4891 12.8745L19.6912 14.0766L20.8934 12.8744C21.2839 12.4839 21.9171 12.4839 22.3076 12.8744ZM1.4008 17.9995C1.40108 15.4592 3.46049 13.4 6.0008 13.4H13.2004C13.7527 13.4 14.2004 13.8477 14.2004 14.4C14.2004 14.9523 13.7527 15.4 13.2004 15.4H6.0008C4.56497 15.4 3.40096 16.5639 3.4008 17.9997L3.40039 21.6001C3.40033 22.1524 2.95256 22.6001 2.40028 22.6C1.84799 22.6 1.40033 22.1522 1.40039 21.5999L1.4008 17.9995Z"
        fill={fill}
      />
    </svg>
  );
};

export const ICUserV4: React.FC<IconProps> = ({
  fill = "#F55858",
  className = "svgFillColor",
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
        d="M8.00003 8C8.00003 7.20888 8.23462 6.43552 8.67415 5.77772C9.11367 5.11992 9.73839 4.60723 10.4693 4.30448C11.2002 4.00173 12.0045 3.92252 12.7804 4.07686C13.5563 4.2312 14.269 4.61216 14.8285 5.17157C15.3879 5.73098 15.7688 6.44372 15.9232 7.21964C16.0775 7.99556 15.9983 8.79983 15.6955 9.53074C15.3928 10.2616 14.8801 10.8864 14.2223 11.3259C13.5645 11.7654 12.7912 12 12 12C10.9392 12 9.92174 11.5786 9.1716 10.8284C8.42145 10.0783 8.00003 9.06087 8.00003 8ZM19.89 18.55L18.45 15.66C18.2006 15.1604 17.8166 14.7403 17.3414 14.447C16.8661 14.1537 16.3185 13.9989 15.76 14H8.24003C7.68158 13.9989 7.13391 14.1537 6.65866 14.447C6.18342 14.7403 5.79947 15.1604 5.55003 15.66L4.11003 18.55C4.03332 18.7022 3.99679 18.8715 4.00393 19.0419C4.01106 19.2122 4.06162 19.3778 4.15079 19.5231C4.23996 19.6684 4.36479 19.7885 4.51343 19.8719C4.66206 19.9554 4.82956 19.9995 5.00003 20H19C19.1705 19.9995 19.338 19.9554 19.4866 19.8719C19.6353 19.7885 19.7601 19.6684 19.8493 19.5231C19.9384 19.3778 19.989 19.2122 19.9961 19.0419C20.0033 18.8715 19.9667 18.7022 19.89 18.55Z"
        fill={fill}
      />
    </svg>
  );
};
