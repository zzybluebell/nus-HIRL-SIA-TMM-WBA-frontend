import React, { useEffect, useState } from 'react'
import './Fatigue.scss'
import { Link } from "react-router-dom";
import { fatigueTableApi } from 'src/api/index'
import { Table } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import Search from 'src/components/Search/Search'


export default function Fatigue() {
    const [dataList, setDataList] = useState([]) // 原始数据
    const [tableList, setTableList] = useState([]) // 筛选数据

    useEffect(() => {
        getTableData()

    }, [])

    //  获取table表格数据
    const getTableData = async () => {
        const res = await fatigueTableApi(null)
        setDataList(res.result)
        setTableList(res.result)
    }

    // 设置表格头部
    const columns = [
        {
            title: 'Syetem Generated ID',
            dataIndex: 'mask_id',
            key: 'mask_id',
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
            title: 'OCCUPATION',
            dataIndex: 'occupation',
            key: 'occupation',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.occupation?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.occupation?.toUpperCase(); // ignore upper and lowercase
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
            title: 'DATA',
            dataIndex: 'date',
            key: 'date',
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
            title: 'FATIGUE LEVEL',
            dataIndex: 'fatigue_level',
            key: 'fatigue_level',
            width: '25%',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.fatigue_level?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.fatigue_level?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                },
                multiple: 4,
            },
        },
        {
            title: 'FLIGHT STAGE',
            dataIndex: 'flight_stage',
            key: 'flight_stage',
            sorter: (a, b) => a.flight_stage - b.flight_stage,
        },
        {
            title: 'DEVICE',
            dataIndex: 'device',
            key: 'device',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.device?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.device?.toUpperCase(); // ignore upper and lowercase
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
            title: 'PVT TEST',
            dataIndex: 'pvt_test',
            key: 'pvt_test',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.pvt_test?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.pvt_test?.toUpperCase(); // ignore upper and lowercase
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
        <div className='fatigue-page overflow-scroll'>
            <div className='fatigue-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Fatigue Data</div>
            </div>
            <div className='fatigue-page-conetn'>
                <div className='fatigue-page-conetn-herad'>
                    <div className='fatigue-page-conetn-title'>Fatigue Data</div>
                    <div className='fatigue-page-conetn-herad-body'>
                        <div className='table-search'>
                            <Search list={dataList} getNewList={getNewList} />
                        </div>
                    </div>
                </div>
                <div className='fatigue-page-table-conten'>
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
