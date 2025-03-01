import { Pagination, PaginationProps } from "antd";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  li {
    width: 34px;
    height: 34px;
    border: 0;
    color: #8d8a95;
    border-radius: 4px;
    background-color: transparent;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    margin-right: 30px;
    &:hover {
      a {
        color: #3c28a4;
      }
    }
    &.ant-pagination-item-active {
      background-color: #f1eeff;
      a {
        color: #3c28a4;
      }
    }
    &.ant-pagination-prev,
    &.ant-pagination-next {
      button {
        background-color: transparent;
        border: 1px solid transparent;
        &:hover {
          border-color: #7357ff;
          color: #7357ff;
        }
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
  li:last-child {
    margin-right: 0;
  }
`;

interface BookingPaginationProps extends PaginationProps {
  currentPage?: number;
  total?: number;
  showSizeChanger?: boolean;
}

export const BookingPagination: React.FC<BookingPaginationProps> = ({
  currentPage = 1,
  total = 20,
  showSizeChanger = false,
  ...props
}) => {
  return (
    <PaginationWrapper>
      <Pagination
        current={currentPage}
        total={total}
        showSizeChanger={showSizeChanger}
        {...props}
      />
    </PaginationWrapper>
  );
};
