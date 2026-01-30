import './Home.scss'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import videoThree from 'src/assets/images/video/1 - Set up tracker.mp4'
import videoTwo from 'src/assets/images/video/2 - Locating user ID.mp4'
import videoOne from 'src/assets/images/video/2023_10_20 Draft v4.mp4'
import videoFour from 'src/assets/images/video/3 - Watch app install.mp4'
import videoFive from 'src/assets/images/video/4 - How to use.mp4'
import pdfOne from 'src/assets/pdf/NUS-IRB-2020-255_PISCF_Summary.pdf'
import pdfTwo from 'src/assets/pdf/User-Guide-Mobile.pdf'
import pdfThree from 'src/assets/pdf/User-Guide-Watch.pdf'
import pdfCabinCrew from 'src/assets/pdf/Reference_Guide_Cabin_Crew_v1.5.pdf'
import pdfPilot from 'src/assets/pdf/Reference_Guide_Pilot_v1.4.pdf'
import ParticipantInformationPhase2 from 'src/assets/pdf/NUS-IRB-2020-255_2025-05-22_PISCF_Summary.pdf'
import referenceGuidePhase2 from 'src/assets/pdf/Reference_Guide_Validation_2025.pdf'
import {
  CheckCircleOutlined, EnvironmentOutlined, FilePdfOutlined, HeartOutlined, MediumOutlined, MenuUnfoldOutlined,
  PlayCircleOutlined, SendOutlined, TabletOutlined, WifiOutlined,
} from '@ant-design/icons'
import packageInfo from '../../../package.json'
import Privacy from '../Privacy/Privacy'

const { version } = packageInfo

