import { Spin } from "antd";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

export const Loading: React.FC = () => {
  const isLoading = useSelector(
    (state: RootState) => state.appInfo.isShowLoading,
  );

  return (
    <div
      className={classNames(
        isLoading ? "z-[9999] bg-[#52515163]" : "z-[-1]",
        "fixed w-full h-full top-0 left-0",
      )}
    >
      {isLoading ? (
        <div className="fixed top-[49%] left-[49%]">
          <Spin size="large" />
        </div>
      ) : null}
    </div>
  );
};
