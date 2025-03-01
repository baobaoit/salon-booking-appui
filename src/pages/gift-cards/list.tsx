import { Modal, Row, Table, Tag } from "antd"
import { ColumnType, ColumnsType } from "antd/lib/table";
import React from "react";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { BookingPagination } from "../../components/pagination";
import { ICAdd, ICSort, ICNoneData, ICGift, ICEye } from "../../icons";
import { SortOrder } from "antd/lib/table/interface";
import { useSortData } from ".";
import styled from 'styled-components';
import { useNotification } from "../../hooks/useNotification";
import { BookingButton, IconButton } from "../../components/button";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/appInfo";
import { IPagination, ISearchCustomers, UserEntity } from "../customers/type";
import { FilterStatus } from "./filterStatus";
import { EStatusGiftCard, StatusGiftCardMapping, StatusGiftCardMappingColor, TGiftCardEntity, TGiftCardRequest, TGiftCardSearch } from "./type";
import { SaveGiftCard } from "./save";
import { unlinkGiftCard, getGiftCode, insertGiftCard, redeemGiftCard, updateGiftCard } from "../../api/gift-card";
import { formatLocaleDateTimeString, formatNumber } from "../../utils";
import { BookingTooltip } from "../../components/tooltip";
import { ICMaterialSymbol } from "../../icons/material-symbol";

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
            field: order === 'descend' ? 'DATE_ISSUED' : name,
            order: order === 'descend' ? 'desc' : !order ? 'asc' : 'desc',
        });
    }}>
        <span className="text-body-bold text-high-em">{title as string}</span>
        <ICSort order={order} />
    </div>
}

type GiftCardsListProps = {
    status: EStatusGiftCard | undefined;
    setStatus: React.Dispatch<React.SetStateAction<EStatusGiftCard | undefined>>;
    onChangeFilter: (value: TGiftCardSearch) => void;
    giftCardList: TGiftCardEntity[];
    keyword?: string;
    pagination?: IPagination;
    filterParams: ISearchCustomers;
    onChangePaging: ({ page }: { page: number }) => void;
    onReload: (values?: TGiftCardSearch) => void;

    code: string;
    statuses: EStatusGiftCard[];
}
const KeywordContext = React.createContext<string>('');

