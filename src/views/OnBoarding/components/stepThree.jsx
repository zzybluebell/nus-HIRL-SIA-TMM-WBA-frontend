import '../index.scss'
import * as React from 'react'
import { useContext, useState } from 'react'
import { Alert, Button, Typography ,Checkbox } from 'antd'
import LogoHub from 'src/assets/images/img/logo-hub.png'
import AndroidQRCode from 'src/assets/images/img/android_qr_code.png'
import OPEN_WELLNESS_BUDDY_APP from 'src/assets/images/img/open_wellness_buddy_app.png'
import pdfOne from 'src/assets/pdf/User-Guide-Mobile.pdf'
import { FilePdfOutlined } from '@ant-design/icons'
import { postPvtStateAPI } from '../../../api'
import { OnBoardCtx } from '../index'
import { PDFModal } from './modal'
import { SectionBottom, SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const StepThreePageOne = ({change , checked}) => {



  return (
    <>
      <SectionTop title={'Step 3'} description={'Using the Wellness Buddy Mobile App'} />
      {/* <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Install the Wellness Buddy mobile app
          </Title>
        </div>
        <div>
          <Text>
            Please ensure that you have downloaded and installed the Wellness Buddy mobile app from the MDM store, found
            in the MDM mobile app on approved mobile devices. For pilots, you are highly encouraged to download the app
            on your iPad.
          </Text>
        </div>
      </SectionItem> */}
      <SectionDivider />
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            Install the Wellness Buddy mobile app
          </Title>
        </div>
        <div className='section_columns_qr'>
          {/* text */}
          <div>
            <Text>
              Please ensure that you have downloaded and installed the Wellness Buddy mobile app from the app store or
              google play store (right).
            </Text>
          </div>
          {/* logo */}
          {/* <div>
            <img className='section_img ' src={LogoHub} alt='logo_hub' />
          </div> */}
          {/* qr code */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 600 }}>iOS</Text>
            <img className='section_img' src={AndroidQRCode} alt='ios_qr_code' style={{ width: '100%', height: 'auto' }} />
          </div>
          {/* qr code */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 600 }}>Android</Text>
            <img className='section_img' src={AndroidQRCode} alt='android_qr_code' style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </SectionItem>
      <SectionDivider />
      <SectionItem>
        <div className='section_columns_2'>
          <div>
            <Text className='section_columns_2_Text'>
              When prompted what to open the Wellness Buddy mobile app with, please select browser (if appeals) instead
              of the app.
            </Text>
          </div>
          {/* logo */}
          {/* <div>
            <img src={SSO_IMG} alt='sso_img' />
          </div> */}
        </div>
      </SectionItem>
      <SectionDivider />
      {/* <SectionItem> */}
      {/* <div className='section_columns'>
          <div>
            <Text>
              Click on the 9 dots at the top right corner of the screen (iPad) or bottom centre of the screen (phone).
              Ensure that desktop mode is <Text strong>not</Text> enabled.
            </Text>
          </div>
          <div>
            <img src={NINE_DOTS} alt='nine_dots' />
          </div>
        </div> */}
      {/* <div className='section_columns_2'>
          <div></div>
          <div>
            <img src={DESKTOP_IMG} alt='enable_desktop_mode' />
          </div>
        </div> */}
      {/* </SectionItem> */}
      <SectionItem>
        {/* <div className='section_columns_2'>
          <div>
            <Text>
              To open the Wellness Buddy mobile app, tap on the &#39;Open Wellness Buddy mobile app&#39; button in the desktop mode.
            </Text>
          </div>
          <div>
            <img src={OPEN_WELLNESS_BUDDY_APP} alt='open_wellness_buddy_app' />
          </div>
        </div> */}
        <Checkbox checked={checked} onChange={change}>
          I acknowledge the above instructions
        </Checkbox>
      </SectionItem>
      <SectionBottom disabled={!checked} />
    </>
  )
}

const StepThreePageTwo = ({ openPDF }) => {
  const [isAlertShown, setIsAlertShown] = useState(null)
  const { goNextPage } = useContext(OnBoardCtx)

  const nextAction = () => {
    postPvtStateAPI({
      device: 'app',
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
      <SectionTop title={'Step 3'} description={'Using the Wellness Buddy Mobile App'} />
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
          <Text strong style={{ fontWeight: 700 }}>
            1 Fatigue Questionnaire
          </Text>
          <Text>{` and `}</Text>
          <Text strong>1 Psychomotor Vigilance Task (PVT)</Text>
          <Text>{` using the Wellness Buddy Mobile App to validate Wellness Buddy account.`}</Text>
        </div>
        <div>
          <Text>
            Step 4 will be available when the required tasks are completed in the Wellness Buddy Mobile App. Please
            click on "I've completed this" after completing the 2 validation tests.
          </Text>
        </div>
      </SectionItem>
      <SectionDivider />
      {/* <SectionItem>
        <div className='section_columns'>
          <div>
              <Text>
                Click on the 9 dots at the top right corner of the screen (iPad) or bottom centre of the screen (phone). Ensure that desktop mode is <Text strong>not</Text> enabled.
              </Text>
          </div>
          <div>
              <img src={NINE_DOTS} alt='nine_dots' />
          </div>
        </div>
        <div className='section_columns_2'>
          <div></div>
          <div>
              <img src={DESKTOP_IMG} alt='enable_desktop_mode' />
          </div>
        </div>
        </SectionItem>
        <SectionItem>
        <div className='section_columns_2'>
          <div>
              <Text>
                To open the Wellness Buddy mobile app, tap on the &#39;Open Wellness Buddy mobile app&#39; button.
              </Text>
          </div>
          <div>
              <img src={OPEN_WELLNESS_BUDDY_APP} alt='open_wellness_buddy_app' />
          </div>
        </div>
      </SectionItem> */}
      {/* <SectionDivider /> */}
      <SectionItem>
        <div>
          <Title level={5} className='section_item_title'>
            User guide on Wellness Buddy mobile app
          </Title>
        </div>
        <div>
          <Text>Download a copy of the user guide to learn how to use the Wellness Buddy mobile app.</Text>
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
      <SectionBottom nextTitle='I’ve completed this' nextAction={nextAction} />
    </>
  )
}

const StepThree = () => {
  const { page } = useContext(OnBoardCtx)
  const [checked_acknoledgment, setChecked] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false)


  const onChangeAcknoledgement = (e) => {
    setChecked(e.target.checked);
  };



  return (
    <>
      <PDFModal
        open={isPDFOpen}
        onCancel={() => setIsPDFOpen(false)}
        pdfSrc={pdfOne}
        pdfNameStr={`User Guide Mobile App.pdf`}
      />
      {page === 6 && <StepThreePageOne change={onChangeAcknoledgement} checked={checked_acknoledgment} />}
      {page === 7 && <StepThreePageTwo openPDF={() => setIsPDFOpen(true)} />}
    </>
  )
}

export default StepThree
