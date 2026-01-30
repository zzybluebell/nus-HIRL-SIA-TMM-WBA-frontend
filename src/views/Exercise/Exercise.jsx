import React, { useEffect, useState } from 'react'
import './Exercise.scss'
import { Link } from "react-router-dom";
import { exerciseTableApi } from 'src/api/index'
import { Table } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import Search from 'src/components/Search/Search'


export default function Exercise() {
    const [dataList, setDataList] = useState([]) // 原始数据
    const [tableList, setTableList] = useState([]) // 筛选数据

    useEffect(() => {
        getTableData()

    }, [])

    //  获取table表格数据
    const getTableData = async () => {
        const res = await exerciseTableApi(null)
        setDataList(res.result)
        setTableList(res.result)
    }

    // 设置表格头部
    const columns = [
        {
            title: 'Syetem Generated ID',
            dataIndex: 'mask_id',
            key: 'mask_id',
            // width: 110,
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
        //     // width: 110,
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
            // width: 160,
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
            title: 'ACTIVITY',
            dataIndex: 'name',
            key: 'name',
            // width: 160,
            sorter: {
                compare: (a, b) => {
                    var stringA = a.name?.toUpperCase(); // ignore upper and lowercase
                    var stringB = b.name?.toUpperCase(); // ignore upper and lowercase
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
            // width: 120,
            sorter: (a, b) => a.duration - b.duration
        },
        {
            title: 'STEPS',
            dataIndex: 'steps',
            key: 'steps',
            // width: 150,
            sorter: (a, b) => a.steps - b.steps,
        },

        {
            title: 'CALORIES',
            dataIndex: 'calories',
            key: 'calories',
            // width: 150,
            sorter: (a, b) => a.calories - b.calories,
        },
        {
            title: 'DISTANCE',
            dataIndex: 'distance',
            key: 'distance',
            // width: 160,
            sorter: (a, b) => a.distance - b.distance,
        },

        {
            title: 'AVERAGE HOUR',
            dataIndex: 'average_hr',
            key: 'average_hr',
            // width: 180,
            sorter: (a, b) => a.average_hr - b.average_hr,
        },
        {
            title: 'ELEVATION',
            dataIndex: 'elevation_gain',
            key: 'elevation_gain',
            // width: 150,
            sorter: (a, b) => a.elevation_gain - b.elevation_gain,
        },
        {
            title: 'LOG TYPE',
            dataIndex: 'log_type',
            key: 'log_type',
            // width: 120,
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
        <div className='exercise-page overflow-y-scroll'>
            <div className='exercise-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Exercise Data</div>
            </div>
            <div className='exercise-page-conetn'>
                <div className='exercise-page-conetn-herad'>
                    <div className='exercise-page-conetn-title'>Exercise Data</div>
                    <div className='exercise-page-conetn-herad-body'>
                        <div className='table-search'>
                            <Search list={dataList} getNewList={getNewList} />
                        </div>
                    </div>
                </div>
                <div className='exercise-page-table-conten'>
                    <Table
                        columns={columns}
                        dataSource={tableList}
                        rowKey={(record, index) => { return `${record.fitbit_id}${index}` }}
                        scroll={{ x: 1300 }}
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
