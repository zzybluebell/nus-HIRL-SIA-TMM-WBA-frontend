import React, { useEffect, useState } from 'react'
import './Wellbeing.scss'
import { Link } from 'react-router-dom'
import { wellbeingTableApi } from 'src/api/index'
import { Table } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'
import Search from 'src/components/Search/Search'

export default function Wellbeing() {
  const [dataList, setDataList] = useState([]) // 原始数据
  const [tableList, setTableList] = useState([]) // 筛选数据

  useEffect(() => {
    getTableData()
  }, [])

  //  获取table表格数据
  const getTableData = async () => {
    const res = await wellbeingTableApi(null)
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
          var stringA = a.fitbit_id?.toUpperCase() // ignore upper and lowercase
          var stringB = b.fitbit_id?.toUpperCase() // ignore upper and lowercase
          if (stringA < stringB) {
            return -1
          }
          if (stringA > stringB) {
            return 1
          }
          return 0
        },
        multiple: 1,
      },
    },
    // {
    //   title: 'FITBIT ID',
    //   dataIndex: 'fitbit_id',
    //   key: 'fitbit_id',
    //   // width: 120,
    //   sorter: {
    //     compare: (a, b) => {
    //       var stringA = a.fitbit_id?.toUpperCase() // ignore upper and lowercase
    //       var stringB = b.fitbit_id?.toUpperCase() // ignore upper and lowercase
    //       if (stringA < stringB) {
    //         return -1
    //       }
    //       if (stringA > stringB) {
    //         return 1
    //       }
    //       return 0
    //     },
    //     multiple: 1,
    //   },
    // },
    {
      title: 'DATA',
      dataIndex: 'date',
      key: 'date',
      // width: 180,
      sorter: {
        compare: (a, b) => {
          var stringA = a.date?.toUpperCase() // ignore upper and lowercase
          var stringB = b.date?.toUpperCase() // ignore upper and lowercase
          if (stringA < stringB) {
            return -1
          }
          if (stringA > stringB) {
            return 1
          }
          return 0
        },
      },
    },
    {
      title: 'WELLBEING LEVEL',
      dataIndex: 'well_being',
      key: 'well_being',
      sorter: {
        compare: (a, b) => {
          var stringA = a.well_being?.toUpperCase() // ignore upper and lowercase
          var stringB = b.well_being?.toUpperCase() // ignore upper and lowercase
          if (stringA < stringB) {
            return -1
          }
          if (stringA > stringB) {
            return 1
          }
          return 0
        },
      },
    },
    // {
    //     title: 'DEVICE',
    //     dataIndex: 'device',
    //     key: 'device',
    //     sorter: {
    //         compare: (a, b) => {
    //             var stringA = a.device?.toUpperCase(); // ignore upper and lowercase
    //             var stringB = b.device?.toUpperCase(); // ignore upper and lowercase
    //             if (stringA < stringB) {
    //                 return -1;
    //             }
    //             if (stringA > stringB) {
    //                 return 1;
    //             }
    //             return 0;
    //         },
    //         multiple: 3,
    //     },
    // },
    {
      title: 'REASON',
      dataIndex: 'reason',
      key: 'reason',
      sorter: {
        compare: (a, b) => {
          var stringA = a.reason?.toUpperCase() // ignore upper and lowercase
          var stringB = b.reason?.toUpperCase() // ignore upper and lowercase
          if (stringA < stringB) {
            return -1
          }
          if (stringA > stringB) {
            return 1
          }
          return 0
        },
        multiple: 3,
      },
    },
  ]

  // 处理search框搜索的数据
  const getNewList = (data) => {
    setTableList(data)
  }

  return (
    <div className='wellbeing-page overflow-scroll'>
      <div className='wellbeing-page-heard'>
        <Link className='dashboard-page-heard-title' to='/layout/dashboard'>
          Dashboard
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <div className='dashboard-page-heard-title-active'>Wellbeing Data</div>
      </div>
      <div className='wellbeing-page-conetn'>
        <div className='wellbeing-page-conetn-herad'>
          <div className='wellbeing-page-conetn-title'>Wellbeing Data</div>
          <div className='wellbeing-page-conetn-herad-body'>
            <div className='table-search'>
              <Search list={dataList} getNewList={getNewList} />
            </div>
          </div>
        </div>
        <div className='wellbeing-page-table-conten'>
          <Table
            columns={columns}
            dataSource={tableList}
            rowKey={(record) => {
              return `${record.date}${record.fitbit_id}`
            }}
            scroll={{ x: 800 }}
            pagination={{
              showTotal: (total, range) => {
                return `Showing ${range[0]} to ${range[1]} of ${total} entries`
              },
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
