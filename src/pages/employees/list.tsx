import { Modal, Row, Table } from "antd"
import { ColumnType, ColumnsType } from "antd/lib/table";
import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { BookingPagination } from "../../components/pagination";
import { ICAdd, ICSort, ICNoneData } from "../../icons";
import { SortOrder } from "antd/lib/table/interface";
import { useSortData } from ".";
import styled from 'styled-components';
import { useNotification } from "../../hooks/useNotification";
import { BookingButton, IconButton } from "../../components/button";
import { EmployeeForm } from "./employee";
import { useForm } from "antd/lib/form/Form";
import { EGender, TUserRequest } from "../../api/user/type";
import { deleteUser, exportUser, saveEmployee, updateUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { UserEntity, IPagination, ISearchCustomers } from "../customers/type";
import { formatPhoneNumber, type Value } from "react-phone-number-input";
import { setDataEmployee } from "../../redux/slices/employee";
import { ICMaterialSymbol } from "../../icons/material-symbol";
import { USER_ROLES } from "../../utils/constants";

const ActionMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
    padding-right: 16px;
    &:hover {
        background-color: #F7F8FA;
    }
    button {
        padding: 0 !important;
    }
`;

const WrapperTable = styled.div`
    .ant-table-thead >tr>th {
        background-color: white;
    }
    .data-row:nth-child(odd) {
        background-color: #F7F8FA;
    }
    .ant-table-column-sorters .ant-table-column-sorter-inner {
        .anticon {
            display: none;
        }
    }
`;

const TitleRenderer: React.FC<{ title: string }> = ({ title }) => {
    const keyword = React.useContext(KeywordContext);

    return <Highlighter
        highlightClassName="text-highlight"
        searchWords={[`${keyword || ''}`]}
        autoEscape={true}
        className="text-body text-high-em"
        textToHighlight={title || ''}
    />
}
type SortableColumnProps = {
    title: string;
    order?: SortOrder;
    name: string;
}
const SortableColumn: React.FC<SortableColumnProps> = ({
    title,
    order,
    name
}) => {
    const { setSortData } = useSortData();
    return <div className="flex space-x-3 items-center justify-between select-none group" onClick={() => {
        setSortData({
            field: order === 'descend' ? 'createdDate' : name,
            order: order === 'descend' ? 'desc' : !order ? 'asc' : 'desc',
        });
    }}>
        <span className="text-body-bold text-high-em">{title as string}</span>
        <ICSort order={order} />
    </div>
}

type EmployeePageListProps = {
    employeesList: UserEntity[];
    setEmployeesList: (data: UserEntity[]) => void;
    keyword?: string;
    pagination?: IPagination;
    filterParams: ISearchCustomers;
    onChangePaging: ({ page }: { page: number }) => void;
    onReload: () => void;
}
const KeywordContext = React.createContext<string>('');

export const EmployeePageList: React.FC<EmployeePageListProps> = ({
    employeesList,
    keyword,
    pagination,
    onChangePaging,
    filterParams,
    onReload,
    setEmployeesList,
}) => {
    const dispatch = useDispatch();
    const { showSuccess, showError } = useNotification();
    const onChangePage = (page: number) => {
        onChangePaging({ page })
    };
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [employeeId, setEmployeeId] = React.useState<string | undefined>("");
    const [showEmployeeDialog, setShowEmployeeDialog] = React.useState(false);
    const [employeeSelected, setemployeeSelected] = React.useState<UserEntity | undefined>(undefined);
    const [form] = useForm();

    const onShowDeleteModal = React.useCallback((id: string) => {
        setEmployeeId(id);
        setShowDeleteModal(true);
    }, [setShowDeleteModal]);

    const columns: ColumnsType<UserEntity> = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            field: 'FIRST_NAME',
            key: 'firstName',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer title={title} />;
            },
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            field: 'LAST_NAME',
            key: 'lastName',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer title={title} />;
            },
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            field: 'dob',
            key: 'dob',
            sorter: false,
            width: '180px',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            field: 'PHONE_NUMBER',
            key: 'phoneNumber',
            sorter: true,
            width: '180px',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: UserEntity) => {
                return <ActionMenu>
                    <IconButton icon={<ICMaterialSymbol icon="edit_square" />} btnType="tertiary" onClick={() => {
                        setemployeeSelected(data);
                        setShowEmployeeDialog(true);
                    }} />
                    <IconButton icon={<ICMaterialSymbol icon="delete" />} onClick={() => onShowDeleteModal(_id)} btnType="tertiary" />
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<UserEntity>) => {
        if (col.sorter) {
            const oldTitle = col.title;
            col.title = ({ sortColumns }) => {
                const sortedColumn = sortColumns?.find(({ column }) => column.key === col.key);
                return <SortableColumn
                    title={oldTitle as string}
                    order={sortedColumn?.order}
                    name={col.dataIndex as string}
                />
            }
        } else {
            col.title = <div className="text-body-bold text-high-em">{col.title as string}</div>;
        }
        col.showSorterTooltip = false;
        return col
    });

    const doSaveEmployee = React.useCallback(async (employeeId: string | undefined, employee: TUserRequest) => {
        try {
            const response = employeeId ? await updateUser(employeeId, employee) : await saveEmployee(employee);
            if (response) {
                const { data } = response;
                if (!employeeId) {
                    setShowEmployeeDialog(false);
                    const newEmployeeList = [data, ...employeesList];
                    // setEmployeesList(newEmployeeList);
                    dispatch(setDataEmployee(newEmployeeList));
                    const fullName = `${employee.firstName} ${employee.lastName}`;
                    const message = `${fullName} is registered successfully.`;
                    showSuccess('Save technician successfully', message);
                } else {
                    showSuccess('Update technician successfully', 'Technician information has been updated');
                    setShowEmployeeDialog(false);
                    const newEmployList = employeesList.map((item) => {
                        if (item.id === employeeId) {
                            return {
                                ...item,
                                ...data,
                            }
                        }
                        return item;
                    });
                    dispatch(setDataEmployee(newEmployList));
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Please check your input data';
            showError('Save technician failed', errorMessage);
        }
    }, [employeesList, dispatch, showSuccess, showError]);

    const onSaveEmployee = React.useCallback(() => {
        form.validateFields().then((values) => {
            const dob = values.dobDate ? values.dobDate.format('YYYY-MM-DD') : undefined;
            const phoneNumberTemp = (values.phoneNumber as string).replace(/-/g, '');
            const phoneNumberVal = formatPhoneNumber(phoneNumberTemp as Value) || phoneNumberTemp;
            const phoneNumberValTemp = phoneNumberVal ? phoneNumberVal.replace(/[^0-9]/g, '') : '';
            const phoneNumber = phoneNumberValTemp.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            const newValues: TUserRequest = {
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: phoneNumber,
                dob: dob,
                email: values.email,
                gender: values.gender ?? EGender.OTHER,
                password: values.password,
            };
            const employeeId = employeeSelected ? employeeSelected['id'] : undefined;
            doSaveEmployee(employeeId, newValues);
        }).catch((error) => {
            showError('Save technician failed', 'Please check your input data');
        });
    }, [form, employeesList, employeeSelected, showError]);

    const onDeleteUser = React.useCallback(async (employeeId: string | undefined) => {
        if (!employeeId) {
            return;
        }
        try {
            dispatch(setLoading(true));
            const result = await deleteUser(employeeId);
            dispatch(setLoading(false));
            if (result) {
                setShowDeleteModal(false);
                showSuccess('Delete technician successfully', 'Technicians has been deleted');
                const newEmployList = employeesList.filter((item) => item.id !== employeeId);
                setEmployeesList(newEmployList);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Error occurred while deleting technicians';
            showError('Delete technician failed', errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, showSuccess, employeesList, setEmployeesList, showError]);

    const onExportExcel = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const payload = [USER_ROLES.EMPLOYEE];
            const response = await exportUser(payload);
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition?.split('filename=')[1] || 'technicians.xlsx';
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showSuccess('Export successfully', 'Technicians has been exported');
            }
        }
        catch (error: any) {
            const errorMessage = error?.response?.data?.errorMessage || error?.response?.statusText;
            errorMessage && showError("Error", errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, showError, showSuccess]);

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full px-[12px] py-[20px] shadow-e-03 items-center justify-between bg-white rounded-[12px]">
            <div className="flex gap-3 items-center justify-end">
            </div>
            <div className="flex gap-[10px]">
                <BookingButton
                    btnType="primary"
                    onClick={() => {
                        setemployeeSelected(undefined);
                        setShowEmployeeDialog(true);
                    }}
                    style={{
                        width: '220px',
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <ICAdd stroke="#fff" width={18} height={18} />
                        <span>
                            Create new technicians
                        </span>
                    </div>
                </BookingButton>
                <BookingButton
                    btnType="secondary"
                    onClick={onExportExcel}
                    style={{
                        width: '80px',
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <span>
                            Export
                        </span>
                    </div>
                </BookingButton>
            </div>
        </div>
        <div className="flex flex-col w-full h-full bg-white rounded-[12px] overflow-hidden shadow-e-03">
            <KeywordContext.Provider value={keyword ?? ''}>
                <Table
                    key="id"
                    className={classNames("white-header w-full")}
                    columns={columns}
                    dataSource={employeesList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="id"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} onCreateNew={() => {
                            setemployeeSelected(undefined);
                            setShowEmployeeDialog(true);
                        }} />
                    }}
                    pagination={false}
                />
            </KeywordContext.Provider>
            {pagination && pagination.totalPages > 1 && <Row gutter={16}
                style={{
                    margin: 0,
                }}
                className="grid items-center justify-end w-full bg-white p-[16px] border-t border-solid border-outline-med rounded-b-[12px]">
                <BookingPagination
                    onChange={onChangePage}
                    defaultCurrent={pagination?.page}
                    defaultPageSize={pagination?.limit}
                    total={pagination?.totalElements}
                    currentPage={pagination?.page}
                    showSizeChanger={false}
                />
            </Row>}
        </div>

        <Modal
            centered
            onCancel={() => setShowDeleteModal(false)}
            open={showDeleteModal}
            title={
                <div className="font-bold text-[18px]">
                    Confirm
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="danger"
                        btnSize="sm"
                        onClick={() => {
                            onDeleteUser(employeeId);
                            setShowDeleteModal(false);
                        }}>
                        Delete
                    </BookingButton>
                </div>
            }>
            <p>
                Are you sure you want to delete this technician?
            </p>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowEmployeeDialog(false)}
            open={showEmployeeDialog}
            maskClosable={false}
            afterClose={() => form.resetFields()}
            width={1000}
            title={
                <div className="font-bold text-[18px]">
                    {employeeSelected ? 'Edit Technician' : 'New Technician Register'}
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowEmployeeDialog(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onSaveEmployee}>
                        Save
                    </BookingButton>
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                {showEmployeeDialog && <EmployeeForm employeeData={employeeSelected} form={form} />}
            </div>
        </Modal>

    </WrapperTable>
}

type IEmptyTableProps = {
    keyword: string | undefined;
    onCreateNew: () => void;
}

const EmptyTable: React.FC<IEmptyTableProps> = ({ keyword, onCreateNew }) => {
    return (
        <div className="my-6 flex flex-col gap-[5px]">
            <div className="flex justify-center">
                <ICNoneData />
            </div>
            <div className="text-standard-bold text-high-em">
                {keyword ? `No data found with keyword “${keyword}”` : 'No data found'}
            </div>
            <div className="flex justify-center">
                <span>
                    <BookingButton
                        btnType="secondary"
                        btnSize="sm"
                        style={{
                            borderRadius: '144px',
                        }}
                        onClick={() => onCreateNew()}>
                        <div className="flex space-x-2 items-center">
                            <ICAdd stroke="#7357FF" width={18} height={18} />
                            <span>
                                Create new technicians
                            </span>
                        </div>
                    </BookingButton>
                </span>
            </div>
        </div>
    )
}