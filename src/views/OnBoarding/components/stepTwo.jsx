import '../index.scss'
import * as React from 'react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Alert, Button, Checkbox, Form, Typography } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LogoHub from 'src/assets/images/img/logo-hub.png'
import videoOne from 'src/assets/images/video/2 - Locating user ID.mp4'
import pdfOne from 'src/assets/pdf/Google_Autenticator_Set_up.pdf'
import { ExclamationCircleOutlined, PlayCircleOutlined, UserOutlined ,GoogleOutlined } from '@ant-design/icons'
import { getFitbitIDAPI, postFitbitSSO, postOptionAPI } from '../../../api'
import { fitbitClientID, fitbitRedirectURI } from '../../../config'
import { OnBoardCtx } from '../index'
import { VideoModal , PDFModal } from './modal'
import { SectionBottom, SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const StepTwoPageOne = () => {
  const { goNextPage, modal, logOut } = useContext(OnBoardCtx)
  const [form] = Form.useForm()

  return (
    <>
      <SectionTop title={'Step 2'} description={'Consent'} />
      <SectionDivider />
      <Form form={form}>
        <SectionItem>
          <div>
            <Title level={5} className='section_item_title'>
              Consent Form
            </Title>
          </div>
          {/* <div>
            <Text>
              Please sign electronically by clicking “I agree” and download a copy of the PIS & CF for your reference.
            </Text>
          </div> */}
          <div>
            <Text>SIA-NUS Digital Aviation Corp Lab – Employee Wellness Data Collection Study</Text>
          </div>
          <div>
            <Text>Principal Investigator with the contact number and organisation:</Text>
          </div>
          <div>
            <Text>Prof. Teo Hock Hai</Text>
            <div className='info_container'>
              <div>
                <Text>Organisation: </Text>
              </div>
              <div>
                <Text>Department of Information Systems & Analytics</Text>
              </div>
              <div>
                <Text>Address:</Text>
              </div>
              <div>
                <Text>21 Lower Kent Ridge Road, Singapore 119077</Text>
              </div>
              <div>
                <Text>Phone:</Text>
              </div>
              <div>
                <Text>6516 2979</Text>
              </div>
              <div>
                <Text>Email:</Text>
              </div>
              <div>
                <Text>disteohh@nus.edu.sg</Text>
              </div>
            </div>
          </div>
          <div>
            <Text>I hereby acknowledge that:</Text>
          </div>
          <div className='acknowledge_container'>
            <div>
              <Text>1.</Text>
            </div>
            <div>
              <Text>I have agreed to take part in the above research.</Text>
            </div>
            <div>
              <Text>2.</Text>
            </div>
            <div>
              <Text>I have agreed to share my Fitbit and roster data for analysis during the study period.</Text>
            </div>
            <div>
              <Text>3.</Text>
            </div>
            <div>
              <Text>
                I have received a copy of this information sheet that explains the use of my data in this research, and
                I understand its contents.
              </Text>
            </div>
            <div>
              <Text>4.</Text>
            </div>
            <div>
              <Text>
                In the unlikely event that I wish to withdraw, I will contact <Text underline>
                  <Link to={`mailto:${encodeURIComponent('fatigue_study@singaporeair.com.sg')}`} target='_blank'>fatigue_study@singaporeair.com.sg</Link>
                </Text>
                .
              </Text>
            </div>
            <div>
              <Text>5.</Text>
            </div>
            <div>
              <Text>
                I will not have any financial benefits that result from the commercial development of this research.
              </Text>
            </div>
          </div>
          <div className='acknowledge_container'>
            <div>
              <Text>6.</Text>
            </div>
            <div>
              <Text>
                I consent to have the coded data made available for future research studies. This will be subject to an
                Institutional Review Board’s approval.
              </Text>
            </div>
          </div>
          {/* <div className='acknowledge_checkbox_container'>
            <Form.Item noStyle name='c1' valuePropName='checked'>
              <Checkbox>
                I understand that the collected data will be made available for future research studies.
              </Checkbox>
            </Form.Item>
            <div>
              <Text type='secondary'>{'(Optional)'}</Text>
            </div>
          </div> */}
          <div className='acknowledge_container'>
            <div>
              <Text>7.</Text>
            </div>
            <div>
              <Text>
                I understand that future studies, if any, will be subject to the NUS Institutional Review Board's
                approval.
              </Text>
            </div>
          </div>
          <div className='acknowledge_checkbox_container'>
            <Form.Item noStyle name='c2' valuePropName='checked'>
              <Checkbox>I understand that I may be re-contacted for future related studies.</Checkbox>
            </Form.Item>
            <Text type='secondary'>{'(Optional)'}</Text>
          </div>
        </SectionItem>
      </Form>
      <SectionDivider />
      <SectionBottom
        nextTitle={'I agree'}
        nextAction={() => {
          const userOptions = form.getFieldsValue()
          postOptionAPI({
            // option_one: Boolean(userOptions['c1']),
            option_one: false,
            option_two: Boolean(userOptions['c2']),
          })
            .then((res) => {
              console.log('log21, API option', res)
              goNextPage()
            })
            .catch((e) => {
              console.log('log44', e)
            })
        }}
        extra={
          <Button
            block
            type='primary'
            ghost
            onClick={() => {
              modal.confirm({
                icon: <ExclamationCircleOutlined />,
                title: 'Are you sure you want to disagree?',
                content: 'This action will log you out of the onboarding process.',
                okText: 'Confirm',
                onOk: () => {
                  logOut()
                },
              })
            }}
            style={{ flexShrink: 1 }}>
            I disagree
          </Button>
        }
      />
    </>
  )
}

const StepTwoPageTwo = ({setIsPDFOpen }) => {
  const { goNextPage } = useContext(OnBoardCtx)
  const [isAlertShown, setIsAlertShown] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const removeQueryParam = useCallback(() => {
    const currentUrlParams = new URLSearchParams(location.search)
    currentUrlParams.delete('code')
    navigate('?' + currentUrlParams.toString(), { replace: true })
  }, [location, navigate])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const queryCode = urlParams.get('code')

    if (queryCode) {
      sessionStorage.setItem('code', queryCode)
      console.log(`Fitbit code: ${queryCode}`)
      // TODO: show loading

      postFitbitSSO({ code: queryCode })
        .then((res) => {
          console.log(res)
          removeQueryParam()
          // TODO: hide loading
          setIsAlertShown(true)
          setTimeout(() => {
            goNextPage()
          }, 1000)
        })
        .catch((e) => {
          setIsAlertShown(true)
          console.log('log44', e)
        })
    }
  }, [goNextPage, removeQueryParam])

  const initFitbitSSO = () => {
    const redirectUri = encodeURIComponent(fitbitRedirectURI)
    const fitbitUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${fitbitClientID}&redirect_uri=${redirectUri}&scope=activity%20heartrate%20location%20oxygen_saturation%20respiratory_rate%20settings%20sleep%20temperature&expires_in=604800`
    window.location.href = fitbitUrl
  }

  return (
    <>
      <SectionTop title={'Step 2'} description={'Consent'} />
      <SectionDivider />
      {isAlertShown && (
        <Alert
          className='alert_wrapper alert_warning'
          message={`Fitbit authorisation unsuccessful, please try again. Make sure to tap 'Allow All' on the Fitbit authorisation webpage to grant our app full access.`}
          type='warning'
          showIcon
        />
      )}
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Elevate health insights with Fitbit authorisation
          </Title>
        </div>
        <div>
          <Text>
            Enable comprehensive health insights by authorising our app's access to your Fitbit health metrics data.
          </Text>
        </div>
        <div>
          <Text>
            Please note that we will only retrieve health metrics data from the time point you participate in the study.
            You may use your existing account and if data privacy is an issue, you may create a new Fitbit account.
          </Text>
        </div>
        <Alert
          className='alert_wrapper'
          message={`Upon tapping on the 'Authorise Fitbit' button, you'll be taken to Fitbit's authorisation webpage. The Fitbit account you've logged into will be utilized for the study. You'll be prompted to confirm the Fitbit account you intend to use before proceeding to Step 3.`}
          type='info'
          showIcon
        />
      </SectionItem>
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Installing Fitbit App through the IOS App Store or Google Play Store
          </Title>
        </div>
        <div className='section_columns section_columns_logo_hub'>
          {/* text */}
          <div>
            <Text>
              You will be required to install and log in the Fitbit app downloaded from the IOS App Store or Google Play
              Store (right) in order to allow syncing of data.
            </Text>
          </div>
          {/* logo */}
          <div>
            <img className='section_img ' src={LogoHub} alt='logo_hub' />
          </div>
        </div>
      </SectionItem>
      <SectionDivider />
      {/* <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Setting up your Fitbit account
          </Title>
        </div>
        <div>
          <Text>
            You are<Text strong>{` required to use a Gmail account`}</Text> to create your Fitbit account. You are
            recommended to create a new Gmail account for this study.
          </Text>
        </div>
        <div>
          <Text>
            If your account has 2FA security, please ensure you sign in using{' '}
            <Text strong>{`Google Authenticator`}</Text> as all other 2FA will be blocked under SIA guidelines. Please
            refer to the guide below on how to set up Google Authenticator if you wish to implement 2FA security.
          </Text>
        </div>
        <div className='flex'>
          <div className='mobile_btn_full'>
            <Button block type='primary' ghost icon={<GoogleOutlined />} onClick={setIsPDFOpen}>
              Google authenticator Guide
            </Button>
          </div>
        </div>
      </SectionItem>
      <SectionDivider /> */}
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Don’t have a Fitbit account?
          </Title>
        </div>
        <div>
          <Text>
            Setting up your Fitbit account is a breeze. Just tap the 'Create Fitbit Account' button, and you'll be taken
            to Fitbit's registration webpage to get started.
          </Text>
        </div>
        {/* <div>
          <Text>
            Please note that we will only retrieve health metrics data from the time point you participate in the study.
          </Text>
        </div> */}
        {/* <div>
          <Text>
            You may use your existing account and if data privacy is an issue, you may create a new Fitbit account. You
            are encouraged to use a separate Google Account when creating a new Fitbit account; please refrain from
            using your personal Google account if possible.
          </Text>
        </div> */}
        <div className='flex'>
          <div className='mobile_btn_full'>
            <Button
              block
              type='primary'
              ghost
              icon={<UserOutlined />}
              onClick={() => {
                const jumpURL = 'https://accounts.fitbit.com/login'
                window.location.href = jumpURL
              }}>
              Create Fitbit Account
            </Button>
          </div>
        </div>
      </SectionItem>
      <SectionDivider />
      <div>
        <div className='flex_rows_space_between'>
          <Text>
            After completion of the tasks, relaunch the Wellness Buddy webpage and log in again if you encounter a blank
            or blocked page after signing in your Fitbit account.
          </Text>
          <div>
            <SectionBottom nextTitle={'Authorise Fitbit'} nextAction={initFitbitSSO} />
          </div>
        </div>
      </div>
    </>
  )
}

const StepTwoPageThree = ({ openVideo }) => {
  const [id, setID] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const removeQueryParam = useCallback(() => {
    const currentUrlParams = new URLSearchParams(location.search)
    currentUrlParams.delete('code')
    navigate('?' + currentUrlParams.toString(), { replace: true })
  }, [location, navigate])

  const refreshID = () => {
    getFitbitIDAPI()
      .then((res) => {
        // console.log('log11, ', res)
        if (res.data) {
          console.log('log21, API fitbit ID', res.data)
          setID(String(res.data))
        }
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const queryCode = urlParams.get('code')

    if (queryCode) {
      sessionStorage.setItem('code', queryCode)
      console.log(`Fitbit code: ${queryCode}`)
      // TODO: show loading

      postFitbitSSO({ code: queryCode })
        .then((res) => {
          console.log(res)
          removeQueryParam()
          refreshID()
        })
        .catch((e) => {
          removeQueryParam()
          refreshID()
          console.log('log44', e)
        })
    } else {
      refreshID()
    }
  }, [removeQueryParam])

  const initFitbitSSO = () => {
    const redirectUri = encodeURIComponent(fitbitRedirectURI)
    const fitbitUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${fitbitClientID}&redirect_uri=${redirectUri}&scope=activity%20heartrate%20location%20oxygen_saturation%20respiratory_rate%20settings%20sleep%20temperature&expires_in=604800`
    window.location.href = fitbitUrl
  }

  return (
    <>
      <SectionTop title={'Step 2'} description={'Consent'} />
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Confirmation of Fitbit Account for Study
          </Title>
        </div>
        <div>
          <Text>We have received your Fitbit account authorisation and the Fitbit User ID is:</Text>
        </div>
        <div style={{ display: 'flex' }}>
          {id &&
            id.split('').map((item, idx) => (
              <div
                key={`${idx}${JSON.stringify(item)}`}
                className='id_number_box'
                style={{ marginLeft: idx === 0 ? 0 : '4px' }}>
                {String(item)}
              </div>
            ))}
        </div>
        <div>
          <Text>
            Do you confirm the use of Fitbit User ID mentioned as the designated Fitbit account for the study?
          </Text>
        </div>
        <div>
          <Text>Please confirm to proceed.</Text>
        </div>
        <div>
          <Text>
            If the Fitbit User ID is incorrect, please click the “Authorise Fitbit again” button and sign in with the
            correct account.
          </Text>
        </div>
        <div>
          <Text>
            You may watch the video guide below to locate your Fitbit
            user ID within your Fitbit app installed on your mobile device.
          </Text>
        </div>
        <div className='flex'>
          <div className='mobile_btn_full'>
            <Button block type='primary' ghost icon={<PlayCircleOutlined />} onClick={openVideo}>
              Play Video
            </Button>
          </div>
        </div>
      </SectionItem>
      <SectionDivider />
      <SectionBottom
        nextTitle={'Confirm'}
        extra={
          <Button block type='primary' ghost onClick={initFitbitSSO}>
            Authorise Fitbit again
          </Button>
        }
      />
    </>
  )
}

const StepTwo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { page } = useContext(OnBoardCtx)
   const [isPDFOpen, setIsPDFOpen] = useState(false)

  return (
    <>
      <PDFModal
        open={isPDFOpen}
        onCancel={() => setIsPDFOpen(false)}
        pdfSrc={pdfOne}
        pdfNameStr={`User Guide Google Authenticator`}
      />
      <VideoModal open={isOpen} onCancel={() => setIsOpen(false)} videoSrc={videoOne} />
      {page === 3 && <StepTwoPageOne />}
      {page === 4 &&<StepTwoPageTwo openVideo={() => setIsOpen(true)} setIsPDFOpen={()=> setIsPDFOpen(true)}/>}
      {page === 5 && <StepTwoPageThree openVideo={() => setIsOpen(true)} />}
    </>
  )
}

export default StepTwo