export default function Home() {
  let navigate = useNavigate()
  const [activeid, setActiveid] = useState('Home')
  const [scrollTop, setScrollTop] = useState(0)
  const [innerWidth, setInnerWidth] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showLeftNav, setShowLeftNav] = useState(false)
  const [isSendOpen, setIsSendOpen] = useState(false)

  useEffect(() => {
    document.getElementById('pagecontent').addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  // 初次加载时对布局进行判断
  useEffect(() => {
    handleWindowResize()
  })

  const scrollView = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    setActiveid(id)
    closeNav()
  }

  const closeNav = () => {
    setShowLeftNav(false)
  }

  const handleScroll = () => {
    let temp = document.getElementById('pagecontent').scrollTop
    setScrollTop(temp)
  }

  const handleWindowResize = () => {
    const { innerWidth } = window
    if (innerWidth > 1000) {
      setInnerWidth(true)
    } else {
      setInnerWidth(false)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  // const onSendMessage = () => {
  //   const _select = document.getElementById('subject')
  //   const subject = _select.options[_select.selectedIndex].value
  //   const firstName = document.getElementById('first_name').value
  //   const lastName = document.getElementById('last_name').value
  //   const content = document.getElementById('content').value
  //   const mailToURL = `mailto:${encodeURIComponent('wellness_study@singaporeair.com.sg')}?subject=${encodeURIComponent(
  //     subject
  //   )} from ${firstName} ${lastName}&body=${content}`

  //   window.open(mailToURL, '_blank') // only works on devices that has default email apps
  // }

  return (
    <div className='home-page page-center'>
      <div className='home-page-content' id='pagecontent'>
        <div className={`topbar ${scrollTop > 700 ? 'absoult' : ''}`}>
          <div className='left-logo'></div>
          {innerWidth ? (
            <Fragment>
              <div className='middle-nav clearfix'>
                <div className={`bar ${activeid === 'Home' ? 'active' : ''}`} onClick={() => scrollView('Home')}>
                  Home
                </div>
                <div className={`bar ${activeid === 'About' ? 'active' : ''}`} onClick={() => scrollView('About')}>
                  About
                </div>
                <div
                  className={`bar ${activeid === 'Eligibility' ? 'active' : ''}`}
                  onClick={() => scrollView('Eligibility')}>
                  Eligibility
                </div>
                <div className={`bar ${activeid === 'Contact' ? 'active' : ''}`} onClick={() => scrollView('Contact')}>
                  Contact
                </div>
                <div
                  className={`bar ${activeid === 'learn_more' ? 'active' : ''}`}
                  onClick={() => scrollView('learn_more')}>
                  Learn More
                </div>
              </div>
              <div className='right-Register'>
                <Button className='registerBtn fr' onClick={() => navigate('/login')}>
                  Log In
                </Button>
              </div>
            </Fragment>
          ) : (
            <MenuUnfoldOutlined className='right-Register-icon' onClick={() => setShowLeftNav(true)} />
          )}
        </div>

        <div className='container' id='Home'>
          <div className='h2'>RESEARCH STUDY</div>
          <div className='h1' style={{ margin: '0 20px 20px 20px', textAlign: 'center' }}>
            Wellness Buddy
          </div>
          <Button className='Learn-More' onClick={() => scrollView('About')}>
            LEARN MORE
          </Button>
        </div>
        <div className='purpose' id='About'>
          <div className='purpose-in'>
            <div className='title'>Purpose</div>
            <div className='content-desc'>
              The goal of this study is to develop for SIA a novel fatigue modelling and prediction model with
              consideration of individual heterogeneity and complex interactions that exist among fatigue factors to
              provide more accurate fatigue predictions and to enhance pilot and cabin crew safety and well-being while
              upholding levels of performance.
            </div>
            <Row gutter={12}>
              <Col xl={12} lg={12} md={12} sm={24}>
                <div className='h4'>What You Will Be Doing</div>
                <div className='unordered-list'>
                  <p className='pdian'>Use a mobile app designed by the research team.</p>
                  <p className='pdian'>Use a Fitbit Sense 2 provided by the research team.</p>
                  <p className='pdian'>Attend one on-boarding session.</p>
                  <p className='pdian'>Complete surveys &amp; tests during the research study.</p>
                </div>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24}>
                <div className='h4'>Reimbursement</div>
                <p>
                  You will get to keep the Fitbit Sense 2 as a token of appreciation upon completion of all the
                  requirements at the end of the study period.
                </p>
              </Col>
            </Row>
          </div>
        </div>
        <div className='eligibility' id='Eligibility'>
          <div className='eligibility-in'>
            <div className='title'>Eligibility</div>
            <div className='content-desc'>
              If you meet the following criteria, we welcome you to join our research study.
            </div>
            <Row gutter={12}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <SendOutlined />
                  </div>
                  <div className='right'>
                    <div className='right-top'>Current Staff</div>
                    <div className='right-bottom'>Pilots / Cabin Crews</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <WifiOutlined />
                  </div>
                  <div className='right'>
                    <div className='right-top'>Access to Mobile Data or Wi-Fi</div>
                    <div className='right-bottom'>On your smartphone</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <TabletOutlined />
                  </div>
                  <div className='right'>
                    <div className='right-top'>Own a Smartphone</div>
                    <div className='right-bottom'>Running at least iOS 14 or Android 8</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <HeartOutlined />
                  </div>
                  <div className='right'>
                    <div className='right-top'>Interest to Improve Overall Wellness</div>
                    <div className='right-bottom'>For yourself and your colleagues</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className='get-in-touch' id='Contact'>
          <div className='get-in-touch-in'>
            <div className='title'>Get In Touch</div>
            <div className='content-desc'>We look forward hearing from you.</div>
            <Row gutter={24}>
              {/* <Col xl={12} lg={12} md={12} sm={24}>
                                <Row gutter={24}>
                                    <Col xl={12} lg={12} md={12} sm={24}>
                                        <input placeholder='First Name' className='send-input' type="text" id="first_name" />
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24}>
                                        <input placeholder='Last Name' className='send-input' type="text" id="last_name" />
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24}>
                                        <input placeholder='Email Address' className='send-input' type="text" />
                                    </Col>
                                    <Col xl={12} lg={12} md={12} sm={24}>
                                        <select name="" id="subject" className='send-select'>
                                            <option value="Question">Question</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </Col>
                                    <Col xl={24} lg={24} md={24} sm={24}>
                                        <textarea className='send-textarea' placeholder='Message' name="" id="content" rows="8"></textarea>
                                    </Col>
                                </Row>
                            </Col> */}
              <Col xl={12} lg={12} md={12} sm={24}>
                <div className='send-right'>
                  <div className='send-right-section'>
                    <div className='left-icon'>
                      <EnvironmentOutlined />
                    </div>
                    <div className='right'>
                      <div className='right-top'>SIA-NUS Digital Aviation Corporate Laboratory</div>
                      <div>Innovation 4.0</div>
                      <div>3 Research Link, #05-03</div>
                      <div>Singapore 117602</div>
                      <div className='right-bottom'>National University of Singapore</div>
                    </div>
                  </div>
                  <div className='send-right-section'>
                    <div className='left-icon'>
                      <MediumOutlined />
                    </div>
                    <div className='right'>
                      <div className='right-top'>Support Contact</div>
                      <div className='right-bottom'>fatigue_study@singaporeair.com.sg</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {/* <Button className='send-message' block onClick={() => onSendMessage()}>
                            Send message
                        </Button> */}
          </div>
        </div>
        <div className='eligibility' id='learn_more'>
          <div className='eligibility-in'>
            <div className='title'>Learn More</div>
            <div className='content-desc'>Click to download related resources about this study.</div>
            <Row gutter={12}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={referenceGuidePhase2} download>
                      Reference Guide – Data Validation Study (Phase 1)
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={ParticipantInformationPhase2} download>
                      Participant Information ( Phase 1 )
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <PlayCircleOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={videoOne} download>
                      Introduction
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <PlayCircleOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={videoTwo} download>
                      Locating User ID
                    </a>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <PlayCircleOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={videoThree} download>
                      Setting Up Fitbit Sense 2
                    </a>
                  </div>
                </div>
              </Col>
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <PlayCircleOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={videoFour} download>
                      Install the Wellness Buddy Watch App
                    </a>
                  </div>
                </div>
              </Col> */}
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <PlayCircleOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={videoFive} download>
                      How to Use Fitbit Sense 2
                    </a>
                  </div>
                </div>
              </Col>
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfOne} download>
                      Participant Information
                    </a>
                  </div>
                </div>
              </Col> */}
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfTwo} download>
                      User Guide on Wellness Buddy Mobile App
                    </a>
                  </div>
                </div>
              </Col>
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfThree} download>
                      User Guide on Wellness Buddy Watch App
                    </a>
                  </div>
                </div>
              </Col> */}
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfPilot} download>
                    Reference Guide – Pilot – Data Collection Study (Phase 1)
                    </a>
                  </div>
                </div>
              </Col> */}
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfCabinCrew} download>
                    Reference Guide – Cabin Crew – Data Collection Study (Phase 1)
                    </a>
                  </div>
                </div>
              </Col> */}
              {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div className='eligibility-content'>
                  <div className='left-icon'>
                    <FilePdfOutlined />
                  </div>
                  <div className='right-center'>
                    <a href={pdfCabinCrewIntervention} download>
                    Reference Guide – Cabin Crew – Intervention Study (Phase 2)
                    </a>
                  </div>
                </div>
              </Col> */}
            </Row>
          </div>
        </div>
        <div className='footer'>
          <div className='wellness'>© 2023 Wellness Buddy. v{version}</div>
          <div className='project'>
            A Project by{' '}
            <a href='https://siacorplab.nus.edu.sg/' target='_blank' rel='noreferrer'>
              {' '}
              SIA-NUS Digital Aviation Corporate Laboratory
            </a>
          </div>
          <div
            onClick={() => {
              setIsModalOpen(true)
            }}
            className='privacy'>
            Privacy Policy
          </div>
        </div>
      </div>
      {/* <div className='home-left-nav' > */}
      <div className={`home-left-nav ${showLeftNav ? 'showLeftNavo' : ''}`}>
        <div className={`home-left-nav-left  ${showLeftNav ? 'showLeftNavi' : ''}`}>
          <div className='home-left-nav-top'>
            <div className='home-left-nav-top-close' onClick={() => closeNav()}>
              X
            </div>
          </div>
          <div className='home-left-nav-middle'>
            <div
              className={`home-left-nav-middle-sub ${activeid === 'Home' ? 'active' : ''}`}
              onClick={() => scrollView('Home')}>
              Home
            </div>
            <div
              className={`home-left-nav-middle-sub ${activeid === 'About' ? 'active' : ''}`}
              onClick={() => scrollView('About')}>
              About
            </div>
            <div
              className={`home-left-nav-middle-sub ${activeid === 'Eligibility' ? 'active' : ''}`}
              onClick={() => scrollView('Eligibility')}>
              Eligibility
            </div>
            <div
              className={`home-left-nav-middle-sub ${activeid === 'Contact' ? 'active' : ''}`}
              onClick={() => scrollView('Contact')}>
              Contact
            </div>
            <div
              className={`home-left-nav-middle-sub ${activeid === 'learn_more' ? 'active' : ''}`}
              onClick={() => scrollView('learn_more')}>
              Learn More
            </div>
          </div>
          <div className='home-left-nav-bottom'>
            <Button className='registerBtn' onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title={null}
        width={1000}
        wrapClassName={'privacyModal'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        cancelText='CLOSE'
        footer={
          <Button className='' onClick={handleOk}>
            CLOSE
          </Button>
        }>
        <Privacy />
      </Modal>

      <Modal open={isSendOpen} centered footer={false} closable={false}>
        <div className='home-page-modal-conetn'>
          <div>
            <CheckCircleOutlined style={{ fontSize: '1.5rem', color: '#a5dc86', margin: '0.5rem  0' }} />
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>Send Success</div>
          <div className='home-page-modal-conetn-footer'>
            <Button type='primary' className='button' onClick={() => setIsSendOpen(false)}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
