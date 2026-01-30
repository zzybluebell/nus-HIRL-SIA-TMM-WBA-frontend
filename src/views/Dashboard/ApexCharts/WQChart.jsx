import React from 'react'
import Chart from 'react-apexcharts'

export default function WQChart(props) {
    const { colors, partData } = props

    const options = {
        chart: {
            type: "bar",
            height: 60,
            sparkline: {
                enabled: !0
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                columnWidth: "60%"
            }
        },
        colors: [colors.primary],
        xaxis: {
            type: 'week',
            categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        },
    };
    const series = [
        {
            name: '',
            data: partData || [0, 0, 0, 0, 0, 0, 0]
        }
    ]
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
