import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../layout/main";
import { LayoutType } from '../utils/enums';
import { BookingButton } from "../components/button";
import { Modal, notification as Notification } from "antd";
import { ICCheckFill, ICClose, ICComingSoon, ICComingSoonBottom, ICComingSoonTop, ICWarning } from "../icons";
import { ICBack } from "../icons/back";
import { NavigationProvider } from "../hooks/useNavigate";
import { ScrollTop } from "../hooks/useScrollTop";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useMe } from "../hooks/useMe";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type TGeneralPageDataProps = {
    showComingSoonModal: boolean,
    setShowComingSoonModal: React.Dispatch<React.SetStateAction<boolean>>;
    apiNotification: any;
    openNotification: (type: NotificationType, title: React.ReactNode, description?: React.ReactNode) => void;
}

export const GeneralPageDataContext = React.createContext<TGeneralPageDataProps>({} as TGeneralPageDataProps);
export const useGeneralPageData = () => React.useContext(GeneralPageDataContext);

type GeneralPageProps = {
    page: React.ReactElement
    isPrivate?: boolean,
    layout?: LayoutType,
}
export const GeneralPage: React.FC<GeneralPageProps> = ({
    page,
    isPrivate = false,
    layout = LayoutType.MAIN,
}) => {
    const [api, contextHolder] = Notification.useNotification();
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [showComingSoonModal, setShowComingSoonModal] = React.useState(false);
    const { getMe } = useMe();

    const [pageContent, setPageContent] = React.useState<React.ReactElement>(<></>);
    React.useEffect(() => {
        if ((isPrivate || typeof isPrivate === "undefined") && !userInfo.token) {
            navigate("/login");
        } else {
            if (layout === LayoutType.MAIN) {
                return setPageContent(<MainLayout>{page}</MainLayout>)
            } else {
                setPageContent(page)
            }
        }
    }, [page, isPrivate, navigate, layout, userInfo]);

    React.useEffect(() => {
        if (isPrivate) {
            getMe();
        }
    }, []);

    const openNotification = (type: NotificationType, title: React.ReactNode, description?: React.ReactNode) => {
        // Notification.destroy();       
        if (type === 'success') {
            api[type]({
                icon: <ICCheckFill />,
                message: <span className="text-high-em text-body-bold">{title}</span>,
                description,
                placement: "bottom",
                className: "middle-notification",
                closeIcon: <ICClose height={18} width={18} fill={'#4F4B5C'} />
            });
        }
        if (type === 'info') {
            api[type]({
                icon: <ICCheckFill />,
                message: <span className="text-high-em text-body-bold">{title}</span>,
                description,
                placement: "bottom",
                className: "middle-notification",
                closeIcon: <ICClose height={18} width={18} fill={'#4F4B5C'} />
            });
        }
        if (type === 'warning') {
            api[type]({
                icon: <ICCheckFill />,
                message: <span className="text-high-em text-body-bold">{title}</span>,
                description,
                placement: "bottom",
                className: "middle-notification",
                closeIcon: <ICClose height={18} width={18} fill={'#4F4B5C'} />
            });
        }
        if (type === 'error') {
            api[type]({
                icon: <ICWarning fill="#F03D3D" />,
                message: <span className="text-body-bold text-high-em">{title}</span>,
                description,
                placement: "bottom",
                className: "middle-notification",
                closeIcon: <ICClose height={18} width={18} fill={'#4F4B5C'} />
            });
        }
    };

    return <NavigationProvider>
        <GeneralPageDataContext.Provider
            value={{
                showComingSoonModal,
                setShowComingSoonModal,
                apiNotification: api,
                openNotification,
            }}
        >
            {contextHolder}
            {pageContent}
            <ScrollTop />
            <Modal
                centered
                onCancel={() => setShowComingSoonModal(false)}
                open={showComingSoonModal}
                closeIcon={null}
                zIndex={1001}
                width={1000}
                title={null}
                styles={
                    {
                        body: {
                            padding: "56px",
                        },
                    }
                }
                style={{
                    boxShadow: '0px 4px 16px rgba(98, 112, 140, 0.24)',
                    borderRadius: '12px'
                }}
                footer={null}>
                <div className="flex flex-row items-center min-h-[414.89px] gap-[56px]">
                    <span className="absolute top-0 left-0">
                        <ICComingSoonTop />
                    </span>
                    <span className="absolute bottom-0 right-0">
                        <ICComingSoonBottom />
                    </span>
                    <div>
                        <ICComingSoon />
                    </div>
                    <div className="flex flex-col gap-[40px]">
                        <div className="flex flex-col gap-[16px]">
                            <h4 className="text-[32px] font-bold leading-[40px] text-left text-high-em mb-0">
                                Coming soon
                            </h4>
                            <p className="text-[#676472] text-[16px] font-normal leading-[24px] mb-0">
                                We are working hard to bring this feature to you soon. Please come back later.
                            </p>
                        </div>
                        <BookingButton btnSize="lg"
                            btnType="info"
                            onClick={() => setShowComingSoonModal(false)}>
                            <div className="flex justify-center items-center gap-[8px]">
                                <ICBack fill="white" />
                                <span>Come back</span>
                            </div>
                        </BookingButton>
                    </div>
                </div>
            </Modal>
        </GeneralPageDataContext.Provider>
    </NavigationProvider>
}
