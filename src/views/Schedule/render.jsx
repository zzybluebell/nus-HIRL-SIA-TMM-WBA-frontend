import React, { useEffect, useState } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function OPPrender(props) {
    const { feature, selected } = props
    let crew_id = selected;
    const [divHeight, setDivHeight] = useState(3)

    useEffect(() => {
        let number = 1
        switch (selected.length) {
            case 1:
                number = 4.5
                break;
            case 2:
                number = 7
                break;
            case 3:
                number = 8
                break;
            case 4:
                number = 9
                break;
            case 5:
                number = 10
                break;
            case 6:
                number = 11
                break;
            case 7:
                number = 12
                break;
            case 8:
                number = 13
                break;
            case 9:
                number = 14
                break;
            default:
                number = 15
                break;
        }

        setDivHeight(number)

    }, [selected])

    useEffect(() => {
        let root = am5.Root.new("chartdiv");


        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        root.dateFormatter.setAll({
            dateFormat: "yyyy-MM-dd HH:MM",
            dateFields: ["valueX", "openValueX"]
        });


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout
            })
        );

        chart.children.push(
            am5.Label.new(root, {
                text: 'am5charts',
                fontSize: '30px',
                fill: 'red',
                y: -50,
                x: am5.percent(50),
                centerX: am5.percent(50)
            })
        )
        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
        }))

        console.log('legend', legend);
        console.log('feature', feature);
        console.log('selected', selected);
        console.log('crew_id', crew_id);

        const PairingLevel = () => {
            // Handle Pairing Level
            for (let i = 0; i < crew_id.length; i++) {
                let list = feature[crew_id[i]]["PAIRING_FEATURES"];

                for (let j = 0; j < list.length; j++) {
                    let startdate = list[j]["PAIRING_START_DATE_TIME"];
                    let startdate_Y = parseInt(startdate.split(" ")[0].split("/")[0]);
                    let startdate_M = parseInt(startdate.split(" ")[0].split("/")[1]);
                    let startdate_D = parseInt(startdate.split(" ")[0].split("/")[2]);
                    let startdate_h = parseInt(startdate.split(" ")[1].split(":")[0]);
                    let startdate_d = parseInt(startdate.split(" ")[1].split(":")[1]);

                    let enddate = list[j]["PAIRING_END_DATE_TIME"];
                    let enddate_Y = parseInt(enddate.split(" ")[0].split("/")[0]);
                    let enddate_M = parseInt(enddate.split(" ")[0].split("/")[1]);
                    let enddate_D = parseInt(enddate.split(" ")[0].split("/")[2]);
                    let enddate_h = parseInt(enddate.split(" ")[1].split(":")[0]);
                    let enddate_d = parseInt(enddate.split(" ")[1].split(":")[1]);

                    let task = "PAIRING_ID: " + list[j]["PAIRING_ID"].toString() + "\n"
                        + "CREWROSTER_ID: " + list[j]["CREWROSTER_ID"].toString() + "\n"
                        + "PATTERN_LABEL: " + list[j]["PATTERN_LABEL"].toString() + "\n"
                        + "From: " + list[j]["DEPARTURE_AIRPORT_CODE"].toString() + " To: " + list[j]["ARRIVAL_AIRPORT_CODE"].toString() + "\n";


                    let dict = {
                        category: crew_id[i],
                        start: new Date(startdate_Y, startdate_M, startdate_D, startdate_h, startdate_d).getTime(),
                        end: new Date(enddate_Y, enddate_M, enddate_D, enddate_h, enddate_d).getTime(),
                        columnSettings: {
                            fill: "#002569"
                        },
                        task: task

                    };

                    data.push(dict)
                }
            }
        }
        const DutyLevel = () => {
            // Handle Duty Level
            for (let i = 0; i < crew_id.length; i++) {
                let list = feature[crew_id[i]]["DUTY_FEATURES"];

                for (let j = 0; j < list.length; j++) {
                    let startdate = list[j]["DUTY_START_DATE_TIME"];
                    let startdate_Y = parseInt(startdate.split(" ")[0].split("/")[0]);
                    let startdate_M = parseInt(startdate.split(" ")[0].split("/")[1]);
                    let startdate_D = parseInt(startdate.split(" ")[0].split("/")[2]);
                    let startdate_h = parseInt(startdate.split(" ")[1].split(":")[0]);
                    let startdate_d = parseInt(startdate.split(" ")[1].split(":")[1]);

                    let enddate = list[j]["DUTY_END_DATE_TIME"];
                    let enddate_Y = parseInt(enddate.split(" ")[0].split("/")[0]);
                    let enddate_M = parseInt(enddate.split(" ")[0].split("/")[1]);
                    let enddate_D = parseInt(enddate.split(" ")[0].split("/")[2]);
                    let enddate_h = parseInt(enddate.split(" ")[1].split(":")[0]);
                    let enddate_d = parseInt(enddate.split(" ")[1].split(":")[1]);

                    let task = "DUTY_ID: " + list[j]["DUTY_ID"].toString() + "\n"
                        + "From: " + list[j]["DEPARTURE_AIRPORT_CODE"].toString() + " To: " + list[j]["ARRIVAL_AIRPORT_CODE"].toString() + "\n";

                    let dict = {
                        category: crew_id[i],
                        start: new Date(startdate_Y, startdate_M, startdate_D, startdate_h, startdate_d).getTime(),
                        end: new Date(enddate_Y, enddate_M, enddate_D, enddate_h, enddate_d).getTime(),
                        columnSettings: {
                            fill: "#8A6C4C"

                        },
                        task: task

                    };
                    data.push(dict)
                }
            }
        }

        // Define data
        let data = [];
        PairingLevel()
        DutyLevel()


        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "category",
                renderer: am5xy.AxisRendererY.new(root, {}),
                tooltip: am5.Tooltip.new(root, {})
            })
        );

        let cate = [];

        for (let i = 0; i < selected.length; i++) {
            cate.push({
                category: selected[i]
            }
            )
        }
        console.log(" yAxis.", cate);
        yAxis.data.setAll(cate);

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                baseInterval: { timeUnit: "second", count: 1 },
                renderer: am5xy.AxisRendererX.new(root, {})
            })
        );

        console.log('000000', xAxis, yAxis);
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            openValueXField: "start",
            valueXField: "end",
            categoryYField: "category",
            sequencedInterpolation: true
        }));


        series.columns.template.setAll({
            templateField: "columnSettings",
            strokeOpacity: 0,
            tooltipText: "{task}\n[bold]{openValueX}[/] - [bold]{valueX}[/]"
        });

        console.log("data", data);
        series.data.setAll(data);


        // Add scrollbars
        chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
        chart.appear(1000, 100);



        return () => {
            if (root) {
                root.dispose();
            }
        }
    }, [selected, crew_id, feature])


    return (
        <div id="chartdiv" style={{ width: "100%", height: `${divHeight}rem` }}></div>
    );

}

export default OPPrender

