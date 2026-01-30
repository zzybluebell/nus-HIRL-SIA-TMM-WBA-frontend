import React, { useEffect, useState } from 'react'
import './User.scss'
import { Link } from 'react-router-dom'
import { userTableApi, editUserApi } from 'src/api/index'
import { Table, Modal, Input, notification, Select } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'
import Search from 'src/components/Search/Search'

const { Option } = Select

export default function User() {
  const [dataList, setDataList] = useState([])
  const [tableList, setTableList] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState({})

  const showModal = (user) => {
    setEditingUser(user)
    setIsModalVisible(true)
  }

  const openNotification = () => {
    notification.success({
      message: 'User Updated',
      description: 'The user details have been successfully updated.',
    })
  }

  const handleEdit = async () => {
    await editUserApi(editingUser)
    openNotification()
    getTableData()
    setIsModalVisible(false)
  }

  const handleRoleChange = (value) => {
    setEditingUser({ ...editingUser, roles: value })
  }

  const handleEmailChange = (e) => {
    setEditingUser({ ...editingUser, email: e.target.value })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    getTableData()
  }, [])

  const getTableData = async () => {
    const res = await userTableApi(null)
    setDataList(res)
    setTableList(res)
  }

  const columns = [
    {
      title: 'Syetem Generated ID',
      dataIndex: 'mask_id',
      key: 'mask_id',
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
        multiple: 1,
      },
    },
    // {
    //   title: 'Staff ID',
    //   dataIndex: 'staff_id',
    //   key: 'staff_id',
    //   width: '15%',
    //   sorter: {
    //     compare: (a, b) => {
    //       var stringA = a.staff_id?.toUpperCase() // ignore upper and lowercase
    //       var stringB = b.staff_id?.toUpperCase() // ignore upper and lowercase
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
    // {
    //   title: 'Fitbit User ID',
    //   dataIndex: 'fitbit_id',
    //   key: 'fitbit_id',
    //   width: '15%',
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
    //     multiple: 2,
    //   },
    // },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      width: '12%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.roles?.toUpperCase() // ignore upper and lowercase
          var stringB = b.roles?.toUpperCase() // ignore upper and lowercase
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      sorter: {
        compare: (a, b) => {
          var stringA = a.email?.toUpperCase() // ignore upper and lowercase
          var stringB = b.email?.toUpperCase() // ignore upper and lowercase
          if (stringA < stringB) {
            return -1
          }
          if (stringA > stringB) {
            return 1
          }
          return 0
        },
        multiple: 4,
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: '20%',
    },
    {
      title: 'Participation Start Date',
      dataIndex: 'participation_start_date',
      key: 'participation_start_date',
      width: '15%',
    },
    {
      title: 'Participation End Date',
      dataIndex: 'participation_end_date',
      key: 'participation_end_date',
      width: '15%',
    },
    {
      title: 'Participant Completion Rate',
      dataIndex: 'participation_completion_rate',
      key: 'participation_completion_rate',
      width: '15%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <Link onClick={() => showModal(record)}>Edit</Link>,
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
        <div className='dashboard-page-heard-title-active'>User Data</div>
      </div>
      <div className='user-page-conetn'>
        <div className='user-page-conetn-herad'>
          <div className='user-page-conetn-title'>User Data</div>
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
      <Modal title='Edit User' open={isModalVisible} onOk={handleEdit} onCancel={handleCancel}>
        <div className='modal-label'>Staff ID</div>
        <Input
          placeholder='Staff ID'
          value={editingUser.staff_id}
          onChange={(e) => setEditingUser({ ...editingUser, staff_id: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <div className='modal-label'>Email</div>
        <Input
          placeholder='Email'
          value={editingUser.email}
          onChange={handleEmailChange}
          style={{ marginBottom: 10 }}
        />
        <div className='modal-label'>Role</div>
        <Select
          placeholder='Select Role'
          value={editingUser.roles}
          onChange={handleRoleChange}
          style={{ width: '100%' }}>
          <Option value='User'>User</Option>
          <Option value='Admin'>Admin</Option>
        </Select>
      </Modal>
    </div>
  )
}
