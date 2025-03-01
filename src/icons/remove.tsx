import { IconProps } from "./type";

export const ICRemove: React.FC<IconProps> = ({
  fill = "#46485C",
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.75 1C0.75 0.585786 1.08579 0.25 1.5 0.25H10.5C10.9142 0.25 11.25 0.585786 11.25 1C11.25 1.41421 10.9142 1.75 10.5 1.75H1.5C1.08579 1.75 0.75 1.41421 0.75 1Z"
        fill={fill}
      />
    </svg>
  );
};
