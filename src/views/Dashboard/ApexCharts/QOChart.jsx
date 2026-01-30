import React from 'react'
import Chart from 'react-apexcharts'

export default function QOChart(props) {
    const { colors, fontFamily, partData } = props

    const options = {
        chart: {
            height: 340,
            type: "donut",
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
        },
        stroke: {
            colors: ['rgba(0,0,0,0)']
        },
        colors: [colors.muted, colors.primary, colors.warning, colors.info],
        legend: {
            show: true,
            position: "bottom",
            horizontalAlign: 'center',
            fontFamily: fontFamily,
            itemMargin: {
                horizontal: 8,
                vertical: 0
            },
        },
        dataLabels: {
            enabled: false
        },
        labels: ["PVT", "Fatigue/Sleepiness", "Workload", "Wellbeing"],
    };
    const series = partData || [0, 0, 0, 0]

    return (
        <Chart
            options={options}
            series={series}
            type="donut"
            width={'100%'}
            height={'100%'}
        />
    )
}
