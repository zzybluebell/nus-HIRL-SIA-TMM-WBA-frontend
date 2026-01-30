import React, { useEffect, useState } from 'react'
import './OnBoardingSession.scss'
import { Link, useNavigate } from 'react-router-dom'
import { adminTimeSlotsApi, deleteAdminTimeSlotApi } from 'src/api/index'
import { Table, Button, Popconfirm, Divider } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'

export default function OnBoardingSession() {
  let navigate = useNavigate()
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    getSlotList()
  }, [])

  const handleDelete = (id) => {
    console.log('delete' + id)
    deleteAdminTimeSlotApi({ id })
      .then((res) => {
        getSlotList()
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }

  const getSlotList = async () => {
    try {
      const res = await adminTimeSlotsApi()
      setDataList(res)
    } catch (error) {}
  }

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'StartTime',
      width: '20%',
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'EndTime',
      width: '20%',
    },
    {
      title: 'Location',
      key: 'Location',
      render: (text, record, index) => {
        return (
          <div>
            <div>{record.address_line_1}</div>
            <div>{record.address_line_2}</div>
            <div>{record.address_line_3}</div>
          </div>
        )
      },
      width: '30%',
    },
    {
      title: 'Vacancy Limit',
      dataIndex: 'vacancy_limit',
      key: 'vacancy_limit',
      width: '15%',
    },
    {
      title: 'Actions',
      dataIndex: 'ACTION',
      key: 'ACTION',
      render: (text, record, index) => {
        return (
          <>
            <Link to={`/layout/session-edit/${record.id}`}>Edit</Link>
            <Divider type='vertical' />
            <Popconfirm title='Confirm delete?' onConfirm={() => handleDelete(record.id)}>
              <a href='/#'>Delete</a>
            </Popconfirm>
          </>
        )
      },
    },
  ]

  return (
    <div className='on-boarding-session-page overflow-scroll'>
      <div className='on-boarding-session-page-heard'>
        <Link className='dashboard-page-heard-title' to='/layout/dashboard'>
          Dashboard
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <div className='dashboard-page-heard-title-active'>On-Boarding Sessions</div>
      </div>
      <div className='on-boarding-session-page-conetn'>
        <div className='conten-body'>
          <div className='on-boarding-session-page-conetn-herad'>
            <div className='on-boarding-session-page-conetn-title'>On-Boarding Sessions</div>
          </div>
          <div className='on-boarding-session-page-table-conten'>
            <Table
              columns={columns}
              dataSource={dataList}
              rowKey={(record, index) => {
                return `${record.date}${index}`
              }}
              scroll={{ x: 800 }}
              pagination={{
                hideOnSinglePage: true,
                showTotal: (total, range) => {
                  return `Showing ${range[0]} to ${range[1]} of ${total} entries`
                },
              }}
            />
            <div>
              <Button
                className='add-button'
                type='primary'
                onClick={() => {
                  navigate('/layout/sessionAdd')
                }}>
                Add Session Slot
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
