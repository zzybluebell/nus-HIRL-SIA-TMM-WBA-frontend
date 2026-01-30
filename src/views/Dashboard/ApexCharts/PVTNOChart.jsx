import React from 'react'
import Chart from 'react-apexcharts'

export default function PVTNOChart(props) {
    const { colors, fontFamily, partData } = props

    const dataList = partData?.date_list.map((item) => {
        return item.substring(0, 10)
    })

    const options = {
        chart: {
            type: "line",
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
            theme: 'light'
        },
        colors: [colors.primary, colors.info, colors.warning],
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
        xaxis: {
            type: "month",
            categories: dataList,
            lines: {
                show: true
            },
            axisBorder: {
                color: colors.gridBorder,
            },
            axisTicks: {
                color: colors.gridBorder,
            },
        },
        markers: {
            size: 0,
        },
        legend: {
            show: false,
            position: "top",
            horizontalAlign: 'center',
            fontFamily: fontFamily,
            itemMargin: {
                horizontal: 8,
                vertical: 0
            },
        },
        stroke: {
            width: 3,
            curve: "smooth",
            lineCap: "round"
        },
    };
    const series = [
        {
            name: "",
            // data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 30]
            data: partData?.pvt_list || [0, 0]
        }
    ]

    return (
        <Chart
            options={options}
            series={series}
            type="line"
            width={'100%'}
            height={'100%'}
        />
    )
}
