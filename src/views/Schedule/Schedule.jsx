import React, { useState, useEffect } from 'react'
import './Schedule.scss'
import { Link } from "react-router-dom";
import { Button, Select, Row, Col } from 'antd';
import { staffIdTableApi } from 'src/api/index'; // scheduleApi 这个后续加接口需要自己改动api文件夹中的index.js文件
import Footer from "src/views/Layout/Footer/Footer";
import ffffData from "../../assets/schedule.json" // 写死的数据
import OPPrender from "./render.jsx"

export default function Schedule() {
    const [inputList, setInputList] = useState([]) // 选择框中的数据list
    const [selectValue, setSelectValue] = useState([])
    const [featureSelect, setFeatureSelect] = useState([])
    const [echartShow, setEchartShow] = useState(false)


    useEffect(() => {
        getTableData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //  获取选择框中的数据
    const getTableData = async () => {
        const newArr = []
        const res = await staffIdTableApi(null)
        const ogdd = res?.result;
        (ogdd || [])?.map((item) => {
            const obj = {
                value: item,
                label: item
            }
            return newArr.push(obj)
        })
        setInputList(newArr)
    }

    const handleChange = (value) => {
        setSelectValue(value)
        setEchartShow(false)
    };

    const onSubmitChange = () => { // async
        // const res = await scheduleApi()
        // let newData = []
        // selectValue.map((item) => {
        //     for (const key in ffffData) {
        //         if (ffffData.hasOwnProperty.call(ffffData, key)) {
        //             if (item === key) {
        //                 const element = ffffData[key];
        //                 newData.push(element)
        //             }
        //         }
        //     }
        // })
        setFeatureSelect(selectValue)
        setEchartShow(true)
    }

    return (
        <div className='schedule-page overflow-scroll'>
            <div className='schedule-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Schedule</div>
            </div>
            <div className='schedule-page-conetn'>
                <div className='conten-body'>
                    <div className='schedule-page-conetn-herad'>
                        <div className='schedule-page-conetn-title'>Schedule</div>
                    </div>
                    <div className='schedule-page-table-conten'>
                        <Row justify="space-between" align="middle">
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div className='notify-users-page-from-item-lable' >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: "100%" }}
                                        onChange={handleChange}
                                        options={inputList}
                                    />
                                </div>
                            </Col>
                            <Col flex="none" xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div style={{ margin: '0.4rem 0' }}>
                                    <Button className='Submit-button' type="primary" onClick={() => onSubmitChange()} >Submit</Button>
                                    <Button className='Generate-button'  >Generate</Button>
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <div className='schedule-page-table-amcharts'>
                        {echartShow ? <OPPrender feature={ffffData} selected={featureSelect} /> : null}
                    </div>

                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
