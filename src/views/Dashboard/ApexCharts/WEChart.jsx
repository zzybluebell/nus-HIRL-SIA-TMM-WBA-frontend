import React from 'react'
import Chart from 'react-apexcharts'

export default function WEChart(props) {
    const { colors, fontFamily, partData } = props

    const options = {
        chart: {
            type: 'bar',
            height: '320',
            parentHeightOffset: 0,
            foreColor: colors.bodyColor,
            background: colors.cardBg,
            toolbar: {
                show: false
            },
        },
        theme: {
            mode: 'light'
        },
        tooltip: {
            theme: 'light',
            y: [{
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + "%";
                    }
                    return y;
                }
            }],

        },
        colors: [colors.primary],
        grid: {
            padding: {
                bottom: -4
            },
            borderColor: colors.gridBorder,
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: ['0 – 7', '8 – 14', '15 – 21', '>= 20'],
            axisBorder: {
                color: colors.gridBorder,
            },
            axisTicks: {
                color: colors.gridBorder,
            },
        },
        yaxis: {
            max: 100 // 设置Y轴的上限为10
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: 'center',
            fontFamily: fontFamily,
            itemMargin: {
                horizontal: 8,
                vertical: 0
            },
        },
        stroke: {
            width: 0
        },
        plotOptions: {
            bar: {
                borderRadius: 4
            }
        }
    };
    const series = [{
        name: '',
        data: partData?.percentage_daily_summary || [0, 0, 0, 0],
    }]

    return (
        <Chart
            options={options}
            series={series}
            type="bar"
            width={'100%'}
            height={'100%'}
        />
    )
}
