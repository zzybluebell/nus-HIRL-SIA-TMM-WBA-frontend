import React, { useEffect, useState } from 'react'
import './Sleep.scss'
import { Link } from "react-router-dom";
import { sleepTableApi } from 'src/api/index'
import { Table } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import Search from 'src/components/Search/Search'


export default function Sleep() {
    const [dataList, setDataList] = useState([]) // 原始数据
    const [tableList, setTableList] = useState([]) // 筛选数据

    useEffect(() => {
        getTableData()

    }, [])

    //  获取table表格数据
    const getTableData = async () => {
        const res = await sleepTableApi(null)
        setDataList(res.result)
        setTableList(res.result)
    }

    // 设置表格头部
    const columns = [
        {
            title: 'Syetem Generated ID',
            dataIndex: 'mask_id',
            key: 'mask_id',
            width: 110,
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
        //     width: 110,
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
            width: 160,
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
            title: 'END DATA',
            dataIndex: 'end_time',
            key: 'end_time',
            width: 160,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.end_time?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.end_time?.toUpperCase(); // ignore upper and lowercase
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
            title: 'DURATION',
            dataIndex: 'duration',
            key: 'duration',
            width: 120,
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: 'DEEP MINUTES',
            dataIndex: 'deep_minutes',
            key: 'deep_minutes',
            width: 150,
            sorter: (a, b) => a.deep_minutes - b.deep_minutes,
        },

        {
            title: 'LIGHT MINUTES',
            dataIndex: 'light_minutes',
            key: 'light_minutes',
            width: 150,
            sorter: (a, b) => a.light_minutes - b.light_minutes,
        },
        {
            title: 'WAKE MINUTES',
            dataIndex: 'wake_minutes',
            key: 'wake_minutes',
            width: 160,
            sorter: (a, b) => a.wake_minutes - b.wake_minutes,
        },

        {
            title: 'RESTLESS MINUTES',
            dataIndex: 'restless_minutes',
            key: 'restless_minutes',
            width: 180,
            sorter: (a, b) => a.restless_minutes - b.restless_minutes,
        },
        {
            title: 'REM MINUTES',
            dataIndex: 'rem_minutes',
            key: 'rem_minutes',
            width: 150,
            sorter: (a, b) => a.rem_minutes - b.rem_minutes,
        },

        {
            title: 'ASLEEP MINUTES',
            dataIndex: 'asleep_minutes',
            key: 'asleep_minutes',
            width: 160,
            sorter: (a, b) => a.asleep_minutes - b.asleep_minutes,
        },
        {
            title: 'AWAKE MINUTES',
            dataIndex: 'awake_minutes',
            key: 'awake_minutes',
            width: 180,
            sorter: (a, b) => a.awake_minutes - b.awake_minutes,
        },
        {
            title: 'MAIN SLEEP',
            dataIndex: 'is_main_sleep',
            key: 'is_main_sleep',
            width: 140,
            sorter: (a, b) => a.is_main_sleep - b.is_main_sleep,
            render: (text, record) => {
                if (record.is_main_sleep) {
                    return <div>true</div>
                } else {
                    return <div>fasle</div>
                }
            }
        },
        {
            title: 'LOG TYPE',
            dataIndex: 'log_type',
            key: 'log_type',
            width: 120,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.log_type?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.log_type?.toUpperCase(); // ignore upper and lowercase
                    if (stringA < stringB) {
                        return -1;
                    }
                    if (stringA > stringB) {
                        return 1;
                    }
                    return 0;
                }
            },
        },
    ];

    // 处理search框搜索的数据
    const getNewList = (data) => {
        setTableList(data)
    }

    return (
        <div className='sleep-page overflow-y-scroll'>
            <div className='sleep-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Sleep Data</div>
            </div>
            <div className='sleep-page-conetn'>
                <div className='sleep-page-conetn-herad'>
                    <div className='sleep-page-conetn-title'>Sleep Data</div>
                    <div className='sleep-page-conetn-herad-body'>
                        <div className='table-search'>
                            <Search list={dataList} getNewList={getNewList} />
                        </div>
                    </div>
                </div>
                <div className='sleep-page-table-conten'>
                    <Table
                        columns={columns}
                        dataSource={tableList}
                        rowKey={(record, index) => { return `${record.fitbit_id}${index}` }}
                        scroll={{ x: 2100 }}
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
