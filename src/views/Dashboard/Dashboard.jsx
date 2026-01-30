import React, { useEffect, useState } from "react";
import './Dashboard.scss'
import { Button, Row, Col } from "antd";
import PVTChart from './ApexCharts/PVTChart';
import FSQChart from './ApexCharts/FSQChart';
import WQChart from './ApexCharts/WQChart';
import MQChart from './ApexCharts/MQChart';
import PVTNOChart from './ApexCharts/PVTNOChart';
import QOChart from './ApexCharts/QOChart';
import WSChart from './ApexCharts/WSChart';
import WGChart from './ApexCharts/WGChart';
import WEChart from './ApexCharts/WEChart';
import { DownloadOutlined } from '@ant-design/icons';
import { weekSummary, pvtWeekSummary, userRecruitment, percentatageOfDaysWearing } from 'src/api/index'
import Footer from "../Layout/Footer/Footer";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'

const fontFamily = "'Roboto', Helvetica, sans-serif"

const colors = {
    primary: "#002569",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#8A6C4C",
    warning: "#FF9F00",
    danger: "#FF0000",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff",
}

const Dashboard = (props) => {
    // const [dataList, setDataList] = useState(null)
    const [pvtSum, setPvtSum] = useState(0);
    const [pvtSumList, setPvtSumList] = useState([]);
    const [questionnaireSum, setQuestionnaireSum] = useState(0);
    const [questionnaireSumList, setQuestionnaireSumList] = useState([]);
    const [workloadSum, setWorkloadSum] = useState(0);
    const [workloadSumList, setWorkloadSumList] = useState([]);
    const [wellbeingSum, setWellbeingSum] = useState(0);
    const [wellbeingSumList, setWellbeingSumList] = useState([]);
    const [pvtWeekSummaryValue, setPvtWeekSummaryValue] = useState(null)
    const [userRecruitmentValue, setUserRecruitmentValue] = useState(null)
    const [percentatageOfDaysWearingValue, setPercentatageOfDaysWearingValue] = useState(null)

    useEffect(() => {
        /* Sending request */
        const fetchData = async () => {
            try {
                const resPonse = await weekSummary();
                const resPvtWeekSummary = await pvtWeekSummary()
                const resPercentatageOfDaysWearing = await percentatageOfDaysWearing()
                setPvtSum(resPonse.pvt_sum || 0);
                setPvtSumList(resPonse.pvt_week_list || [])
                setQuestionnaireSum(resPonse.questionnaire_sum || 0);
                setQuestionnaireSumList(resPonse.questionnaire_week_list || [])
                setWorkloadSum(resPonse.workload_sum || 0);
                setWorkloadSumList(resPonse.well_load_week_list || [])
                setWellbeingSum(resPonse.wellbeing_sum || 0);
                setWellbeingSumList(resPonse.work_being_week_list || [])
                setPvtWeekSummaryValue(resPvtWeekSummary)
                setPercentatageOfDaysWearingValue(resPercentatageOfDaysWearing)

                const resUserRecruitment = await userRecruitment()
                const obj = { 
                    total_users_width: parseInt((resUserRecruitment?.total_users / 1000) * 100),
                    pilots_width: parseInt((resUserRecruitment?.pilots / 800) * 200),
                    cabin_crews_width: parseInt((resUserRecruitment?.cabin_crews / 800) * 100),
                }
                const mergedObj = Object.assign(obj, resUserRecruitment); 
                setUserRecruitmentValue(mergedObj)

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData()
    }, [])

    const generatePDF = () => {
        // console.log('123', dataList);
        /* 
                const svgElements = document.body.querySelectorAll('svg');
                svgElements.forEach(function (item) {
                    item.setAttribute("width", item.getBoundingClientRect().width);
                    item.setAttribute("height", item.getBoundingClientRect().height);
                    item.style.width = null;
                    item.style.height = null;
                });
                const page = document.getElementById('pdfcontainer');
        
                html2canvas(page, {
                    background: '#FFFFFF',
                    letterRendering: 1,
                    allowTaint: true,
                    onrendered: function (canvas) {
                        // convert canvas to image
                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = 190; // image width (mm)
                        const pageHeight = imgWidth * 1.414;
                        const imgHeight = canvas.height * imgWidth / canvas.width;
                        let heightLeft = imgHeight;
                        const margin = 10;
                        const doc = new jsPDF('p', 'mm');
                        // const position = 0;
        
                        doc.setFontSize(10);
                        doc.text("Report 2022/09/12 - 2022/09/18", 10, 10, 0);
        
                        doc.addImage(imgData, 'PNG', margin, 30, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                        doc.save('report.pdf');
                    }
                }); */


        document.documentElement.scrollTop = 0;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let exportPage = document.getElementById('pdfcontainer');
        //output the height of PDF
        let pdfWidth = exportPage.clientWidth;
        let pdfHeight = exportPage.clientHeight;

        let scale = 3; //
        if (pdfWidth > pdfHeight) {
            pdfHeight = pdfWidth;
        }
        canvas.width = pdfWidth * scale;
        canvas.height = pdfHeight * scale;
        let option = {
            scale: 1,
            width: pdfWidth,
            height: pdfHeight,
            canvas: canvas,
            useCORS: true,
        }
        context.scale(scale, scale)
        html2canvas(exportPage, option).then(canvas => {
            let pdf = new jsPDF('', 'pt', [canvas.width / scale, canvas.height / scale]); //自定义宽高
            let pageDataBase64 = canvas.toDataURL('image/jpeg', 1.0);
            pdf.addImage(pageDataBase64, 'JPEG', 0, 0, canvas.width / scale, canvas.height / scale); //将图像添加到页面上
            pdf.save('report.pdf')
        })
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-heard">
                <div className="dashboard-page-heard-title">Dashboard</div>
                <div onClick={() => generatePDF()}>
                    <Button className='download-btn' type="primary" size={'large'}>
                        <div className="dashboard-page-heard-btn">
                            <div>
                                <DownloadOutlined style={{ fontSize: '0.4rem', marginRight: '0.2rem' }} />
                            </div>
                            <div>Download Report</div>
                        </div>
                    </Button>
                </div>
            </div>
            <div id="pdfcontainer" className="dashboard-page-content">
                <div className="page-line">
                    <Row gutter={16} justify="space-between">
                        <Col span={6} xs={24} sm={24} md={6} lg={6}>
                            <div className="card-one">
                                <div className="card-title">
                                    <div>Psychomotor Vigilance Test</div>
                                </div>
                                <div className="text-muted">
                                    Weekly
                                </div>
                                <Row wrap={true}>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={8}>
                                        <div className="align-number-conten">
                                            <h3 className="items-number">{pvtSum}</h3>
                                            <div className="align-items-baseline">
                                                {/* <p className="text-success-up">
                                                    <span>+3.3%</span>
                                                    <i className="arrow-up"><ArrowUpOutlined /></i>
                                                </p> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={16}>
                                        <div className="apexcharts-card">
                                            <PVTChart colors={colors} fontFamily={fontFamily} partData={pvtSumList} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={6} lg={6}>
                            <div className="card-one">
                                <div className="card-title">
                                    <div>Fatigue/Sleepiness Questionnaire</div>
                                </div>
                                <div className="text-muted">
                                    Weekly
                                </div>
                                <Row wrap={true}>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={8}>
                                        <div className="align-number-conten">
                                            <h3 className="items-number">{questionnaireSum}</h3>
                                            <div className="align-items-baseline">
                                                {/* <p className="text-success-down">
                                                    <span>-2.8%</span>
                                                    <i className="arrow-down"><ArrowDownOutlined /></i>
                                                </p> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={16}>
                                        <div className="apexcharts-card">
                                            <FSQChart colors={colors} fontFamily={fontFamily} partData={questionnaireSumList} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={6} lg={6}>
                            <div className="card-one">
                                <div className="card-title">
                                    <div>Workload Questionnaire</div>
                                </div>
                                <div className="text-muted">
                                    Weekly  
                                </div>
                                <Row wrap={true}>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={8}>
                                        <div className="align-number-conten">
                                            <h3 className="items-number">{workloadSum}</h3>
                                            <div className="align-items-baseline">
                                                {/* <p className="text-success-up">
                                                    <span>+2.8%</span>
                                                    <i className="arrow-up"><ArrowUpOutlined /></i>
                                                </p> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={16}>
                                        <div className="apexcharts-card">
                                            <WQChart colors={colors} fontFamily={fontFamily} partData={workloadSumList} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={6} lg={6}>
                            <div className="card-one">
                                <div className="card-title">
                                    <div>WELLBEING Questionnaire</div>
                                </div>
                                <div className="text-muted">
                                    Weekly
                                </div>
                                <Row wrap={true}>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={8}>
                                        <div className="align-number-conten">
                                            <h3 className="items-number">{wellbeingSum}</h3>
                                            <div className="align-items-baseline">
                                                {/* <p className="text-success-up">
                                                    <span>+2.8%</span>
                                                    <i className="arrow-up"><ArrowUpOutlined /></i>
                                                </p> */}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={12} md={24} lg={24} xl={16}>
                                        <div className="apexcharts-card">
                                            <MQChart colors={colors} fontFamily={fontFamily} partData={wellbeingSumList} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="page-line">
                    <Row gutter={16} justify="space-between">
                        <Col span={6} xs={24} sm={24} md={16} lg={16}>
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>Psychomotor Vigilance Test Number Overview</div>
                                </div>
                                <div className="text-muted">
                                    Weekly
                                </div>
                                <div className="apexcharts-card-two">
                                    <PVTNOChart colors={colors} fontFamily={fontFamily} partData={pvtWeekSummaryValue} />
                                </div>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={8} lg={8} >
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>Questionnaire Overview</div>
                                </div>
                                <div className="text-muted">
                                    Weekly
                                </div>
                                <div className="apexcharts-card-two">
                                    <QOChart colors={colors} fontFamily={fontFamily} partData={[pvtSum, questionnaireSum, workloadSum, wellbeingSum]} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="page-line">
                    <Row gutter={16} justify="space-between">
                        <Col span={6} xs={24} sm={24} md={12} lg={12}>
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>Percentage of Days Wearing Fitbit Sense</div>
                                </div>
                                <div className="text-muted">
                                    General
                                </div>
                                <div className="apexcharts-card-two">
                                    <WGChart colors={colors} fontFamily={fontFamily} partData={percentatageOfDaysWearingValue} />
                                </div>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={12} lg={12} >
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>Percentage of Days Wearing Fitbit Sense</div>
                                </div>
                                <div className="text-muted">
                                    Sleep
                                </div>
                                <div className="apexcharts-card-two">
                                    <WSChart colors={colors} fontFamily={fontFamily} partData={percentatageOfDaysWearingValue} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="page-line">
                    <Row gutter={16} justify="space-between">
                        <Col span={6} xs={24} sm={24} md={12} lg={12}>
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>Percentage of Days Wearing Fitbit Sense</div>
                                </div>
                                <div className="text-muted">
                                    Exercise
                                </div>
                                <div className="apexcharts-card-two">
                                    <WEChart colors={colors} fontFamily={fontFamily} partData={percentatageOfDaysWearingValue} />
                                </div>
                            </div>
                        </Col>
                        <Col span={6} xs={24} sm={24} md={12} lg={12} >
                            <div className="card-one clearfix">
                                <div className="card-title">
                                    <div>User Recruitment</div>
                                </div>
                                <div className="apexcharts-card-two-bar">
                                    <div className="align-items-baseline">
                                        <h6 className="card-text">Total Users</h6>
                                        <h6 className="text-muted"> {userRecruitmentValue?.total_users || 0}/  1000</h6>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                            style={{ width: `${userRecruitmentValue?.total_users_width}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="align-items-baseline">
                                        <h6 className="card-text">Pilots</h6>
                                        <h6 className="text-muted">{userRecruitmentValue?.pilots || 0}/  200</h6>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar"
                                            style={{ width: `${userRecruitmentValue?.pilots_width}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="align-items-baseline">
                                        <h6 className="card-text">Cabin Crews</h6>
                                        <h6 className="text-muted">{userRecruitmentValue?.cabin_crews || 0}/ 800</h6>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar"
                                            style={{ width: `${userRecruitmentValue?.cabin_crews_width}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;