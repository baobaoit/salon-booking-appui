import { Select, SelectProps, Input } from "antd";
import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import {
  ICCheckMultiComplete,
  ICCheckSingleComplete,
  ICChevronDown,
} from "../../icons/index";

const StyledSelect = styled.div`
  &.multiple-control {
    .ant-select-clear {
      display: none;
    }
  }
  &.has-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .ant-select {
    height: 44px;
    background-color: transparent !important;
    border: none !important;
  }
  .ant-select-clear {
    right: 38px;
    width: auto;
    height: auto;
    top: 42%;
    opacity: 1;
  }
  .ant-select-arrow svg {
    color: #46485c;
  }

  .ant-select:hover .ant-select-arrow:not(:last-child) {
    opacity: 1;
  }

  .ant-select.ant-select-single.ant-select-disabled {
    background-color: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
  }
  .has-icon {
    .ant-select-selection-placeholder,
    .ant-select-selection-item,
    .ant-select-selector .ant-select-selection-search {
      padding-left: 30px;
    }
  }
  .ant-select-selector {
    padding-right: 32px !important;
  }
`;
const StyledMenu = styled.div`
  &.single {
    .ant-select-item-option-selected .ant-select-item-option-state {
      position: relative;
      padding-right: 20px;
      &:after {
        position: absolute;
        content: "";
        width: 20px;
        height: 20px;
        right: 0;
        background: url("../images/checkmark-circle.png") no-repeat;
        background-position: 100%;
        background-size: contain;
      }
    }
  }
  .ant-select-item {
    padding: 14px 16px;
    min-height: auto;
    color: #46485c;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: #f3fdf8;
  }
  .rc-virtual-list-holder .anticon {
    background-color: #0baa60;
    color: white;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-right: 2px;
  }
`;

const AllMenuItem = styled.div`
  transition: background 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;

type BookingSelectProps = SelectProps & {
  icon?: React.ReactNode;
  name?: string;
  label?: string;
  isRequired?: boolean;
  hasSearch?: boolean;
  hasFilterSort?: boolean;
  allowClear?: boolean;
  additionalOptions?: {
    label: string;
    value: string;
    _id: string;
  }[];
  hasAllOption?: boolean;
  onSelectedAll?: (isCheckAll: boolean | undefined) => void;
};
export const BookingSelect: React.FC<BookingSelectProps> = ({
  options: initalOptions,
  style,
  name,
  isRequired,
  hasFilterSort = true,
  hasSearch = true,
  allowClear = true,
  onSelectedAll,
  hasAllOption,
  additionalOptions,
  ...props
}) => {
  const { mode, value } = props;
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState<string>();
  const [isCheckAll, setIsCheckAll] = React.useState<boolean | undefined>(
    false,
  );

  const options = React.useMemo(() => {
    let newOptions: any[] = [];
    if (additionalOptions) newOptions.push(...additionalOptions);
    if (initalOptions) newOptions.push(...initalOptions);
    // return _.union(newOptions)
    //   .filter((d) =>
    //     d.label?.toLowerCase().includes(keyword?.toLowerCase() || ""),
    //   )
    //   .map((item) => {
    //     if (initalOptions) return item;
    //     return {
    //       ...item,
    //       label: item.label,
    //       value: item.value,
    //       code: item.code,
    //     };
    //   });
    return newOptions.filter((d) =>
      d.label?.toLowerCase().includes(keyword?.toLowerCase() || ""),
    ).map((item) => {
      if (initalOptions) return item;
      return {
        ...item,
        label: item.label,
        value: item.value,
        code: item.code,
      };
    });
  }, [initalOptions, keyword, additionalOptions]);

  const onFilterSort = React.useCallback(
    (optionA: any, optionB: any) => {
      if (hasFilterSort) {
        // sort by order field
        if (optionA?.order && optionB?.order) {
          return optionA.order - optionB.order;
        }
        // Keep additional options on top
        if (additionalOptions?.find((d) => d._id === optionA.value)) return -1;
        if (additionalOptions?.find((d) => d._id === optionB.value)) return 1;
        return (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase());
      }
      return 1;
    },
    [hasFilterSort, additionalOptions],
  );

  const onClickSelectAll = React.useCallback(() => {
    setIsCheckAll((prev) => !prev);
    onSelectedAll && onSelectedAll(!isCheckAll);
  }, [isCheckAll, onSelectedAll, setIsCheckAll]);

  const activeIconCompleted = React.useMemo(() => {
    if (options?.length > 0 && value?.length > 0) {
      const isCompleted = options?.every((item: any) =>
        value?.includes(item.value),
      );
      if (mode === "multiple") {
        return isCompleted ? <ICCheckMultiComplete /> : null;
      }
      return isCompleted ? <ICCheckSingleComplete /> : null;
    }
    return null;
  }, [options, value, mode]);

  React.useEffect(() => {
    if (options?.length > 0 && value?.length > 0) {
      const isCompleted = options?.every((item: any) =>
        value?.includes(item.value),
      );
      setIsCheckAll(isCompleted);
    }
  }, [options, value]);

  return (
    <StyledSelect
      className={classNames([
        "space-y-1 text-start relative",
        {
          "multiple-control": mode === "multiple",
        },
        { 'has-label': !!props.label }
      ])}
    >
      {props.label && (
        <label className="space-x-1 text-med-em text-body-medium">
          <span>{props.label}</span>
          {isRequired && <span className="text-red-500 text-xs">(*)</span>}
        </label>
      )}
      <div className={classNames("relative", props.icon ? "has-icon" : "")}>
        {props.icon && (
          <div className="absolute top-[7px] left-[10px] z-[1]">
            {props.icon}
          </div>
        )}
        <Select
          options={options}
          showSearch={false}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          open={open}
          maxTagCount="responsive"
          onDropdownVisibleChange={(visible) => setOpen(visible)}
          // allowClear={
          //   {
          //     clearIcon: <ICClose width={18} height={18} fill="#46485C" />
          //   }
          // }
          filterSort={onFilterSort}
          suffixIcon={<ICChevronDown />}
          style={{
            borderRadius: "4px",
            border: "1px solid #D6D7DD",
            fontSize: "14px",
            fontWeight: 500,
            backgroundColor: "white",
            width: "100%",
            ...style,
          }}
          {...props}
          dropdownRender={(menu) => (
            <>
              {hasSearch && <div className="pw-full py-[8px] px-[14px]">
                <Input
                  placeholder="Search"
                  value={keyword}
                  style={{
                    width: '100%',
                    border: '1px solid #AF7DE7',
                    borderRadius: '4px'
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value || '')}
                />
              </div>}
              {hasAllOption && <AllMenuItem
                onClick={onClickSelectAll}
                className="flex items-center justify-between px-[16px] py-[14px] cursor-pointer text-[#46485C] font-medium text-[14px] leading-[17px]">
                <div>
                  All
                </div>
                <div>
                  {activeIconCompleted}
                </div>
              </AllMenuItem>}
              <StyledMenu className={mode === "multiple" ? 'multiple' : 'single'}>{menu}</StyledMenu>
            </>
          )}
        />
      </div>
    </StyledSelect>
  );
};
