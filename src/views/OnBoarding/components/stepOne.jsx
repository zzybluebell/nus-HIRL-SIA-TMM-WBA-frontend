import '../index.scss'
import * as React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Button, Form, Radio, Space, Typography } from 'antd'
import pdfOne from 'src/assets/pdf/NUS-IRB-2020-255_PISCF_Summary.pdf'
import { CheckOutlined, CloseOutlined, FilePdfOutlined } from '@ant-design/icons'
import { getQuestionAPI } from '../../../api'
import { OnBoardCtx } from '../index'
import { PDFModal } from './modal'
import { SectionBottom, SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const StepOnePageOne = () => {
  return (
    <>
      <SectionTop title={'Step 1'} description={'Introduction'} />
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Greetings & Welcome to the SIA-NUS Employee Wellness Study
          </Title>
        </div>
        <div>
          <Text>
            It is our pleasure to have you on board as a participant in this research study. Before we begin, there are
            several crucial administrative procedures that need to be completed by you. We kindly request you to follow
            the necessary steps to complete this onboarding process. This will take about 10 mins.
          </Text>
        </div>
      </SectionItem>
      <SectionDivider />
      <SectionBottom />
    </>
  )
}

const StepOnePageTwo = ({ openPDF }) => {
  const [form] = Form.useForm()
  const { goNextPage } = useContext(OnBoardCtx)

  const [questions, setQuestions] = useState(null)
  const [buttonText, setButtonText] = useState('Next')

  const [isAlertShown, setIsAlertShown] = useState(false)
  const [isMarkShown, setIsMarkShown] = useState(false)
  const [isReadyNext, setIsReadyNext] = useState(false)
  const [isAllSelected, setIsAllSelected] = useState(false)

  const onSubmit = () => {
    if (buttonText === 'Refresh') {
      // once answer two less correct questions, must refresh
      getQuestions()
      return
    }
    // console.log('log11', form.getFieldsValue())
    form
      .validateFields() // validate form
      .then(() => {
        // if success
      })
      .catch((e) => {
        // or not
      })
      .finally(() => {
        // finally
        const _res = Object.values(form.getFieldsValue()).map((v) => `${v}`)
        const _answers = questions.map((q) => `${q.answer}`)
        const _n = _answers.reduce((pre, cur, curIdx) => {
          return (pre += Number(cur === _res[curIdx]))
        }, 0) // correct answer count

        if (_n < 2) {
          setIsMarkShown(true)
          setIsAlertShown(true)
          setIsReadyNext(false)
          setButtonText('Refresh')
        } else {
          if (isReadyNext) {
            goNextPage()
          } else {
            setIsReadyNext(true)
            setIsMarkShown(true)
            setButtonText('Ready Next')
          }
        }
      })
  }

  const getQuestions = useCallback(() => {
    form.resetFields()
    setIsAllSelected(false)
    getQuestionAPI()
      .then((res) => {
        // console.log('log11', res)
        const _questions = res.data.question_list
        if (_questions && _questions.length) {
          setQuestions(_questions)
          setButtonText('Next')
          setIsMarkShown(false)
          setIsAlertShown(false)
          setIsReadyNext(false)
          console.log('log21, API questions', _questions)
        }
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }, [form])

  useEffect(() => {
    getQuestions()
  }, [getQuestions])

  return (
    <>
      {questions && questions.length && (
        <>
          <SectionTop
            title={'Q&A'}
            description={`Prior to proceeding to the next step, you must answer at least 2 questions correctly. These questions are designed to assess your understanding of the study's requirements. More information can be found in the Participant Information document.`}
          />
          <SectionDivider />
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                Download
              </Title>
            </div>
            <div>
              <Text>
                Please review the document which includes critical information on your involvement in this study. A copy
                of the document can be downloaded for your reference.
              </Text>
            </div>
            <div className='flex'>
              <div className='mobile_btn_full'>
                <Button block type='primary' ghost icon={<FilePdfOutlined />} onClick={openPDF}>
                  View PDF
                </Button>
              </div>
            </div>
          </SectionItem>
          <SectionDivider />
          {isAlertShown && (
            <Alert
              className='alert_wrapper alert_warning'
              message='Two or more questions have been answered incorrectly. Please try again.'
              type='warning'
              showIcon
            />
          )}
          <Form
            form={form}
            onValuesChange={() => {
              if (!Object.values(form.getFieldsValue()).includes(undefined)) {
                setIsAllSelected(true)
              }
              setIsAlertShown(false)
            }}>
            {questions.map((q, index) => {
              return (
                <div key={q.id}>
                  <SectionItem>
                    <div>
                      <Title level={5} className='section_item_title'>
                        {`${index + 1}. ${q.description}`}
                      </Title>
                    </div>
                    <Form.Item
                      name={`q${index + 1}`}
                      rules={[
                        { required: true, message: 'Please select' },
                        {
                          type: 'enum',
                          enum: [Number(q.answer)],
                          message: 'Not correct',
                          validateTrigger: 'onBlur',
                        },
                      ]}>
                      <Radio.Group>
                        <Space direction='vertical' size={16}>
                          {q.options.map((o, idx) => {
                            return (
                              <Radio key={`${idx}${String(o)}`} value={idx}>
                                {String(o)}
                                {isMarkShown && (
                                  <>
                                    <span style={{ marginRight: '12px' }} />
                                    <span>
                                      {idx === q.answer ? (
                                        <CheckOutlined style={{ color: '#52C41A' }} />
                                      ) : (
                                        <CloseOutlined style={{ color: '#FF0000' }} />
                                      )}
                                    </span>
                                  </>
                                )}
                              </Radio>
                            )
                          })}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </SectionItem>
                </div>
              )
            })}
          </Form>
          <SectionDivider />
          <SectionBottom nextAction={onSubmit} nextTitle={buttonText} disabled={!isAllSelected} />
        </>
      )}
    </>
  )
}

const StepOne = () => {
  const { page } = useContext(OnBoardCtx)

  const [isPDFOpen, setIsPDFOpen] = useState(false)

  return (
    <>
      <PDFModal
        open={isPDFOpen}
        onCancel={() => setIsPDFOpen(false)}
        pdfSrc={pdfOne}
        pdfNameStr={`PARTICIPANT INFORMATION SHEET & CONSENT FORM – SUMMARY SHEET.pdf`}
      />
      {page === 1 && <StepOnePageOne />}
      {page === 2 && <StepOnePageTwo openPDF={() => setIsPDFOpen(true)} />}
    </>
  )
}

export default StepOne
