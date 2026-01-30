import React, { useEffect, useState } from 'react'
import './Pvt.scss'
import { Link } from "react-router-dom";
import { pvtTableApi } from 'src/api/index'
import { Table } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import Search from 'src/components/Search/Search'


export default function Pvt() {
    const [dataList, setDataList] = useState([]) // 原始数据
    const [tableList, setTableList] = useState([]) // 筛选数据

    useEffect(() => {
        getTableData()

    }, [])

    //  获取table表格数据
    const getTableData = async () => {
        const res = await pvtTableApi(null)
        setDataList(res.result)
        setTableList(res.result)
    }

    // 设置表格头部
    const columns = [
        {
            title: 'Syetem Generated ID',
            dataIndex: 'mask_id',
            key: 'mask_id',
            // width: 120,
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
            },
        },
        // {
        //     title: 'FITBIT ID',
        //     dataIndex: 'fitbit_id',
        //     key: 'fitbit_id',
        //     // width: 120,
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
        //     },
        // },
        {
            title: 'DATA',
            dataIndex: 'test_start_time',
            key: 'test_start_time',
            // width: 180,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.test_start_time?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.test_start_time?.toUpperCase(); // ignore upper and lowercase
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
        {
            title: 'AVERAGE RESPONSE TIME',
            dataIndex: 'average_test_time',
            key: 'average_test_time',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.average_test_time?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.average_test_time?.toUpperCase(); // ignore upper and lowercase
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
            title: 'ERROR NUMBERS',
            dataIndex: 'errors_number',
            key: 'errors_number',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.errors_number?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.errors_number?.toUpperCase(); // ignore upper and lowercase
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
            title: 'COMPLETED',
            dataIndex: 'is_done',
            key: 'is_done',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.is_done?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.is_done?.toUpperCase(); // ignore upper and lowercase
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
            },
        },
        {
            title: 'REASON',
            dataIndex: 'reason',
            key: 'reason',
            sorter: {
                compare: (a, b) => {
                    var stringA = a.reason?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.reason?.toUpperCase(); // ignore upper and lowercase
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
    ];

    // 处理search框搜索的数据
    const getNewList = (data) => {
        setTableList(data)
    }

    return (
        <div className='pvt-page overflow-scroll'>
            <div className='pvt-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Pvt Data</div>
            </div>
            <div className='pvt-page-conetn'>
                <div className='pvt-page-conetn-herad'>
                    <div className='pvt-page-conetn-title'>Pvt Data</div>
                    <div className='pvt-page-conetn-herad-body'>
                        <div className='table-search'>
                            <Search list={dataList} getNewList={getNewList} />
                        </div>
                    </div>
                </div>
                <div className='pvt-page-table-conten'>
                    <Table
                        columns={columns}
                        dataSource={tableList}
                        rowKey={(record) => { return `${record.test_start_time}${record.fitbit_id}` }}
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
