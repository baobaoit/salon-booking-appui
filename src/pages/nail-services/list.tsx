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
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { TNailServices, createNailService, TNailServiceParams, updateNailService, deleteNailService, getNailService, TGroup } from "../../api/services";
import { IPagination } from "../customers/type";
import { ISearchGroup } from "./type";
import { setDataGroup } from "../../redux/slices/group";
import { NailServicesForm } from "./nailServices";
import { PRICE_TYPE } from "../../utils/constants";
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

type NailServicesListProps = {
    nailServiceList: TNailServices[];
    keyword?: string;
    pagination?: IPagination;
    filterParams: ISearchGroup;
    onChangePaging: ({ page }: { page: number }) => void;
    onReload: () => void;
}
const KeywordContext = React.createContext<string>('');

export const NailServicesPageList: React.FC<NailServicesListProps> = ({
    nailServiceList = [],
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
    const [nailServiceId, setNailServiceId] = React.useState<string | undefined>("");
    const [showSeviceDialog, setShowSeviceDialog] = React.useState(false);
    const [nailServiceSelected, setNailServicelected] = React.useState<TNailServices | undefined>(undefined);
    const [form] = useForm();
    const [groupServiceData, setGroupServiceData] = React.useState<TGroup | undefined>(undefined);
    const [groupId, setGroupId] = React.useState<string | undefined>(undefined);
    const [priceType, setPriceType] = React.useState<PRICE_TYPE | undefined>(PRICE_TYPE.START_PRICE_ONLY);

    const onEditServices = React.useCallback(async(val: TNailServices) => {
        try {
            dispatch(setLoading(true));
            const { data } = await getNailService(val.id);
            if (!data) {
                showError('Get services failed', 'Please check server response');
                return;
            }
            if (data.group) {
                setGroupServiceData(data.group);
            }
            dispatch(setLoading(false));
            setNailServicelected(data);
            setShowSeviceDialog(true);
        } catch (error) {
            dispatch(setLoading(false));
        }
    }, [dispatch, showError]);

    const onShowDeleteModal = React.useCallback((id: string) => {
        setNailServiceId(id);
        setShowDeleteModal(true);
    }, [setShowDeleteModal]);

    const columns: ColumnsType<TNailServices> = [
        {
            title: 'No',
            dataIndex: 'id',
            field: 'id',
            key: 'id',
            width: '40px',
            sorter: true,
            render: (val: string, record: TNailServices, index: number) => {
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
            title: 'Group',
            dataIndex: 'group',
            field: 'group',
            key: 'group',
            sorter: true,
            render: (title: string) => {
                return <TitleRenderer key={title} title={title} />;
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            field: 'price',
            align: 'right' as const,
            key: 'price',
            sorter: false,
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            field: 'createdDate',
            key: 'createdDate',
            sorter: true,
            width: '180px',
            render: (title: string) => {
                return <TitleRenderer key={title} title={title} />;
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: TNailServices) => {
                return <ActionMenu key={_id}>
                    <IconButton icon={<ICMaterialSymbol icon="edit_square" />} btnType="tertiary" onClick={() => {
                        onEditServices(data);
                    }} />
                    <IconButton icon={<ICMaterialSymbol icon="delete" />} onClick={() => onShowDeleteModal(_id)} btnType="tertiary" />
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<TNailServices>) => {
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

    const doSaveServices = React.useCallback(async (id: string | undefined, payload: TNailServiceParams) => {
        try {
            dispatch(setLoading(true));
            const response = id ? await updateNailService(id, payload) : await createNailService(payload);
            dispatch(setLoading(false));
            if (response) {
                const { data } = response;
                if (!nailServiceId) {
                    const { data } = response;
                    if (!data) {
                        showError('Save services failed', 'Please check server response');
                        return;
                    }
                    const fullName = payload.name;
                    setShowSeviceDialog(false);
                    const newList = [data, ...nailServiceList];
                    dispatch(setDataGroup(newList));
                    showSuccess('Save services successfully', `${fullName} is registered successfully.`);
                    onReload();
                } else {
                    showSuccess('Update services successfully', 'Services information has been updated');
                    setShowSeviceDialog(false);
                    const newList = nailServiceList.map((item) => {
                        if (item.id === id) {
                            return {
                                ...item,
                                ...data,
                            }
                        }
                        return item;
                    });
                    dispatch(setDataGroup(newList));
                    onReload();
                }
            }
        } catch (error: any) {
            dispatch(setLoading(false));
            const errorMessage = error?.response?.data?.detail || 'Please check your input data';
            showError('Save services failed', errorMessage);
        }
    }, [nailServiceId, nailServiceList, showSuccess, showError, dispatch]);

    const onSave = React.useCallback(() => {
        form.validateFields().then((values) => {
            const newValues: TNailServiceParams = {
                name: values.name,
                groupId: groupId || '',
                startPrice: values.startPrice,
                endPrice: values.endPrice,
                priceType: values.priceType,
            };
            const id = nailServiceSelected ? nailServiceSelected['id'] : undefined;
            doSaveServices(id, newValues);
        }).catch((error) => {
            showError('Save services failed', 'Please check your input data');
        });
    }, [form, groupId, nailServiceList, nailServiceSelected, showError]);

    const onDelete = React.useCallback(async (id: string | undefined) => {
        if (!id) {
            return;
        }
        try {
            dispatch(setLoading(true));
            const result = await deleteNailService(id);
            if (result) {
                dispatch(setLoading(false));
                setShowDeleteModal(false);
                showSuccess('Delete service successfully', 'Service has been deleted');
                const newList = nailServiceList.filter((item) => item.id !== id);
                dispatch(setDataGroup(newList));
                onReload();
                
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'Error occurred while deleting group';
            showError('Delete services failed', errorMessage);
            dispatch(setLoading(false));
        }
    }, [dispatch, nailServiceList, showError, showSuccess]);

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full px-[12px] py-[20px] shadow-e-03 items-center justify-between bg-white rounded-[12px]">
            <div className="flex gap-3 items-center justify-end">
            </div>
            <div>
                <BookingButton
                    btnType="primary"
                    onClick={() => {
                        form.setFieldsValue({
                            name: '',
                            startPrice: 0,
                            endPrice: 0,
                            priceType: PRICE_TYPE.START_PRICE_ONLY,
                        });
                        setNailServicelected(undefined);
                        setShowSeviceDialog(true);
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <ICAdd stroke="#fff" width={18} height={18} />
                        <span>
                            Create new service
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
                    dataSource={nailServiceList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="id"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} onCreateNew={() => {
                            setNailServicelected(undefined);
                            setShowSeviceDialog(true);
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
                            onDelete(nailServiceId);
                            setShowDeleteModal(false);
                        }}>
                        Delete
                    </BookingButton>
                </div>
            }>
            <p>
                Are you sure you want to delete this nail service?
            </p>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowSeviceDialog(false)}
            open={showSeviceDialog}
            maskClosable={false}
            width={1000}
            destroyOnClose
            title={
                <div className="font-bold text-[18px]">
                    {nailServiceSelected ? 'Edit Service' : 'New Service'}
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowSeviceDialog(false)}>
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
                {showSeviceDialog && <NailServicesForm 
                    nailServiceData={nailServiceSelected} 
                    groupServiceData={groupServiceData}
                    groupId={groupId}
                    setGroupId={setGroupId}
                    priceType={priceType}
                    setPriceType={setPriceType}
                    form={form} />}
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
                                Create new service
                            </span>
                        </div>
                    </BookingButton>
                </span>
            </div>
        </div>
    )
}