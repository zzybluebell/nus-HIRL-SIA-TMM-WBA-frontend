import React, { useState } from 'react'
import './LayoutHearth.scss'
import { Popover, Input, Modal, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Profile from 'src/assets/images/others/display-pic.jpg'
import { FormOutlined, ClockCircleOutlined, ImportOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';



export default function LayoutHearth(props) {
    let navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false); // 确认退出弹窗

    const openSidebar = () => {
        props.triggerMin()
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleLogOut = () => {
        sessionStorage.setItem('token', "")
        navigate('/login')
    }

    // 首页头像弹框内容
    const content = (
        <div className='head-sculpture-dropdown-menu'>
            <div className="head-sculpture">
                <div className='rounded-circle'>
                    <img className="rounded-circle-img" src={Profile} alt="头像" />
                </div>
                <div className="text-center">
                    <p className="fw-bolder">Panda Bear</p>
                    <p className="text-muted">Administrator</p>
                </div>
            </div>
            <div>
                <ul className="list-unstyled-list">
                    <li className="dropdown-item" onClick={() => { navigate('/layout/ChangePassword') }}>
                        <div className="text-body">
                            <FormOutlined />
                            <span>Change Password</span>
                        </div>
                    </li>
                    <li className="dropdown-item" onClick={() => { navigate('/layout/session-view') }}>
                        <div className="text-body">
                            <ClockCircleOutlined />
                            <span>Change On-Boarding Session</span>
                        </div>
                    </li>
                    <li className="dropdown-item">
                        <div className="text-body" onClick={() => { showModal() }}>
                            <ImportOutlined rotate={180} />
                            <span>Log Out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    );

    return (
        <div className='layout-hearth-page'>
            <div className="sidebar-div" onClick={() => openSidebar()}>
                <div>
                    <div className="sidebar" >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
            <div className='layout-hearth'>
                <div className="input-group">
                    <div>
                        <SearchOutlined style={{ fontSize: '0.4rem', marginTop: '5px' }} />
                    </div>
                    <div>
                        <Input placeholder="Search here..." bordered={false} />
                    </div>
                </div>
                <div className='profile'>
                    <Popover placement="bottomRight" content={content} trigger="click">
                        <img className='profile-img' src={Profile} alt="profile" />
                    </Popover>
                </div>
            </div>
            <Modal open={isModalOpen} centered footer={false} closable={false}>
                <div className='on-boarding-session-page-modal-conetn'>
                    <div><InfoCircleOutlined style={{ fontSize: '1.5rem', color: '#ff9f00', margin: '0.5rem  0' }} /></div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }} >Are you leaving?</div>
                    <p style={{ marginBottom: '0.2rem' }}>You can always access this portal by signing back in!</p>
                    <div className='on-boarding-session-page-modal-conetn-footer'>
                        <Button type="primary" danger onClick={handleOk} >Cancel</Button>
                        <div style={{ width: '0.2rem' }} />
                        <Button className='delete-button' type="primary" onClick={handleLogOut}>Log out</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
