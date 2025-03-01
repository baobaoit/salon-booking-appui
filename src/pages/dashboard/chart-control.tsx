import { Card, Col, Row, Segmented } from "antd";
import React from "react"
import { PeriodMap, PeriodMapValue, TPeriod, TSaleAnalytics, TTotalRevenue } from "../../api/user/type";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type ChartControlProps = {
    period: TPeriod;
    saleAnalytics: TSaleAnalytics[];
    totalRevenue: TTotalRevenue | undefined;
    onChangePeriod: (value: TPeriod) => void;
}
export const ChartControl: React.FC<ChartControlProps> = ({ period, totalRevenue, saleAnalytics, onChangePeriod }) => {
    const renderPieChartOptions = React.useMemo(() => {
        const revenue = (totalRevenue?.revenue || 0) * 100;
        const total = 100 - revenue;

        return {
            chart: {
                type: 'pie',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                showAlways: true,
                                fontSize: '18px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 600,
                                color: '#373d3f',
                                label: 'Revenue',
                                formatter: function (w) {
                                    return `${(totalRevenue?.revenue || 0)*100}%`;
                                },
                            }
                        }
                    },
                },
            },
            series: [revenue, total],
            labels: ['Revenue', 'Total'],
            colors: ['#2ECC71', '#E74C3C'],
            legend: {
                show: false,
            },
        } as ApexOptions;
    }, [totalRevenue]);

    const renderBarChartOptions = React.useMemo(() => {
        const seriesRevenue = saleAnalytics.map((item) => {
            return item.revenue;
        });
        const revenueColumn = {
            name: 'Revenue',
            type: 'column',
            data: seriesRevenue
        };
        const seriesTotalServices = saleAnalytics.map((item) => {
            return item.totalServices;
        });
        const totalServicesLine = {
            name: 'Total Services',
            type: 'line',
            data: seriesTotalServices
        };
        const labels = saleAnalytics.map((item) => {
            return item.dateTime.split('T')[0];
        });
        return {
            chart: {
                type: 'line',
            },
            series: [revenueColumn, totalServicesLine],
            stroke: {
                width: [0, 4]
            },
            title: {
                text: 'Sales Analytics'
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },
            labels: labels,
            xaxis: {
                type: 'datetime'
            },
        } as ApexOptions;
    }, [saleAnalytics]);

    return (
        <div className="flex w-full">
            <Row className="w-full" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                    <Card bordered={true} style={{ cursor: 'pointer' }}>
                        <div className="flex flex-col gap-[20px] w-full">
                            <div className="flex w-full items-center">
                                <ReactApexChart
                                    options={renderPieChartOptions}
                                    series={renderPieChartOptions.series}
                                    type="donut"
                                    width="100%"
                                    className="w-full"
                                    height={255}
                                />
                            </div>
                            <div className="text-center">
                                <p className="mb-0 text-[#98a6ad] text-[16px] max-sm:text-[8px] max-md:text-[10px]">
                                    Total sales made today
                                </p>
                                <h3 className="text-[1.5rem] text-[#323A46] font-bold">
                                    {totalRevenue?.totalToday}
                                </h3>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Card bordered={true}>
                        <div className="flex flex-col gap-[20px] w-full">
                            <div className="flex w-full items-center justify-end">
                                <Segmented
                                    options={['Today', 'Weekly', 'Monthly']}
                                    value={PeriodMap[period]}
                                    onChange={(value: string) => {
                                        const newPeriod = PeriodMapValue[value as keyof typeof PeriodMapValue] as TPeriod;
                                        onChangePeriod(newPeriod);
                                    }}
                                />
                            </div>
                            <ReactApexChart
                                options={renderBarChartOptions}
                                series={renderBarChartOptions.series}
                                type="line"
                                width="100%"
                                className="w-full"
                                height={250}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