export const GiftCardsList: React.FC<GiftCardsListProps> = ({
    status,
    setStatus,
    onChangeFilter,
    giftCardList,
    keyword,
    pagination,
    onChangePaging,
    filterParams,
    onReload,
    code,
    statuses,
}) => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const { showSuccess, showError } = useNotification();
    const onChangePage = (page: number) => {
        onChangePaging({ page })
    };
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [giftCardId, setGiftCardId] = React.useState<string | undefined>(undefined);
    const [showGiftCardDialog, setShowGiftCardDialog] = React.useState(false);
    const [giftCardSelected, setGiftCardSelected] = React.useState<TGiftCardEntity | undefined>(undefined);
    const [giftCode, setGiftCode] = React.useState<string | undefined>(undefined);
    const [customersSelected, setCustomersSelected] = React.useState<UserEntity[] | undefined>(undefined);

    const [openRedeemModal, setOpenRedeemModal] = React.useState(false);

    const onShowDeleteModal = React.useCallback((giftCard: TGiftCardEntity) => {
        setGiftCardId(giftCard.id);
        setGiftCardSelected(giftCard);
        setShowDeleteModal(true);
    }, []);

    const onAssignCustomer = React.useCallback((data: TGiftCardEntity) => {
        setGiftCardSelected(data);
        setShowGiftCardDialog(true);
    } , []);

    const onOpenRedeemGiftCard = React.useCallback((data: TGiftCardEntity) => {
        setGiftCardSelected(data);
        setOpenRedeemModal(true);
    }, []);

    const onRedeemGiftCard = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await redeemGiftCard(giftCardSelected?.id || '', giftCardSelected?.customerId || '');
            if (response) {
                showSuccess('Redeem gift card successfully');
                setOpenRedeemModal(false);
                onReload();
            }
            dispatch(setLoading(false));
        } catch (error: any) {
            const errorMessage = error?.response?.data?.detail || 'An error occurred';
            showError('Redeem failed', errorMessage);
            dispatch(setLoading(false));
        }
    } , [dispatch, giftCardSelected, showError, showSuccess]);

    const columns: ColumnsType<TGiftCardEntity> = [
        {
            title: 'Code',
            dataIndex: 'giftCode',
            field: 'giftCode',
            key: 'giftCode',
            sorter: false,
            width: '180px',
            render: (title: string, record: TGiftCardEntity, index: number) => {
                return <TitleRenderer title={title} />;
                // if (index === 0) {
                // }
                // const previousRecord = giftCardList[index - 1];
                // const nextRecord = record;
                // const isHide = previousRecord?.giftCode === nextRecord?.giftCode;
                // return <TitleRenderer title={isHide ? '' : title} />;
            },
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            field: 'customerName',
            key: 'customerName',
            sorter: false,
            render: (title: string) => {
                return <TitleRenderer title={title} />;
            },
        },
        {
            title: 'Date',
            dataIndex: 'dateIssued',
            field: 'DATE_ISSUED',
            key: 'dateIssued',
            sorter: true,
            width: '180px',
            render: (value: string) => {
                return <span>
                    {formatLocaleDateTimeString(value)}
                </span>
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            field: 'status',
            key: 'status',
            sorter: false,
            width: '120px',
            render: (status: EStatusGiftCard) => {
                return <span>
                    <Tag style={{
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: '16px',
                        padding: '4px 8px',
                        color: '#FFFFFF',
                        backgroundColor: StatusGiftCardMappingColor[status],
                        borderColor: StatusGiftCardMappingColor[status]
                    }}>
                        {StatusGiftCardMapping[status]}
                    </Tag>
                </span>
            },
        },
        {
            title: 'Initial Value',
            dataIndex: 'initialValue',
            field: 'initialValue',
            key: 'initialValue',
            sorter: false,
            width: '180px',
            render: (value: number) => {
                return <span>
                    {formatNumber(value)}
                </span>
            },
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            field: 'createdBy',
            key: 'createdBy',
            width: '200px',
            sorter: false,
            render: (title: string) => {
                return <TitleRenderer title={title} />;
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            width: '40px',
            render: (_id: string, data: TGiftCardEntity) => {
                const hasReadyRedeem = data.status === EStatusGiftCard.FULL;
                const allowDelete = data.status === EStatusGiftCard.FULL || data.status === EStatusGiftCard.PARTIAL;
                const hasEditGiftCard = data.status === EStatusGiftCard.FULL || data.status === EStatusGiftCard.PARTIAL;
                const hasViewGiftCard = data.status === EStatusGiftCard.REDEEMABLE || data.status === EStatusGiftCard.EXPIRED || data.status === EStatusGiftCard.DEACTIVATED;
                const hasCustomer = data.customerId;
                return <ActionMenu>
                    {hasReadyRedeem && <div 
                        className="flex w-[25px] h-[25px]"
                        onClick={() => {
                            onOpenRedeemGiftCard(data);
                        }}
                    >
                        <BookingTooltip content="Redeem Gift Card"
                            placement="top"
                            childNode={
                                <IconButton icon={<ICGift width={26} height={26} />} btnType="tertiary" />
                            }>
                        </BookingTooltip>
                    </div>}
                    {hasEditGiftCard && <BookingTooltip content="Edit Gift Customer"
                        childNode={
                            <IconButton icon={<ICMaterialSymbol icon="edit_square" />} btnType="tertiary" onClick={() => {
                                onAssignCustomer(data);
                            }} />
                        }>
                    </BookingTooltip>}
                    {hasViewGiftCard && <BookingTooltip content="View Gift Customer"
                        childNode={
                            <IconButton icon={<ICEye />} btnType="tertiary" onClick={() => {
                                onAssignCustomer(data);
                            }} />
                        }>
                    </BookingTooltip>}
                    {allowDelete && hasCustomer && <BookingTooltip content="Delete Gift Customer"
                        childNode={
                            <IconButton icon={<ICMaterialSymbol icon="delete" />} onClick={() => onShowDeleteModal(data)} btnType="tertiary" />
                        }>
                    </BookingTooltip>}
                </ActionMenu>
            }
        }
    ].map((col: ColumnType<TGiftCardEntity>) => {
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

    const onSaveGiftCard = async () => {
        try {
            const values = await form.validateFields();
            if (values.expirationDate) {
                values.expirationDate = new Date(values.expirationDate.format('YYYY-MM-DD HH:mm')).getTime();
            }
            const payload: TGiftCardRequest = {
                giftCode: values.giftCode,
                initialValue: values.initialValue,
                expirationDate: values.expirationDate,
                notes: values.notes,
                customers: customersSelected?.map((customer) => customer.id) || [],
            }
            dispatch(setLoading(true));
            const response = !giftCardSelected ? await insertGiftCard(payload) : await updateGiftCard(giftCardSelected?.id || '', payload);
            if (response?.status === 200) {
                showSuccess(!giftCardSelected ? 'Create gift card successfully' : 'Update gift card successfully');
                setShowGiftCardDialog(false);
                if (response?.data?.status) {
                    setStatus(response?.data?.status);
                    // TGiftCardSearch
                    const newParams: TGiftCardSearch = {
                        code: code || '',
                        statuses: status ? [status] : [],
                    };
                    onReload(newParams);
                } else {
                    const newParams: TGiftCardSearch = {
                        code: code || '',
                        statuses: statuses ? statuses : [],
                    };
                    onReload(newParams);
                }
            }
        } catch (error) {
            showError('Gift Card', !giftCardSelected ? 'Create gift card failed' : 'Update gift card failed');
        }
        dispatch(setLoading(false));
    }

    const generateGiftCode = React.useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await getGiftCode();
            if (response?.data?.code) {
                setGiftCode(response.data?.code);
            }
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const openGiftCardCreateDialog = React.useCallback(async () => {
        await generateGiftCode();
        setGiftCardSelected(undefined);
        form.resetFields();
        setShowGiftCardDialog(true);
    } , [form, generateGiftCode]);

    const onDeactiveGiftCard = async () => {
        if (!giftCardId) return;
        try {
            dispatch(setLoading(true));
            const response = await unlinkGiftCard(giftCardId, giftCardSelected?.customerId || '');
            setShowDeleteModal(false);
            if (response?.data) {
                showSuccess('Deactivate gift card successfully');
                onReload();
            } else {
                showError('Gift card', 'Deactivate gift card failed');
            }
            dispatch(setLoading(false));
        } catch (error) {
            dispatch(setLoading(false));
        }
    }

    const disableEditGiftCard = React.useMemo(() => {
        return giftCardSelected?.status === EStatusGiftCard.REDEEMABLE ||
        giftCardSelected?.status === EStatusGiftCard.DEACTIVATED ||
            giftCardSelected?.status === EStatusGiftCard.EXPIRED;
    } , [giftCardSelected]);

    return <WrapperTable className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
        <div className="flex w-full px-[12px] py-[20px] shadow-e-03 items-center justify-between bg-white rounded-[12px]">
            <div className="flex gap-3 items-center justify-end">
            </div>
            <div>
                <BookingButton
                    btnType="primary"
                    onClick={() => {
                        openGiftCardCreateDialog();
                    }}
                    btnSize="md">
                    <div className="flex space-x-2 items-center">
                        <ICAdd stroke="#fff" width={18} height={18} />
                        <span>
                            Create gift card
                        </span>
                    </div>
                </BookingButton>
            </div>
        </div>
        <div className="flex flex-col w-full h-full bg-white rounded-[12px] overflow-hidden shadow-e-03">
            <FilterStatus
                status={status} 
                setStatus={setStatus} 
                code={filterParams?.code || ''}
                onChangeFilter={onChangeFilter} />
            <KeywordContext.Provider value={keyword ?? ''}>
                <Table
                    key="uuid"
                    className={classNames("white-header w-full")}
                    columns={columns}
                    dataSource={giftCardList}
                    rowClassName="cursor-pointer data-row"
                    rowKey="uuid"
                    locale={{
                        emptyText: <EmptyTable keyword={keyword} onCreateNew={() => {
                            openGiftCardCreateDialog();
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
                            onDeactiveGiftCard();
                        }}>
                        Delete
                    </BookingButton>
                </div>
            }>
            <p>
                Are you sure you want to delete this gift card?
            </p>
        </Modal>

        <Modal
            centered
            onCancel={() => setShowGiftCardDialog(false)}
            open={showGiftCardDialog}
            destroyOnClose
            maskClosable={false}
            getContainer={false}
            width={1000}
            title={
                <div className="font-bold text-[18px]">
                    {giftCardSelected ? 'Edit Gift Card' : 'Create Gift Card'}
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setShowGiftCardDialog(false)}>
                        Cancel
                    </BookingButton>
                    {!disableEditGiftCard && <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onSaveGiftCard}>
                        Save
                    </BookingButton>}
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                {showGiftCardDialog && <SaveGiftCard 
                    giftCode={giftCode}
                    giftCardSelected={giftCardSelected}
                    customersSelected={customersSelected}
                    setCustomersSelected={setCustomersSelected}
                    disableEditGiftCard={disableEditGiftCard}
                    form={form} />}
            </div>
        </Modal>
        <Modal
            centered
            onCancel={() => setOpenRedeemModal(false)}
            open={openRedeemModal}
            maskClosable={false}
            getContainer={false}
            destroyOnClose
            closeIcon={false}
            title={
                <div className="font-bold text-[18px]">
                    Redeem Gift Card
                </div>
            }
            footer={
                <div className="grid grid-cols-[auto_auto] justify-end gap-[16px]">
                    <BookingButton
                        btnType="sub"
                        btnSize="sm"
                        onClick={() => setOpenRedeemModal(false)}>
                        Cancel
                    </BookingButton>
                    <BookingButton
                        btnType="primary"
                        btnSize="sm"
                        onClick={onRedeemGiftCard}>
                        Redeem
                    </BookingButton>
                </div>
            }>
            <div className="flex flex-col gap-[20px] w-full overflow-hidden h-full items-start box-border">
                <div className="flex flex-col gap-2 items-center justify-center w-full">
                    <h3 className="text-[28px] font-bold">
                        {giftCardSelected?.customerName}
                    </h3>
                    <h3 className="text-[20px]">
                        Your gift card
                    </h3>
                    <div className="flex flex-col">
                        <div className="flex gap-3">
                            <span>Code:</span>
                            <span className="font-bold">{giftCardSelected?.giftCode}</span>
                        </div>
                        <div className="flex gap-3">
                            <span>Value:</span>
                            <span className="font-bold">{giftCardSelected?.initialValue} USD</span>
                        </div>
                    </div>
                    <div>
                        <img src="/images/icon-gift.png" alt="404" className="w-full h-full" />
                    </div>
                </div>
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
                                Create new gift card
                            </span>
                        </div>
                    </BookingButton>
                </span>
            </div>
        </div>
    )
}