import { Checkbox, CheckboxProps } from "antd";

type BookingCheckBoxProps = CheckboxProps & {};
export const BookingCheckBox: React.FC<BookingCheckBoxProps> = ({ style, ...props }) => {
  return (
    <Checkbox
      className="purple-checkbox"
      {...props}
      style={{
        fontSize: "12px",
        fontWeight: 500,
        ...style,
      }}
    />
  );
};
