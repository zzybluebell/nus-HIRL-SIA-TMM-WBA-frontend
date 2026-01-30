import React, { useEffect, useState } from 'react'
import './Collection.scss'
import { Link } from 'react-router-dom'
import { collectionTableApi, editUserApi } from 'src/api/index'
import { Table, Modal, Input, notification, DatePicker, Select } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'
import Search from 'src/components/Search/Search'
import dayjs from 'dayjs'

export default function Collection() {
  const [dataList, setDataList] = useState([])
  const [tableList, setTableList] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isAssignModalVisible, setIsAssignModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState({})

  
  const showModal = (user) => {
    if (user.fitbit_return_date === '' || user.fitbit_return_date === 'None') {
      user.fitbit_return_date = null
    }
    if (user.confirm_date === '' || user.confirm_date === 'None') {
      user.confirm_date = null
    }
    setEditingUser(user)
    setIsModalVisible(true)
  }

 
  const showAssignModal = (user) => {
    if (user.fitbit_return_date === '' || user.fitbit_return_date === 'None') {
      user.fitbit_return_date = null
    }
    setEditingUser(user)
    setIsAssignModalVisible(true)
  }

  const openNotification = () => {
    notification.success({
      message: 'Collection Updated',
      description: 'The collection details have been successfully updated.',
    })
  }

  const handleEdit = async () => {
    await editUserApi(editingUser)
    openNotification()
    getTableData()
    setIsModalVisible(false)
    setIsAssignModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setIsAssignModalVisible(false)
  }

  useEffect(() => {
    getTableData()
  }, [])

  const getTableData = async () => {
    const res = await collectionTableApi(null)
    res.forEach((item) => {
      if (item.fitbit_return_date === '' || item.fitbit_return_date === 'None') {
        item.fitbit_return_date = null
      }
      if (item.validation_date === '' || item.validation_date === 'None') {
        item.validation_date = null
      }
      if (item.confirm_date === '' || item.confirm_date === 'None') {
        item.confirm_date = null
      }
    })
    setDataList(res)
    setTableList(res)
  }

  const columns = [
    {
      title: 'Staff ID',
      dataIndex: 'staff_id',
      key: 'staff_id',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.staff_id?.toUpperCase() // ignore upper and lowercase
          var stringB = b.staff_id?.toUpperCase() // ignore upper and lowercase
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
    {
      title: 'Fitbit Serial Number',
      dataIndex: 'fitbit_device_id',
      key: 'fitbit_device_id',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.fitbit_device_id?.toUpperCase() // ignore upper and lowercase
          var stringB = b.fitbit_device_id?.toUpperCase() // ignore upper and lowercase
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
    {
      title: 'Planned Collection Slot',
      dataIndex: 'appointment_date',
      key: 'appointment_date',
      width: '15%',
      sorter: (a, b) => a.appointment_date.localeCompare(b.appointment_date),
    },
    {
      title: 'Actual Collection Slot',
      dataIndex: 'confirm_date',
      key: 'confirm_date',
      width: '15%',
      sorter: (a, b) => a.confirm_date.localeCompare(b.confirm_date),
    },
    {
      title: 'Appointment Venue',
      dataIndex: 'appointment_venue',
      key: 'appointment_venue',
      width: '20%',
    },
    {
      title: 'Validation Date',
      dataIndex: 'validation_date',
      key: 'validation_date',
      width: '15%',
      render: (_, record) => {
        // render date only
        return <div>{record.validation_date ? record.validation_date.split(' ')[0] : ''}</div>
      },
      sorter: (a, b) => a.validation_date.localeCompare(b.validation_date),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.status?.toUpperCase() // ignore upper and lowercase
          var stringB = b.status?.toUpperCase() // ignore upper and lowercase
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
    {
      title: 'Fitbit Returned Date',
      dataIndex: 'fitbit_return_date',
      key: 'fitbit_return_date',
      width: '15%',
      render: (_, record) => {
        // render date only
        return <div>{record.fitbit_return_date ? record.fitbit_return_date.split(' ')[0] : ''}</div>
      },
      sorter: (a, b) => a.fitbit_return_date.localeCompare(b.fitbit_return_date),
    },
    {
      title: 'Fitbit Returned Serial Number',
      dataIndex: 'return_device_id',
      key: 'return_device_id',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.return_device_id?.toUpperCase() // ignore upper and lowercase
          var stringB = b.return_device_id?.toUpperCase() // ignore upper and lowercase
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Link onClick={() => showAssignModal(record)}>Assign</Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Link onClick={() => showModal(record)}>Edit</Link>
        </>
      ),
    },
  ]

  const getNewList = (data) => {
    setTableList(data)
  }

  return (
    <div className='user-page overflow-scroll'>
      <div className='user-page-heard'>
        <Link className='dashboard-page-heard-title' to='/layout/dashboard'>
          Dashboard
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <div className='dashboard-page-heard-title-active'>Collection Data</div>
      </div>
      <div className='user-page-conetn'>
        <div className='user-page-conetn-herad'>
          <div className='user-page-conetn-title'>Collection Data</div>
          <div className='user-page-conetn-herad-body'>
            <div className='table-search'>
              <Search list={dataList} getNewList={getNewList} />
            </div>
          </div>
        </div>
        <div className='user-page-table-conten'>
          <Table
            columns={columns}
            dataSource={tableList}
            rowKey={(record) => {
              return `${record.staff_id}${record.fitbit_id}`
            }}
            scroll={{ x: 500 }}
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

      <Modal title='Edit Collection' open={isModalVisible} onOk={handleEdit} onCancel={handleCancel}>
        <div className='modal-label'>Fitbit Serial Number</div>
        <Input
          placeholder='Fitbit serial number'
          value={editingUser.fitbit_device_id}
          onChange={(e) => setEditingUser({ ...editingUser, fitbit_device_id: e.target.value })}
          style={{ marginBottom: 10, minWidth: 200 }}
        />
        <div className='modal-label'>Actual Collection Slot</div>
        <DatePicker
          placeholder='Actual Collection Slot'
          showTime={{ format: 'HH:mm' }}
          value={editingUser.confirm_date ? dayjs(editingUser.confirm_date) : null}
          onChange={(e) => setEditingUser({ ...editingUser, confirm_date: e.format('YYYY-MM-DD HH:mm:ss') })}
          style={{ marginBottom: 10, minWidth: 200 }}
        />
        <div className='modal-label'>Fitbit Returned Date</div>
        <DatePicker
          placeholder='Fitbit Returned Date'
          value={editingUser.fitbit_return_date ? dayjs(editingUser.fitbit_return_date) : null}
          onChange={(e) => setEditingUser({ ...editingUser, fitbit_return_date: e.format('YYYY-MM-DD HH:mm:ss') })}
          style={{ marginBottom: 10, minWidth: 200 }}
        />
        <div className='modal-label'>Fitbit Returned Serial Number</div>
        <Input
          placeholder='Fitbit Returned Serial Number'
          value={editingUser.return_device_id}
          onChange={(e) => setEditingUser({ ...editingUser, return_device_id: e.target.value })}
          style={{ marginBottom: 10, minWidth: 200 }}
        />
        <div className='modal-label'>Status</div>
        <Select
          value={editingUser.status}
          onChange={(e) => setEditingUser({ ...editingUser, status: e })}
          style={{ marginBottom: 10, minWidth: 200 }}>
          <Select.Option value='Not Collected'>Not Collected</Select.Option>
          <Select.Option value='Collected'>Collected</Select.Option>
          <Select.Option value='Returned'>Returned</Select.Option>
        </Select>
      </Modal>
      <Modal title='Assign Fitbit Device' open={isAssignModalVisible} onOk={handleEdit} onCancel={handleCancel}>
        <div className='modal-label'>Fitbit S/N</div>
        <Input
          placeholder='Fitbit S/N'
          value={editingUser.fitbit_device_id}
          onChange={(e) => setEditingUser({ ...editingUser, fitbit_device_id: e.target.value })}
          style={{ marginBottom: 10 }}
        />
      </Modal>
    </div>
  )
}
