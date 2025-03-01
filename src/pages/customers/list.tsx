import { Modal, Row, Table } from "antd"
import { ColumnType, ColumnsType } from "antd/lib/table";
import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { BookingPagination } from "../../components/pagination";
import { ICAdd, ICSort, ICEdit, ICDelete, ICNoneData, ICEye } from "../../icons";
import { SortOrder } from "antd/lib/table/interface";
import { useSortData } from ".";
import styled from 'styled-components';
import { useNotification } from "../../hooks/useNotification";
import { BookingButton, IconButton } from "../../components/button";
import { IPagination, ISearchCustomers, TCheckoutCustomer, UserEntity } from "./type";
import { CustomerForm } from "./customer";
import { useForm } from "antd/lib/form/Form";
import { EGender, TCheckInCustomer, TUserRequest, TNailService, SearchQueryParams, SortProperty, Direction, TSearchOrder, EOrderStatus } from "../../api/user/type";
import { checkInCustomer, deleteUser, saveCustomer, searchOrders, updateUser } from "../../api/user";
import Swal from 'sweetalert2';
import { CheckInCustomerForm } from "./checkin_customer";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { useCustomer } from "../../hooks/useCustomer";
import { BookingTooltip } from "../../components/tooltip";
import { CheckOutCustomerForm } from "./checkout_customer";
import { formatPhoneNumber, type Value } from "react-phone-number-input";
import { setDataCustomer } from "../../redux/slices/customer";
import { CustomerDetails } from "./customer_details";
import { ICMaterialSymbol } from "../../icons/material-symbol";
import { exportCustomer } from "../../api/customer-credit";

const ActionMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;
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

type CustomersPageListProps = {
    customerList: UserEntity[];
    setCustomerList: (data: UserEntity[]) => void;
    keyword?: string;
    pagination?: IPagination;
    filterParams: ISearchCustomers;
    onChangePaging: ({ page }: { page: number }) => void;
    onReload: () => void;
}
const KeywordContext = React.createContext<string>('');

