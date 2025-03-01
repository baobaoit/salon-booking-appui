import { IconProps } from "./type";

export const ICStarOutline: React.FC<IconProps> = ({
  stroke = "#7357FF",
  width = 24,
  height = 25,
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
        d="M17.5951 20.4949L17.5962 20.5006L17.5808 20.4999L17.5558 20.5L12.4636 17.834L11.9998 17.5912L11.536 17.834L6.43595 20.504L6.43435 20.5049L7.43435 14.8748L7.52718 14.3522L7.14634 13.9825L3.05154 10.0069L8.73386 9.17952L9.25608 9.10348L9.48801 8.62945L11.998 3.49945L11.998 3.49946L11.9997 3.4959L12.0039 3.50437L14.5439 8.62437L14.7769 9.09399L15.2957 9.16952L20.978 9.99695L16.8832 13.9725L16.5023 14.3422L16.5952 14.8648L17.5952 20.4948L17.5951 20.4949Z"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
};
