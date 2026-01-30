import React, { useState } from 'react'
import './SessionAdd.scss'
import { Link, useNavigate } from 'react-router-dom'
import { createAdminTimeSlotApi } from 'src/api/index'
import { Button, Input, Row, Col, DatePicker, TimePicker } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'

export default function SessionAdd() {
  let navigate = useNavigate()

  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    vacancy_limit: 20,
    address_line_1: 'SIA Training Centre',
    address_line_2: '',
    address_line_3: '720 Upper Changi Rd East, Singapore 486852',
  })

  const formatDateAndTime = (date, time) => {
    return `${date} ${time}:00`
  }

  // Update form data as user inputs
  const onStartDate = (date, dateString) => setFormData({ ...formData, startDate: dateString })
  const onStartTime = (time, timeString) => setFormData({ ...formData, startTime: timeString })
  const onEndDate = (date, dateString) => setFormData({ ...formData, endDate: dateString })
  const onEndTime = (time, timeString) => setFormData({ ...formData, endTime: timeString })
  const onVacancyLimitChange = (e) => setFormData({ ...formData, vacancy_limit: e.target.value })
  const onLocation1Change = (e) => setFormData({ ...formData, address_line_1: e.target.value })
  const onLocation2Change = (e) => setFormData({ ...formData, address_line_2: e.target.value })
  const onLocation3Change = (e) => setFormData({ ...formData, address_line_3: e.target.value })

  // Handle form submission
  const handleSubmit = async () => {
    const startTime = formatDateAndTime(formData.startDate, formData.startTime)
    const endTime = formatDateAndTime(formData.endDate, formData.endTime)

    try {
      const response = await createAdminTimeSlotApi({
        start_time: startTime,
        end_time: endTime,
        vacancy_limit: formData.vacancy_limit,
        address_line_1: formData.address_line_1,
        address_line_2: formData.address_line_2,
        address_line_3: formData.address_line_3,
      })
      // Handle response, navigate or show message
      console.log(response)
      navigate('/layout/onBoardingSession')
    } catch (error) {
      console.error('Error creating time slot:', error)
      // Handle error, show error message
    }
  }

  return (
    <div className='session-add-page overflow-scroll'>
      <div className='session-add-page-heard'>
        <Link className='dashboard-page-heard-title' to='/layout/dashboard'>
          Dashboard
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <Link className='dashboard-page-heard-title' to='/layout/onBoardingSession'>
          On-Boarding Sessions
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <div className='dashboard-page-heard-title-active'>Add Session Slots</div>
      </div>
      <div className='session-add-page-conetn'>
        <div className='conten-body'>
          <div className='session-add-page-conetn-herad'>
            <div className='session-add-page-conetn-title'>Add Session Slots</div>
          </div>
          <div className='session-add-page-table-conten'>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Start Date</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    {' '}
                    <DatePicker style={{ width: '100%' }} onChange={onStartDate} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Start Time</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <TimePicker style={{ width: '100%' }} format={'HH:mm'} onChange={onStartTime} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>End Date</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <DatePicker style={{ width: '100%' }} onChange={onEndDate} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>End Time</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <TimePicker style={{ width: '100%' }} format={'HH:mm'} onChange={onEndTime} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Location (Address line 1)</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <Input onChange={onLocation1Change} defaultValue={formData.address_line_1} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Location (Address line 2)</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <Input onChange={onLocation2Change} placeholder='1C Meeting Room 3' />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Location (Address line 3)</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <Input onChange={onLocation3Change} defaultValue={formData.address_line_3} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className='session-add-page-table-item'>
              <Row justify='space-between' align='middle'>
                <Col flex='none' xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div>Vacancy Limit</div>
                </Col>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className='session-add-page-table-item-lable'>
                    <Input type='number' defaultValue={formData.vacancy_limit} onChange={onVacancyLimitChange} />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Button className='session-add-button' type='primary' onClick={handleSubmit}>
                Add Session Slot
              </Button>
              <Button
                className='session-cancel-button'
                onClick={() => {
                  navigate('/layout/onBoardingSession')
                }}>
                Cancel
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
