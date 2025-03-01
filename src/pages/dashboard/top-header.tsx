import { Card, Col, Row } from "antd";
import React from "react"
import { ICShopping, ICShoppingCart } from "../../icons";
import { EOrderStatus } from "../../api/user/type";
import { useNavigation } from "../../hooks/useNavigate";

type TopHeaderProps = {
    totalServices: number | undefined;
    inServices: number | undefined;
    waitingServices: number | undefined;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ totalServices, inServices, waitingServices }) => {
    const { navigate } = useNavigation();
    const onNavigateToReport = (val: EOrderStatus | undefined) => {
        const fromDate = new Date().toISOString().split('T')[0];
        const toDate = new Date().toISOString().split('T')[0];
        const searchParams = new URLSearchParams();
        searchParams.set('fromDate', fromDate);
        searchParams.set('toDate', toDate);
        if (val) {
            searchParams.set('status', val);
        }
        navigate(`/report?${searchParams.toString()}`, { replace: true });
    }

    return (
        <div className="flex w-full">
            <Row className="w-full" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={8}>
                    <Card bordered={true} 
                        className="shadow-big-shadow"
                        style={{ cursor: 'pointer' }} 
                        onClick={() => onNavigateToReport(EOrderStatus.WAITING_SERVICE)}>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="flex items-center justify-center h-[70px] w-[70px] bg-[#F7B84B] rounded-[50%] text-center">
                                <ICShopping />
                            </div>
                            <div className="flex items-center">
                                <div className="text-right">
                                    <h3 className="text-[1.5rem] text-[#323A46] font-bold">{waitingServices}</h3>
                                    <p className="mb-0 text-[#98a6ad] text-[16px] max-sm:text-[8px] max-md:text-[10px]">
                                        Today's Waiting for Service
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Card bordered={true} className="shadow-big-shadow" style={{ cursor: 'pointer' }} onClick={() => onNavigateToReport(EOrderStatus.IN_SERVICE)}>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="flex items-center justify-center h-[70px] w-[70px] bg-[#1ABC9C] rounded-[50%] text-center">
                                <ICShoppingCart />
                            </div>
                            <div className="flex items-center">
                                <div className="text-right">
                                    <h3 className="text-[1.5rem] text-[#323A46] font-bold">{inServices}</h3>
                                    <p className="mb-0 text-[#98a6ad] text-[16px] max-sm:text-[8px] max-md:text-[11px] max-lg:text-[11px]">
                                        Today's In-service
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={8}>
                    <Card bordered={true} className="shadow-big-shadow" style={{ cursor: 'pointer' }} onClick={() => onNavigateToReport(undefined)}>
                        <div className="flex gap-2 w-full justify-between">
                            <div className="flex items-center justify-center h-[70px] w-[70px] bg-[#43BFE5] rounded-[50%] text-center">
                                <ICShoppingCart />
                            </div>
                            <div className="flex items-center">
                                <div className="text-right">
                                    <h3 className="text-[1.5rem] text-[#323A46] font-bold">{totalServices}</h3>
                                    <p className="mb-0 text-[#98a6ad] text-[16px] max-sm:text-[8px] max-md:text-[10px]">
                                        Today's Total services
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}