export const CustomersPageList: React.FC<CustomersPageListProps> = ({
    customerList,
    setCustomerList,
    keyword,
    pagination,
    onChangePaging,
    filterParams,
    onReload,
}) => {
    const dispatch = useDispatch();
    const { showSuccess, showError } = useNotification();
    const onChangePage = (page: number) => {
        onChangePaging({ page })
    };
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [customerId, setCustomerId] = React.useState<string | undefined>("");
    const [showCustomerDialog, setShowCustomerDialog] = React.useState(false);
    const [customerSelected, setCustomerSelected] = React.useState<UserEntity | undefined>(undefined);
    const [form] = useForm();

    // CheckIn form
    const { loadNailServices } = useCustomer();
    const [showCheckInDialog, setShowCheckInDialog] = React.useState(false);
    const [formCheckIn] = useForm();
    const [serviceIds, setServiceIds] = React.useState<string[]>([]);
    const [technicianId, setTechnicianId] = React.useState<string>('');
    const [nailServices, setNailServices] = React.useState<TNailService[]>([]);

    const [showCheckOutDialog, setShowCheckOutDialog] = React.useState(false);
    const [checkoutList, setCheckoutList] = React.useState<TCheckoutCustomer[]>([]);

    const [showCustomerDetailsDialog, setShowCustomerDetailsDialog] = React.useState(false);

    const onShowDeleteModal = React.useCallback((id: string) => {
        setCustomerId(id);
        setShowDeleteModal(true);
    }, [setShowDeleteModal]);

    const onShowCheckOutDialog = React.useCallback(async (customerId: string) => {
        const newQueryParams: SearchQueryParams = {
            page: 0,
            size: 100,
            direction: Direction.DESC,
            property: SortProperty.CREATED_DATE,
        };
        const payload: TSearchOrder = {
            statuses: [EOrderStatus.IN_SERVICE, EOrderStatus.WAITING_SERVICE],
            customerId: customerId,
        };
        try {
            dispatch(setLoading(true));
            const { data } = await searchOrders(newQueryParams, payload);
            const _checkoutList = data?.content || []; 
            setCheckoutList(_checkoutList);
            if (_checkoutList?.length > 0) {
                setShowCheckOutDialog(true);
            } else {
                Swal.fire('No check-in order', 'There is no check-in order for this customer', 'info');
            }
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false));
        }
    } , [dispatch]);

    const columns: ColumnsType<UserEntity> = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            field: 'FIRST_NAME',
            key: 'firstName',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer key={title} title={title} />;
            },
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            field: 'LAST_NAME',
            key: 'lastName',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer key={title} title={title} />;
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
                return <ActionMenu key={_id}>
                    <BookingTooltip content="View Credit Customer"
                        childNode={
                            <IconButton icon={<ICEye />} btnType="tertiary" onClick={() => {
                                setCustomerSelected(data);
                                setShowCustomerDetailsDialog(true);
                            }} />
                        }>
                    </BookingTooltip>
                    <div className="flex w-[25px] h-[25px]" onClick={() => {
                            formCheckIn.resetFields();
                            onLoadNailServices();
                            setCustomerSelected(data);
                            setShowCheckInDialog(true);
                    }}>
                        <BookingTooltip content="Check in"
                            placement="top"
                            childNode={<ICMaterialSymbol icon="input" />}>
                        </BookingTooltip>
                    </div>
                    <div className="flex w-[25px] h-[25px]" onClick={() => {
                        setCustomerSelected(data);
                        onShowCheckOutDialog(data.id);
                    }}>
                        <BookingTooltip content="Checkout"
                            placement="top"
                            childNode={<ICMaterialSymbol icon="shopping_cart_checkout"/>}>
                        </BookingTooltip>
                    </div>
                    <IconButton icon={<ICMaterialSymbol icon="edit_square" />} btnType="tertiary" onClick={() => {
                        setCustomerSelected(data);
                        setShowCustomerDialog(true);
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
        return col;
    });

    const doSaveCustomer = React.useCallback(async (customerId: string | undefined, customer: TUserRequest) => {
        try {
            const response = customerId ? await updateUser(customerId, customer) : await saveCustomer(customer);
            if (response) {
                const { data } = response;
                if (!customerId) {
                    const { data } = response;
                    if (!data) {
                        showError('Save customer failed', 'Please check server response');
                        return;
                    }
                    const fullName = `${customer.firstName} ${customer.lastName}`;
                    // const message = `<strong>${fullName}</strong> is registered successfully. Please click OK to continue check-in.`;
                    // Swal.fire({
                    //     title: 'Save customer successfully',
                    //     html: message,
                    //     icon: 'success',
                    //     confirmButtonText: 'OK',
                    //     confirmButtonColor: '#007faa',
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         onLoadNailServices();
                    //         setShowCheckInDialog(true);
                    //     }
                    // });
                    setShowCustomerDialog(false);
                    const newCustomerList = [data, ...customerList];
                    // setCustomerList(newCustomerList);
                    dispatch(setDataCustomer(newCustomerList));
                    showSuccess('Save customer successfully', `${fullName} is registered successfully.`);
                } else {
                    showSuccess('Update customer successfully', 'Customer information has been updated');
                    setShowCustomerDialog(false);
                    const newCustomerList = customerList.map((item) => {
                        if (item.id === customerId) {
                            return {
                                ...item,
                                ...data,
                            }
                        }
                        return item;
                    });
                    dispatch(setDataCustomer(newCustomerList));
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Please check your input data';
            showError('Save customer failed', errorMessage);
        }
    }, [customerList, dispatch, showSuccess, showError]);

    const onSaveCustomer = React.useCallback(() => {
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
            };
            const customerId = customerSelected ? customerSelected['id'] : undefined;
            doSaveCustomer(customerId, newValues);
        }).catch((error) => {
            showError('Save customer failed', 'Please check your input data');
        });
    }, [form, customerList, customerSelected, showError]);

    const onDeleteUser = React.useCallback(async (customerId: string | undefined) => {
        if (!customerId) {
            return;
        }
        try {
            dispatch(setLoading(true));
            const result = await deleteUser(customerId);
            if (result) {
                dispatch(setLoading(false));
                setShowDeleteModal(false);
                showSuccess('Delete customer successfully', 'Customer has been deleted');
                const newCustomer = customerList.filter((item) => item.id !== customerId);
                setCustomerList(newCustomer);
                
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Error occurred while deleting customer';
            showError('Delete customer failed', errorMessage);
            dispatch(setLoading(false));
        }
    }, [dispatch, customerList, setCustomerList, showError, showSuccess]);

    const onLoadNailServices = React.useCallback(async () => {
        try {
            const result = await loadNailServices('');
            setNailServices(result.map((item: TNailService) => ({
                ...item,
                value: `${item.name} ${item.price}`,
                label: `${item.name} ${item.price}`,
            })));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const resetCheckinForm = React.useCallback(() => {
        setServiceIds([]);
        setTechnicianId('');
        setCustomerSelected(undefined);
        setNailServices([]);
    } , [formCheckIn]);

    const doCheckInCustomer = React.useCallback(async (customerId: string, payload: TCheckInCustomer) => {
        try {
            dispatch(setLoading(true));
            const result = await checkInCustomer(customerId, payload);
            if (result) {
                setShowCheckInDialog(false);
                showSuccess('Check-in successfully', 'Customer has been checked-in');
                resetCheckinForm();
                onReload();
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Please check your input data';
            showError('Check-in failed', errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }

    }, [dispatch, showSuccess, formCheckIn, showError, onReload]);

    const onSaveCheckInCustomer = React.useCallback(async () => {
        formCheckIn.validateFields().then((values) => {
            const newValues: TCheckInCustomer = {
                services: serviceIds,
                clientNotes: values.clientNotes,
                technicianId: technicianId,
            };
            const customerId = customerSelected ? customerSelected['id'] : undefined;
            if (!customerId) {
                return;
            }
            doCheckInCustomer(customerId, newValues);
        }
        ).catch((error) => {
            showError('Save customer failed', 'Please check your input data');
        });
    }, [serviceIds, formCheckIn, customerSelected, technicianId, showError]);

    const onExportExcel = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await exportCustomer();
            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition?.split('filename=')[1] || 'customers.xlsx';
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showSuccess('Export successfully', 'Customers have been exported');
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
                        setCustomerSelected(undefined);
                        setShowCustomerDialog(true);
                    }}
                    style={{
                        width: '200px',
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <ICAdd stroke="#fff" width={18} height={18} />
                        <span>
                            Create new customer
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
                    dataSource={customerList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="id"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} onCreateNew={() => {
                            setCustomerSelected(undefined);
                            setShowCustomerDialog(true);
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
                            onDeleteUser(customerId);
                            setShowDeleteModal(false);
                        }}>
                        Delete
                    </BookingButton>
                </div>
            }>
            <p>
                Are you sure you want to delete this customer?
            </p>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowCustomerDialog(false)}
            open={showCustomerDialog}
            maskClosable={false}
            width={1000}
            afterClose={() => {
                form.resetFields();
            }}
            title={
                <div className="font-bold text-[18px]">
                    {customerSelected ? 'Edit Customer' : 'New Customer Register'}
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowCustomerDialog(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onSaveCustomer}>
                        Save
                    </BookingButton>
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                {showCustomerDialog && <CustomerForm customerData={customerSelected} form={form} />}
            </div>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowCheckInDialog(false)}
            open={showCheckInDialog}
            afterClose={() => {
                resetCheckinForm();
            }}
            maskClosable={false}
            width={1000}
            title={
                <div className="text-[18px]">
                    <span className="text-[#007faa]">{customerSelected?.firstName} {customerSelected?.lastName}</span> Check In details
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowCheckInDialog(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onSaveCheckInCustomer}>
                        Save
                    </BookingButton>
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                <CheckInCustomerForm
                    customerData={customerSelected}
                    serviceIds={serviceIds}
                    setServiceIds={setServiceIds}
                    setTechnicianId={setTechnicianId}
                    nailServices={nailServices}
                    setNailServices={setNailServices}
                    form={formCheckIn} />
            </div>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowCheckOutDialog(false)}
            open={showCheckOutDialog}
            destroyOnClose={true}
            afterClose={() => {
                setCustomerSelected(undefined);
                setCheckoutList([]);
            }}
            maskClosable={false}
            width={1000}
            styles={{
                header: {
                    padding: '15px 10px',
                    borderBottom: '1px solid #E5E5E5',
                },
                content: {
                    padding: '0px',
                },
                body: {
                    padding: '5px 0 0 0',
                }
            }}
            title={
                <div className="text-[18px]">
                    <span className="text-[#007faa]">{customerSelected?.firstName} {customerSelected?.lastName}</span> Check Out
                </div>
            }
            footer={null}>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                {showCheckOutDialog && <CheckOutCustomerForm
                    customerData={customerSelected}
                    checkoutList={checkoutList}
                    setShowCheckOutDialog={setShowCheckOutDialog}
                    setCheckoutList={setCheckoutList}
                />}
            </div>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowCustomerDetailsDialog(false)}
            open={showCustomerDetailsDialog}
            afterClose={() => {
                setCustomerSelected(undefined);
            }}
            width={1000}
            destroyOnClose
            title={null}
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowCustomerDetailsDialog(false)}>
                        Close
                    </BookingButton>
                </div>
            }>
            <div>
                <CustomerDetails customerSelected={customerSelected!} />
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
                                Create new customer
                            </span>
                        </div>
                    </BookingButton>
                </span>
            </div>
        </div>
    )
}