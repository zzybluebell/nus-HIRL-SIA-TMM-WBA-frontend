import '../index.scss'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Alert, Button, Checkbox, Typography } from 'antd'
import { Link } from 'react-router-dom'
import LogoHub from 'src/assets/images/img/logo_hub.jpg'
import videoOne from 'src/assets/images/video/1 - Set up tracker.mp4'
import videoThree from 'src/assets/images/video/3 - Watch app install.mp4'
import videoTwo from 'src/assets/images/video/4 - How to use.mp4'
import pdfOne from 'src/assets/pdf/User-Guide-Watch.pdf'
import { FilePdfOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { getFitbitIDAPI, postPvtStateAPI } from '../../../api'
import { OnBoardCtx } from '../index'
import { PDFModal, VideoModal } from './modal'
import { SectionBottom, SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const StepFivePageOne = ({ openVideo }) => {
  return (
    <>
      <SectionTop title={'Step 5'} description={'Using Fitbit Sense 2 & Wellness Buddy Watch App'} />
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Setting up the Fitbit Sense 2
          </Title>
        </div>
        <div>
          <Text>
            Please cater 5-10 mins (depending on connectivity) to set up Fitbit Sense 2. For pilots, please pair the
            Fitbit watch with your device. For cabin crew, please pair the Fitbit watch with your mobile device.
          </Text>
        </div>
        <div>
          <Text>Explore and learn how to pair your Fitbit Sense 2 in our instructional video.</Text>
        </div>
        <div className='flex'>
          <div className='mobile_btn_full'>
            <Button block type='primary' ghost icon={<PlayCircleOutlined />} onClick={openVideo[0]}>
              Play Video
            </Button>
          </div>
        </div>{' '}
      </SectionItem>
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            How to use Fitbit Sense 2
          </Title>
        </div>
        <div>
          <Text>
            Before using the Wellness Buddy watch app, acquaint yourself with the Fitbit Sense 2. You can locate the
            user guide for the Fitbit Sense 2 within the Fitbit mobile app.
          </Text>
        </div>
        <div className='flex'>
          <div className='mobile_btn_full'>
            <Button block type='primary' ghost icon={<PlayCircleOutlined />} onClick={openVideo[1]}>
              Play Video
            </Button>
          </div>{' '}
        </div>
      </SectionItem>
      <SectionDivider />
      <SectionBottom />
    </>
  )
}

const StepFivePageTwo = ({ openPDF, openVideo }) => {
  const _isPilot = sessionStorage.getItem('is_pilot') === '1'

  const { goNextPage } = useContext(OnBoardCtx)

  const [isAlertShown, setIsAlertShown] = useState(null)
  const [id, setID] = useState(null)
  const [enableNext, setEnableNext] = useState(!_isPilot)
  const [enableNextTwo, setEnableNextTwo] = useState(!_isPilot)

  useEffect(() => {
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
  }, [])

  const nextAction = () => {
    postPvtStateAPI({
      device: 'watch',
    })
      .then((res) => {
        // console.log('log11, ', res)
        if (res.status !== undefined) {
          if (res.status) {
            setIsAlertShown(false)
            setTimeout(() => {
              goNextPage()
            }, 500)
          } else {
            setIsAlertShown(true)
          }
        }
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }

  return (
    <>
      <SectionTop title={'Step 5'} description={'Using Fitbit Sense 2 & Wellness Buddy Watch App'} />
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Installing Fitbit App through the iOS app store or Goolge play store
          </Title>
        </div>
        <div className='section_columns'>
          {/* text */}
          <div>
            <Text>
              {_isPilot
                ? `For pilots, you do not need to install the Wellness Buddy watch app as you will be doing the recurring tasks on your device. However, you will still be required to install and log in the Fitbit app downloaded from the MDM store (right) in order to allow syncing of data.`
                : `You will be required to install and log in the Fitbit app downloaded from the MDM store (right) in order
              to allow syncing of data.`}
            </Text>
            <Text strong>{` Please do not install the Fitbit app from Google Play Store or Apple App Store.`}</Text>
            {_isPilot && (
              <div style={{ marginTop: '12px' }}>
                <Text strong>{`Please ensure that the Fitbit watch is paired with your iPad.`}</Text>
              </div>
            )}
          </div>
          {/* logo */}
          <div>
            <img className='section_img' src={LogoHub} alt='logo_hub' />
          </div>
        </div>
        {_isPilot && (
          <>
            <div>
              <Checkbox
                onChange={() => {
                  setEnableNext((v) => !v)
                }}>
                {`I have installed the Fitbit app from the MDM store and logged in my Fitbit account`}
              </Checkbox>
            </div>
            <div>
              <Checkbox
                onChange={() => {
                  setEnableNextTwo((v) => !v)
                }}>
                {`I have paired the Fitbit watch with my iPad`}
              </Checkbox>
            </div>
          </>
        )}
      </SectionItem>
      {!_isPilot && (
        <>
          <SectionDivider />
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                How to install the Wellness Buddy Watch App
              </Title>
            </div>
            <div>
              <Text>
                {`Please watch the following video to learn how to install and use the Wellness Buddy watch app on your Fitbit Sense 2. `}
              </Text>
            </div>
            <div>
              <Text>{`Click on `}</Text>
              <Link to='https://gallery.fitbit.com/details/5a832fec-bd5a-473e-b7dc-cea0e23ae574' target='_blank'>
                <Text strong underline color='#002569'>
                  this link
                </Text>
              </Link>
              <Text>{` to install the watch app. `}</Text>
            </div>
            <div>
              <Text>{`Alternatively, you may click on `}</Text>
              <Link to='https://gallery.fitbit.com/details/5a832fec-bd5a-473e-b7dc-cea0e23ae574/openapp?key=' target='_blank'>
                <Text strong underline color='#002569'>
                  this link
                </Text>
              </Link>
              <Text>{` if the link above does not display the ‘OPEN APP’ button. `}</Text>
            </div>
            <div>
              <Text>{`Please input your Fitbit ID: `}</Text>
              <Text strong>{`${id}`}</Text>
              <Text>{` in the Fitbit app `}</Text>
              <Text strong>{`before proceeding with the Validation of Wellness Buddy Account.`}</Text>
            </div>
            <div className='flex'>
              <div className='mobile_btn_full'>
                <Button block type='primary' ghost icon={<PlayCircleOutlined />} onClick={openVideo}>
                  Play Video
                </Button>
              </div>{' '}
            </div>
          </SectionItem>
          <SectionDivider />
          {isAlertShown && (
            <Alert
              className='alert_wrapper alert_warning'
              message={`Completion record not found, please try again.`}
              type='warning'
              showIcon
            />
          )}
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                Validation of Wellness Buddy Account
              </Title>
            </div>
            <div>
              <Text>{`Please complete `}</Text>
              <Text strong>1 Fatigue Questionnaire</Text>
              <Text>{` and `}</Text>
              <Text strong>1 Psychomotor Vigilance Task (PVT)</Text>
              <Text>{` using the Wellness Buddy Watch App to validate Wellness Buddy account.`}</Text>
            </div>
            <div>
              <Text>
                After completing the required tasks, please click ‘Sync Data’ in the Wellness Buddy watch app and click ‘Update’ in the Fitbit mobile app. Subsequently, click ‘I’ve completed this’ to complete the onboarding.
              </Text>
            </div>
          </SectionItem>
          <SectionDivider />
          <SectionItem>
            <div>
              <Title level={5} className='section_item_title'>
                User Guide on Wellness Buddy Watch App
              </Title>
            </div>
            <div>
              <Text>Download a copy of the user guide to learn how to use the Wellness Buddy Watch App.</Text>
            </div>
            <div className='flex'>
              <div className='mobile_btn_full'>
                <Button block type='primary' ghost icon={<FilePdfOutlined />} onClick={openPDF}>
                  View PDF
                </Button>
              </div>
            </div>
          </SectionItem>
        </>
      )}
      <SectionDivider />
      <SectionBottom nextTitle='I’ve completed this' nextAction={nextAction} disabled={!enableNext || !enableNextTwo} />
    </>
  )
}

const StepFive = () => {
  const { page } = useContext(OnBoardCtx)

  const [isOpenOne, setIsOpenOne] = useState(false)
  const [isOpenTwo, setIsOpenTwo] = useState(false)
  const [isOpenThree, setIsOpenThree] = useState(false)
  const [isPDFOpen, setIsPDFOpen] = useState(false)

  return (
    <>
      <PDFModal
        open={isPDFOpen}
        onCancel={() => setIsPDFOpen(false)}
        pdfSrc={pdfOne}
        pdfNameStr={`User Guide Watch App.pdf`}
      />
      <VideoModal open={isOpenOne} onCancel={() => setIsOpenOne(false)} videoSrc={videoOne} />
      <VideoModal open={isOpenTwo} onCancel={() => setIsOpenTwo(false)} videoSrc={videoTwo} />
      <VideoModal open={isOpenThree} onCancel={() => setIsOpenThree(false)} videoSrc={videoThree} />
      {page === 10 && (
        <StepFivePageOne openVideo={[() => setIsOpenOne(true), () => setIsOpenTwo(true), () => setIsOpenThree(true)]} />
      )}
      {page === 11 &&  <StepFivePageTwo openPDF={() => setIsPDFOpen(true)} openVideo={() => setIsOpenThree(true)} />}
    </>
  )
}

export default StepFive
