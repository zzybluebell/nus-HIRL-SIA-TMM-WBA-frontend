import React, { useState, useEffect } from 'react'
import './SessionAdd.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editAdminTimeSlotApi, getAdminTimeSlotApi } from 'src/api/index'
import { Button, Input, Row, Col, DatePicker, TimePicker } from 'antd'
import Footer from 'src/views/Layout/Footer/Footer'
import dayjs from 'dayjs'

export default function SessionEdit() {
  let navigate = useNavigate()

  let { id } = useParams()

  const timeFormat = 'HH:mm'
  const dateFormat = 'DD/MM/YYYY'
  const submitDateFormat = 'YYYY-MM-DD'

  const [formData, setFormData] = useState({
    id: id,
    start_time: '',
    end_time: '',
    vacancy_limit: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    startTime: '',
    startDate: '',
    endTime: '',
    endDate: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminTimeSlotApi({ id })
        // format the date and time
        const startTime = extractDateAndTime(data.start_time)
        const endTime = extractDateAndTime(data.end_time)
        const timeFields = {
          startTime: startTime.time,
          startDate: startTime.date,
          endTime: endTime.time,
          endDate: endTime.date,
        }
        // Update formData with the fetched data
        setFormData((f) => {
          return { ...f, ...data, ...timeFields }
        })
      } catch (error) {
        console.error('Error fetching time slot:', error)
        // Handle error, show error message
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async () => {
    const startTime = formatDateAndTime(formData.startDate, formData.startTime)
    const endTime = formatDateAndTime(formData.endDate, formData.endTime)

    try {
      const response = await editAdminTimeSlotApi({
        id: formData.id,
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
      console.error('Error updating time slot:', error)
      // Handle error, show error message
    }
  }

  const formatDateAndTime = (date, time) => {
    const submitDate = dayjs(date, dateFormat).format(submitDateFormat)
    return `${submitDate} ${time}:00`
  }

  const extractDateAndTime = (dateTime) => {
    const [date, time] = dateTime.split(' ')
    // time is in the format HH:mm:ss, we only want HH:mm
    const [hour, minute] = time.split(':')
    return { date, time: `${hour}:${minute}` }
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
        <div className='dashboard-page-heard-title-active'>Edit Session Slot</div>
      </div>
      <div className='session-add-page-conetn'>
        <div className='conten-body'>
          <div className='session-add-page-conetn-herad'>
            <div className='session-add-page-conetn-title'>Edit Session Slot</div>
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
                    <DatePicker
                      style={{ width: '100%' }}
                      onChange={onStartDate}
                      format={dateFormat}
                      locale={'en-US'}
                      value={dayjs(formData.startDate, dateFormat)}
                    />
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
                    <TimePicker
                      style={{ width: '100%' }}
                      format={timeFormat}
                      onChange={onStartTime}
                      value={dayjs(formData.startTime, timeFormat)}
                    />
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
                    <DatePicker
                      style={{ width: '100%' }}
                      onChange={onEndDate}
                      format={dateFormat}
                      locale={'en-US'}
                      value={dayjs(formData.endDate, dateFormat)}
                    />
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
                    <TimePicker
                      style={{ width: '100%' }}
                      format={timeFormat}
                      onChange={onEndTime}
                      value={dayjs(formData.endTime, timeFormat)}
                    />
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
                    <Input onChange={onLocation1Change} value={formData.address_line_1} />
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
                    <Input onChange={onLocation2Change} value={formData.address_line_2} />
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
                    <Input onChange={onLocation3Change} value={formData.address_line_3} />
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
                    <Input type='number' value={formData.vacancy_limit} onChange={onVacancyLimitChange} />
                  </div>
                </Col>
              </Row>
            </div>

            <div>
              <Button className='session-add-button' type='primary' onClick={handleSubmit}>
                Edit Session Slot
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
