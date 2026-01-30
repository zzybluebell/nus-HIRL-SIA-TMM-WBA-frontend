import React, { useEffect, useState } from 'react'
import './Layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import LayoutHearth from './LayoutHearth/LayoutHearth'
import { useNavigate } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

export default function AbLayout() {
  let navigate = useNavigate()
  const [lateral, setLateral] = useState(false) 
  const [lateralMin, setLateralMin] = useState(false) 
  const [isModalOpen, setIsModalOpen] = useState(false) 

  useEffect(() => {
    // try to extract login token from query string token from SSO
    const urlParams = new URLSearchParams(window.location.search)
    const queryToken = urlParams.get('token')

    window.history.replaceState(null, '', window.location.pathname)

    if (queryToken) {
      sessionStorage.setItem('token', queryToken)
      // navigate('/layout/dashboard/')
      return
    }
  }, [navigate])

  const trigger = () => {
    setLateral(!lateral)
  }

  const triggerMin = () => {
    setLateral(false)
    setLateralMin(!lateralMin)
  }

  // const showModal = () => {
  //   setIsModalOpen(true)
  // }
  const handleOk = () => {
    setIsModalOpen(false)
    navigate('/login')
  }

  return (
    <div className='layout-page'>
      <div className={`  ${lateralMin ? 'bg-shadow-show' : 'bg-shadow'}`} onClick={() => triggerMin()} />
      <div className={`layout-page-menu  ${lateral ? 'lateral' : ''} ${lateralMin ? 'lateralMin' : ''}`}>
        <Sidebar trigger={trigger} lateral={lateral} triggerMin={triggerMin} />
      </div>
      <div className='layout-page-conent'>
        <div className='layout-page-conent-head'>
          <LayoutHearth triggerMin={triggerMin} />
        </div>
        <div className='layout-page-conent-bot'>
          <Outlet></Outlet>
        </div>
      </div>
      <Modal open={isModalOpen} centered footer={false} closable={false}>
        <div className='on-boarding-session-page-modal-conetn'>
          <div>
            <InfoCircleOutlined style={{ fontSize: '1.5rem', color: '#ff9f00', margin: '0.5rem  0' }} />
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>Are you Login?</div>
          <p style={{ marginBottom: '0.2rem' }}>You can always access this portal by signing back in!</p>
          <div className='on-boarding-session-page-modal-conetn-footer'>
            <Button type='primary' danger onClick={handleOk}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
