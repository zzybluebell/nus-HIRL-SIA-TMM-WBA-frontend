import React, { useEffect, useState } from 'react'
import './HealthMetrics.scss'
import { Link } from "react-router-dom";
import { healthMetricsTableApi } from 'src/api/index'
import { Table } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import Search from 'src/components/Search/Search'


export default function HealthMetrics() {
    const [dataList, setDataList] = useState([]) // 原始数据
    const [tableList, setTableList] = useState([]) // 筛选数据

    useEffect(() => {
        getTableData()

    }, [])

    //  获取table表格数据
    const getTableData = async () => {
        const res = await healthMetricsTableApi(null)
        setDataList(res.result)
        setTableList(res.result)
    }

    // 设置表格头部
    const columns = [
        {
            title: 'Syetem Generated ID',
            dataIndex: 'mask_id',
            key: 'mask_id',
            width: 120,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.fitbit_id?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.fitbit_id?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 1,
            },
        },
        // {
        //     title: 'FITBIT ID',
        //     dataIndex: 'fitbit_id',
        //     key: 'fitbit_id',
        //     width: 120,
        //     sorter: {
        //         compare: (a, b) => {
        //             var stringA = a.fitbit_id?.toUpperCase(); // ignore upper and lowercase
        //             var stringB = b.fitbit_id?.toUpperCase(); // ignore upper and lowercase
        //             if (stringA < stringB) {
        //                 return -1;
        //             }
        //             if (stringA > stringB) {
        //                 return 1;
        //             }
        //             return 0;
        //         },
        //         multiple: 1,
        //     },
        // },
        {
            title: 'DATA',
            dataIndex: 'date',
            key: 'date',
            width: 180,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.date?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.date?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
        {
            title: 'STEPS',
            dataIndex: 'steps',
            key: 'steps',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.steps?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.steps?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
        {
            title: 'CALORIES',
            dataIndex: 'calories',
            key: 'calories',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.calories?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.calories?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'SPO2 MIN',
            dataIndex: 'spo2_min',
            key: 'spo2_min',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.spo2_min?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.spo2_min?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'SPO2 AVG',
            dataIndex: 'spo2_avg',
            key: 'spo2_avg',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.spo2_avg?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.spo2_avg?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'SPO2 MAX',
            dataIndex: 'spo2_max',
            key: 'spo2_max',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.spo2_max?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.spo2_max?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'HRV DEEP RMSSD',
            dataIndex: 'hrv_deep_rmssd',
            key: 'hrv_deep_rmssd',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.hrv_deep_rmssd?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.hrv_deep_rmssd?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'HRV DAILY RMSSD',
            dataIndex: 'hrv_daily_rmssd',
            key: 'hrv_daily_rmssd',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.hrv_daily_rmssd?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.hrv_daily_rmssd?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'RESTING HEART RATE',
            dataIndex: 'resting_heart_rate',
            key: 'resting_heart_rate',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.resting_heart_rate?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.resting_heart_rate?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
        {
            title: 'BREATHING Rate',
            dataIndex: 'breathing_rate',
            key: 'breathing_rate',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.breathing_rate?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.breathing_rate?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 3,
            },
        },
    ];

    // 处理search框搜索的数据
    const getNewList = (data) => {
        setTableList(data)
    }

    return (
        <div className='health-metrics-page overflow-scroll'>
            <div className='health-metrics-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Health Metrics Data</div>
            </div>
            <div className='health-metrics-page-conetn'>
                <div className='health-metrics-page-conetn-herad'>
                    <div className='health-metrics-page-conetn-title'>Health Metrics Data</div>
                    <div className='health-metrics-page-conetn-herad-body'>
                        <div className='table-search'>
                            <Search list={dataList} getNewList={getNewList} />
                        </div>
                    </div>
                </div>
                <div className='health-metrics-page-table-conten'>
                    <Table
                        columns={columns}
                        dataSource={tableList}
                        rowKey={(record) => { return `${record.date}${record.fitbit_id}` }}
                        scroll={{ x: 800 }}
                        pagination={{
                            showTotal: (total, range) => { return `Showing ${range[0]} to ${range[1]} of ${total} entries` }
                        }}
                    />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
