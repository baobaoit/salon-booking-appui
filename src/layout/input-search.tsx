import classNames from "classnames";
import styled from "styled-components";
import { BookingInput } from "../components/form/input";
import { ICSearch } from "../icons";
import React from "react";
import debouce from 'lodash/debounce';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div``;

type InputSearchProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  onChangeFilter: (value: string) => void;
  selectedMenu: string;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  value,
  setValue,
  placeholder = "Search",
  onChangeFilter,
  selectedMenu,
}) => {

  const navigate = useNavigate();

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e?.target?.value;
    setValue(newValue);
    if (newValue && newValue.length < 3) {
      return;
    }
    onSearchKeyword(newValue);
  }, [selectedMenu, navigate]);

  const onSearchKeyword = React.useMemo(() => {
    return debouce(onChangeFilter, 600);
}, [onChangeFilter]);

  React.useEffect(() => {
    return () => {
      onSearchKeyword.cancel();
    }
  }, [onSearchKeyword]);

  const onClearValue = React.useCallback(() => {
    setValue("");
    onChangeFilter("");
  } , [selectedMenu]);

  return (
    <Wrapper className="flex justify-center items-center w-full relative">
      <div
        className={classNames(
          "flex flex-col w-full overflow-hidden box-border p-[10px]",
        )}
      >
        <BookingInput
          placeholder={placeholder}
          hasClearIcon={true}
          textSize="md"
          onClearValue={onClearValue}
          onChange={handleChange}
          value={value}
          wrapperClassName="w-full flex items-center justify-center"
          suffix={<ICSearch />}
        />
      </div>
    </Wrapper>
  );
};
