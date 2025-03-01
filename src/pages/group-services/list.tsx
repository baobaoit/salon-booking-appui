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
import { GroupForm } from "./group";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { createGroup, deleteGroup, TGroup, TGroupParams, updateGroup } from "../../api/services";
import { IPagination } from "../customers/type";
import { ISearchGroup } from "./type";
import { setDataGroup } from "../../redux/slices/group";
import { ICMaterialSymbol } from "../../icons/material-symbol";

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

type GroupServicesListProps = {
    groupServiceList: TGroup[];
    keyword?: string;
    pagination?: IPagination;
    filterParams: ISearchGroup;
    onChangePaging: ({ page }: { page: number }) => void;
    onReload: () => void;
}
const KeywordContext = React.createContext<string>('');

export const GroupServicesPageList: React.FC<GroupServicesListProps> = ({
    groupServiceList = [],
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
    const [groupId, setGroupId] = React.useState<string | undefined>("");
    const [showGroupDialog, setShowGroupDialog] = React.useState(false);
    const [groupSelected, setGroupSelected] = React.useState<TGroup | undefined>(undefined);
    const [form] = useForm();

    const onShowDeleteModal = React.useCallback((id: string) => {
        setGroupId(id);
        setShowDeleteModal(true);
    }, [setShowDeleteModal]);

    const columns: ColumnsType<TGroup> = [
        {
            title: 'No',
            dataIndex: 'id',
            field: 'id',
            key: 'id',
            width: '40px',
            sorter: true,
            render: (val: string, record: TGroup, index: number) => {
                return <div className="flex flex-col gap-1">
                    {index + 1}
                </div>
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            field: 'name',
            key: 'name',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer key={title} title={title} />;
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: TGroup) => {
                return <ActionMenu key={_id}>
                    <IconButton icon={<ICMaterialSymbol icon="edit_square" />} btnType="tertiary" onClick={() => {
                        setGroupSelected(data);
                        setShowGroupDialog(true);
                    }} />
                    {/* <IconButton icon={<ICDelete />} onClick={() => onShowDeleteModal(_id)} btnType="tertiary" /> */}
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<TGroup>) => {
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

    const doSaveGroup = React.useCallback(async (id: string | undefined, group: TGroupParams) => {
        try {
            const response = id ? await updateGroup(id, group) : await createGroup(group);
            if (response) {
                const { data } = response;
                if (!groupId) {
                    const { data } = response;
                    if (!data) {
                        showError('Save group failed', 'Please check server response');
                        return;
                    }
                    const fullName = group.name;
                    setShowGroupDialog(false);
                    const newList = [data, ...groupServiceList];
                    dispatch(setDataGroup(newList));
                    showSuccess('Save group successfully', `${fullName} is registered successfully.`);
                } else {
                    showSuccess('Update group successfully', 'Group information has been updated');
                    setShowGroupDialog(false);
                    const newList = groupServiceList.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                ...data,
                            }
                        }
                        return item;
                    });
                    dispatch(setDataGroup(newList));
                }
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Please check your input data';
            showError('Save group failed', errorMessage);
        }
    }, [groupId, groupServiceList, showSuccess, showError, dispatch]);

    const onSave = React.useCallback(() => {
        form.validateFields().then((values) => {
            const newValues: TGroupParams = {
                name: values.name,
            };
            const id = groupSelected ? groupSelected['id'] : undefined;
            doSaveGroup(id, newValues);
        }).catch((error) => {
            showError('Save group failed', 'Please check your input data');
        });
    }, [form, groupServiceList, groupSelected, showError]);

    const onDelete = React.useCallback(async (id: string | undefined) => {
        if (!id) {
            return;
        }
        try {
            dispatch(setLoading(true));
            const result = await deleteGroup(id);
            if (result) {
                dispatch(setLoading(false));
                setShowDeleteModal(false);
                showSuccess('Delete group successfully', 'Group has been deleted');
                const newList = groupServiceList.filter((item) => item.id !== id);
                dispatch(setDataGroup(newList));
                
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Error occurred while deleting group';
            showError('Delete group failed', errorMessage);
            dispatch(setLoading(false));
        }
    }, [dispatch, groupServiceList, showError, showSuccess]);

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full px-[12px] py-[20px] shadow-e-03 items-center justify-between bg-white rounded-[12px]">
            <div className="flex gap-3 items-center justify-end">
            </div>
            <div>
                <BookingButton
                    btnType="primary"
                    onClick={() => {
                        setGroupSelected(undefined);
                        setShowGroupDialog(true);
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <ICAdd stroke="#fff" width={18} height={18} />
                        <span>
                            Create new group
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
                    dataSource={groupServiceList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="id"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} onCreateNew={() => {
                            setGroupSelected(undefined);
                            setShowGroupDialog(true);
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
                            onDelete(groupId);
                            setShowDeleteModal(false);
                        }}>
                        Delete
                    </BookingButton>
                </div>
            }>
            <p>
                Are you sure you want to delete this group?
            </p>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowGroupDialog(false)}
            open={showGroupDialog}
            maskClosable={false}
            destroyOnClose
            width={1000}
            afterClose={() => {
                form.resetFields();
            }}
            title={
                <div className="font-bold text-[18px]">
                    {groupSelected ? 'Edit Group' : 'New Group'}
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowGroupDialog(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onSave}>
                        Save
                    </BookingButton>
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                {showGroupDialog && <GroupForm groupData={groupSelected} form={form} />}
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
                                Create new group
                            </span>
                        </div>
                    </BookingButton>
                </span>
            </div>
        </div>
    )
}