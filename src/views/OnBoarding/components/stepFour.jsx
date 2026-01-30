import '../index.scss'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Alert, Button, Checkbox, DatePicker, Form, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import {
  getDeviceAPI, getTimeSlotsAPI, getUserLastTimeSlotsAPI, postConfirmCollectionAPI, postTimeSlotsAPI,
} from 'src/api'
import { CalendarOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { OnBoardCtx } from '../index'
import { SectionBottom, SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const STR_SEPARATOR = ' - '

const deduplicate = (arr) => {
  const res = []
  arr.map((item) => {
    if (!res.some((one) => item.label === one.label)) {
      res.push(item)
    }
    return 1
  })
  return res
}

const getDateOptions = (data) => {
  return data.map((item) => {
    const _date = String(item.date)
    return {
      label: _date,
      value: dayjs(_date, 'YYYY-MM-DD'),
    }
  })
}

const getTimeOptions = (data) => {
  return data.map((item) => {
    const _time = `${item.start_time.split(' ')[1]}${STR_SEPARATOR}${item.end_time.split(' ')[1]}`
    const _timeText = `${dayjs(item.start_time.split(' ')[1], 'HH:mm:ss').format('h:mm a')}${STR_SEPARATOR}${dayjs(
      item.end_time.split(' ')[1],
      'HH:mm:ss'
    ).format('h:mm a')}`
    return {
      label: _timeText,
      value: _time,
    }
  })
}

const getPlaceOptions = (data) => {
  return data
    .filter((item) => item.vacancy_limit > 0)
    .map((item) => {
      const _place = `${item.address_line_1}, ${item.address_line_2}, ${item.address_line_3}`
      return {
        label: _place,
        value: _place,
      }
    })
}

const StepFourPageOne = () => {
  const [form] = Form.useForm()
  const [isAlertShown, setIsAlertShown] = useState(false)
  const { goNextPage, pageExtraData, setPageExtraData } = useContext(OnBoardCtx)
  const _title = pageExtraData?.page8?.title

  const [options, setOptions] = useState(null)
  const [dateOptions, setDateOptions] = useState([])
  const [timeOptions, setTimeOptions] = useState([])
  const [plcaeOptions, setPlaceOptions] = useState([])
  const [selection, setSelection] = useState({
    date: undefined,
    time: undefined,
    place: undefined,
  })

  const onSubmit = () => {
    // console.log('log12', form.getFieldsValue(), selection)
    form
      .validateFields() // validate form
      .then(() => {
        // if success
        const [startTime, endTime] = String(selection.time).split(STR_SEPARATOR)

        postTimeSlotsAPI({
          start_time: `${selection.date} ${startTime}`,
          end_time: `${selection.date} ${endTime}`,
        }).then(() => {
          if (_title) {
            setPageExtraData({
              ...pageExtraData,
              page8: undefined,
              page9: {
                hasChanged: true,
              },
            })
          }
          goNextPage()
        })
      })
      .catch((e) => {
        // or not
        console.log('log44', e)
        setIsAlertShown(true)
      })
  }

  useEffect(() => {
    if (!options || !options.length) return

    let timeOptions = [...options]
    let placeOptions = [...options]
    // filter by date, time, place
    if (selection.date) {
      timeOptions = timeOptions.filter((item) => item.date === selection.date)
      placeOptions = [...timeOptions]
      if (selection.time) {
        placeOptions = placeOptions.filter(
          (item) => item.start_time.split(' ')[1] === selection.time.split(STR_SEPARATOR)[0]
        )
      }
    }

    const _dateOptions = getDateOptions(options)
    const _timeOptions = getTimeOptions(timeOptions)
    const _placeOptions = getPlaceOptions(placeOptions)

    setDateOptions(deduplicate(_dateOptions))
    setTimeOptions(deduplicate(_timeOptions))
    setPlaceOptions(deduplicate(_placeOptions))
  }, [selection, options])

  useEffect(() => {
    getTimeSlotsAPI()
      .then((res) => {
        const data = res.data
        // console.log('log11', data)
        setOptions(data)
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }, [])

  return (
    <>
      { (
        <>
          <SectionTop title={_title || 'Step 4'} description={'Collecting Fitbit Sense 2'} />
          <SectionDivider />
          {isAlertShown && (
            <Alert
              className='alert_wrapper alert_warning'
              message={`Please ensure all required fields are filled before continuing.`}
              type='warning'
              showIcon
            />
          )}
          <Form
            form={form}
            onValuesChange={() => {
              setIsAlertShown(false)
            }}>
            <SectionItem>
              <div>
                <Title level={5} className='section_item_title'>
                  Collect a loaned Fitbit Sense 2
                </Title>
              </div>
              <div>
                <Text>
                  When you loan a Fitbit Sense 2 for this study, you can earn a chance to keep it by fulfilling these
                  monthly criteria:
                </Text>
              </div>
              <div className='acknowledge_container'>
                <div>
                  <Text>1.</Text>
                </div>
                <div>
                  <Text>Complete at least 70% of questionnaire-based tasks;</Text>
                </div>
                <div>
                  <Text>2.</Text>
                </div>
                <div>
                  <Text>Wear the Fitbit watch for at least 70% of the time.</Text>
                </div>
              </div>
              <div>
                <Text>
                  Please select your Fitbit collection date and time slot. Then click on the “Next” button to confirm
                  your booking.
                </Text>
              </div>
              {/* Date */}
              <div className='select_container'>
                <div className='select_container_left'>
                  <div>
                    <Text strong>Collection Date</Text>
                  </div>
                  <div>
                    <Text type='secondary'>Choose your preferred date</Text>
                  </div>
                </div>
                <div>
                  <Form.Item
                    name='date'
                    rules={[{ type: 'object', required: true, message: 'Please select', validateTrigger: 'onBlur' }]}
                    shouldUpdate>
                    <DatePicker
                      allowClear
                      inputReadOnly // readonly
                      style={{ width: '100%' }}
                      placeholder='Select Date'
                      disabledDate={(currentDate) =>
                        !dateOptions.some((item) => currentDate.format('YYYY-MM-DD') === item.label)
                      }
                      onChange={(value) => {
                        setSelection({
                          date: value ? value.format('YYYY-MM-DD') : undefined,
                          time: undefined,
                          place: undefined,
                        })
                        form.setFieldValue('time', undefined)
                        form.setFieldValue('place', undefined)
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              {/* Time */}
              <div className='select_container'>
                <div className='select_container_left'>
                  <div>
                    <Text strong>Collection Time Slot</Text>
                  </div>
                  <div>
                    <Text type='secondary'>Choose your preferred time slot</Text>
                  </div>
                </div>
                <div>
                  <Form.Item
                    name='time'
                    rules={[{ required: true, message: 'Please select', validateTrigger: 'onBlur' }]}
                    shouldUpdate>
                    <Select
                      allowClear
                      style={{ width: '100%' }}
                      placeholder='Select Time Slot'
                      options={timeOptions}
                      onChange={(value) => {
                        setSelection({
                          date: selection.date,
                          time: value || undefined,
                          place: undefined,
                        })
                        form.setFieldValue('place', undefined)
                      }}
                      disabled={selection.date === undefined}
                    />
                  </Form.Item>
                </div>
              </div>
              {/* Place */}
              <div className='select_container'>
                <div className='select_container_left'>
                  <div>
                    <Text strong>Collection Venue</Text>
                  </div>
                  <div>
                    <Text type='secondary'>Choose your preferred venue</Text>
                  </div>
                </div>
                <div>
                  <Form.Item
                    name='place'
                    rules={[{ required: true, message: 'Please select', validateTrigger: 'onBlur' }]}
                    shouldUpdate>
                    <Select
                      allowClear
                      style={{ width: '100%' }}
                      placeholder='Select Venue'
                      options={plcaeOptions}
                      onChange={(value) => {
                        setSelection({
                          ...selection,
                          place: value || undefined,
                        })
                      }}
                      disabled={selection.date === undefined || selection.time === undefined}
                    />
                  </Form.Item>
                </div>
              </div>
            </SectionItem>
          </Form>
          <SectionDivider />
          <SectionBottom nextAction={onSubmit} />
        </>
      )}
    </>
  )
}

const StepFourPageTwo = () => {
  const { page, goNextPage, pageExtraData, setPageExtraData, modal } = useContext(OnBoardCtx)
  const _hasChanged = pageExtraData?.page9?.hasChanged || undefined

  const [form] = Form.useForm()

  const [isAlertShown, setIsAlertShown] = useState(false)
  const [isReadyToConfitm, setIsReadyToConfirm] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    getUserLastTimeSlotsAPI()
      .then((res) => {
        // console.log('log11', res)
        setInfo(res)
        if (res.is_valid === false) setIsAlertShown(true)
      })
      .catch((e) => {
        if(e.status === 422)  {
          setInfo(e.response.data)
        if (e.response.data.is_valid === false) setIsAlertShown(true)
        } 
        console.log('log44', e);
      })

    getDeviceAPI()
      .then((res) => {
        console.log('log11', res)
        if (res.status) {
          setIsReadyToConfirm(true)
        }
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }, [])

  return (
    <>
      {info && (
        <>
          <SectionTop
            title={'Collect your loaned Fitbit Sense 2 to continue'}
            description={'Please bring along your Staff ID for collection'}
          />
          <SectionDivider />
          {_hasChanged && (
            <Alert className='alert_wrapper' message='Change to your appointment confirmed.' type='success' showIcon />
          )}
          {isAlertShown && (
            <Alert
              className='alert_wrapper'
              message={`You missed the designated collection slot, kindly reschedule by utilising the 'Change Appointment' button.`}
              type='warning'
              showIcon
            />
          )}
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                Pending Collection
              </Title>
            </div>
            <div>
              <Text>{`Collect your loaned Fitbit Sense 2 on `}</Text>
              <Text strong>{dayjs(info.start_time, 'YYYY-MM-DD HH:mm:ss').format('D MMM YYYY, h:mm a')}</Text>
              <Text strong>{` – `}</Text>
              <Text strong>{dayjs(info.end_time, 'YYYY-MM-DD HH:mm:ss').format('h:mm a')}</Text>
              <Text>.</Text>
            </div>
            <div>
              <div>
                <Text strong>{info.address_line_1}</Text>
              </div>
              <div>
                <Text>{info.address_line_2}</Text>
              </div>
              <div>
                <Text>{info.address_line_3}</Text>
              </div>
            </div>
            <div>
              <Text>Step 5 will be available when the collection of your Fitbit Sense 2 is verified.</Text>
            </div>
            <div>
              <Text>You may log out now and check back at a later time.</Text>
            </div>
            <div className='flex'>
              <div className='mobile_btn_full'>
                <Button
                  block
                  type='primary'
                  ghost
                  icon={<CalendarOutlined />}
                  onClick={() => {
                    setPageExtraData({
                      ...pageExtraData,
                      page8: {
                        title: 'Change Appointment',
                      },
                    })
                    goNextPage(page - 1)
                  }}>
                  Change Appointment
                </Button>
              </div>
            </div>
          </SectionItem>
          <SectionDivider />
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                Declaration
              </Title>
            </div>
            <div className='acknowledge_container'>
              <div>
                <Text>1.</Text>
              </div>
              <div>
                <Text>
                  {`Please retain the issuance email throughout the study period for proof of device issuance. The issued device comes with a 1-year warranty valid from the date of issuance so long as you remain a participant of the study. Participants may contact Fitbit for warranty and technical concerns via email at `}
                </Text>
                <Text underline>
                  {/* <Link to={`mailto:${encodeURIComponent('support-sg@fitbit.com')}`} target='_blank'> */}
                  <Link>support-sg@fitbit.com</Link>
                </Text>
                <Text>{` or through web chat at `}</Text>
                <Text underline>
                  <Link to='https://myhelp.fitbit.com/s/support?language=en_US&co=SG' target='_blank'>
                    myhelp.fitbit.com
                  </Link>
                </Text>
                <Text>.</Text>
              </div>
              <div>
                <Text>2.</Text>
              </div>
              <div>
                <Text>{`Please contact `}</Text>
                <Text underline>
                  {/* <Link to={`mailto:${encodeURIComponent('wellness_study@singaporeair.com.sg')}`} target='_blank'> */}
                  <Link>fatigue_study@singaporeair.com.sg</Link>
                </Text>
                <Text>
                  {` if you have replaced your device due to warranty
                  exchange with Fitbit.`}
                </Text>
              </div>
              <div>
                <Text>3.</Text>
              </div>
              <div>
                <Text strong>
                  {`In the event of the device being lost or not returned as per stipulated requirements, you will be
                  obligated to reimburse the entire device cost, `}
                </Text>
                <Text>which amounts to S$428 or the prevailing market value, whichever is lower.</Text>
              </div>
            </div>
            <div>
              <Form form={form}>
                <Form.Item noStyle name='confirm' valuePropName='checked'>
                  <Checkbox
                    onChange={(e) => {
                      setIsConfirmed(e.target.checked)
                    }}>
                    By confirming the collection, you agree to the Terms & Conditions, and acknowledge that the device
                    and its accompanying items listed above have been issued in good condition for the purpose of
                    participation in the Employee Wellness Study. During this period, the device and its accompanying
                    items are properties of SIA-NUS.
                  </Checkbox>
                </Form.Item>
              </Form>
            </div>
            <div className='flex_rows'>
              <div className='mobile_btn_full'>
                <Button
                  block
                  type='primary'
                  disabled={!(isReadyToConfitm && isConfirmed)}
                  onClick={() =>
                    modal.confirm({
                      icon: <ExclamationCircleOutlined />,
                      title: 'Are you sure you want to confirm the collection?',
                      content:
                        'By confirming the collection, you agree to the Terms & Conditions, and acknowledge that the device and its accompanying items listed above have been issued in good condition for the purpose of participation in the Employee Wellness Study. During this period, the device and its accompanying items are properties of SIA-NUS.',
                      okText: 'Confirm',
                      cancelText: 'Reject',
                      onOk: () => {
                        postConfirmCollectionAPI()
                          .then((res) => {
                            // console.log('log11', res)
                            goNextPage(12)
                          })
                          .catch((e) => {
                            console.log('log44', e)
                          })
                      },
                    })
                  }>
                  Confirm
                </Button>
              </div>
              <div className='mobile_btn_full'>
                <div className='flex_center' style={{ height: 32 }}>
                  <Text type='secondary'>{`(Activates upon Fitbit watch collection and confirmation)`}</Text>
                </div>
              </div>
            </div>
          </SectionItem>
          {/* <SectionDivider /> */}
          {/* <SectionBottom /> */}
        </>
      )}
    </>
  )
}

const StepFour = () => {
  const { page } = useContext(OnBoardCtx)

  return (
    <>
      {page === 8 && <StepFourPageOne />}
      {page === 9 && <StepFourPageTwo />}
    </>
  )
}

export default StepFour
