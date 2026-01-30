import React, { useEffect, useState } from 'react'
import './ChangeSession.scss'
import { Link } from "react-router-dom";
import { timeSlotsApi, changeTimeSlotsApi } from 'src/api/index'
import { Button, Select, Modal } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function ChangeSession() {
    let navigate = useNavigate()
    const [options, setOptions] = useState([]) // 下拉框选项
    const [selectedItem, setSelectedItem] = useState([]) // 选择list
    const [isModalOpen, setIsModalOpen] = useState(false); // 确认登录弹窗展示


    useEffect(() => {
        getSlotLIst()
    }, [])

    const getSlotLIst = async () => {
        try {
            const res = await timeSlotsApi()
            setOptions(res)
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        console.log('下拉选择项', e);
        setSelectedItem(e)
    }

    const onSubmit = async () => {
        if (!selectedItem.length) {
            setIsModalOpen(true);
            return
        }
        const res = await changeTimeSlotsApi({ time_slots: selectedItem })
        if (res) {
            debugger
            navigate('/layout/session-view')
        }
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='change-session-page overflow-scroll'>
            <div className='change-session-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Change On-Boarding Session</div>

            </div>
            <div className='change-session-page-conetn'>
                <div className='conten-body'>
                    <div className='change-session-page-conetn-herad'>
                        <div className='change-session-page-conetn-title'>Change On-Boarding Session</div>
                        <div className='change-session-page-conetn-text'>Select On-Boarding Session</div>
                    </div>
                    <div className='change-session-page-table-conten'>

                        <div className='change-session-page-table-item'>
                            <div>
                                <Select
                                    placeholder='Select Session Slots'
                                    style={{
                                        width: "100%",
                                        textAlign: 'left'
                                    }}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </div>
                            <div>
                                <Button className='Submit-button' type="primary" onClick={onSubmit}>
                                    Save
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            <Modal open={isModalOpen} centered footer={false} closable={false}>
                <div className='page-modal-conetn'>
                    <div><CloseCircleOutlined style={{ fontSize: '1.5rem', color: 'red', margin: '0.5rem  0' }} /></div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '0.5rem' }} >Change Slots Error</div>
                    <div style={{ marginBottom: '0.2rem' }}>Please choose your time slots.</div>
                    <div className='page-modal-conetn-footer'>
                        <Button type="primary" className='button' onClick={handleOk} >Ok</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
