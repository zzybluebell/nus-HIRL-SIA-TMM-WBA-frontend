import './index.scss'
import * as React from 'react'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Modal, Steps, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import LogoLight from 'src/assets/images/logo-light.svg'
import { getStepAPI, postStepAPI } from '../../api/index'
import StepFive from './components/stepFive'
import StepFour from './components/stepFour'
import StepOne from './components/stepOne'
import StepSix from './components/stepSix'
import StepThree from './components/stepThree'
import StepTwo from './components/stepTwo'
import ConfigWrapper from './configWrapper'

const { Text } = Typography

const OnBoardCtx = createContext(null)

const steps = [
  {
    title: 'Step 1',
    description: 'Introduction',
    // 1, 2
  },
  {
    title: 'Step 2',
    description: 'Consent',
    // 3, 4, 5
  },
  {
    title: 'Step 3',
    description: 'Using the Wellness Buddy Mobile App',
    // 6, 7
  },
  {
    title: 'Step 4',
    description: 'Collecting Fitbit Sense 2',
    // 8, 9
  },
  // {
  //   title: 'Step 5',
  //   description: 'Using Fitbit Sense 2 & Wellness Buddy Watch App',
  //   // 10, 11
  // },
  // 12
]

const getStep = (currentPage) => {
  if ([1, 2].includes(currentPage)) return 1
  if ([3, 4, 5].includes(currentPage)) return 2
  if ([6, 7].includes(currentPage)) return 3
  if ([8, 9].includes(currentPage)) return 4
  if ([10, 11].includes(currentPage)) return 5
  if ([12].includes(currentPage)) return 6
  return 0
}

const OnBoard = () => {
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal()

  const [step, setStep] = useState(null)
  const [page, setPage] = useState(null) // a step contains multiple pages
  const [pageExtraData, setPageExtraData] = useState({}) // extra page data

  const pageRef = useRef(null)

  const goNextPage = useCallback(
    (_page) => {
      if (page === null) return // must get page from server first

      const _valid = typeof _page === 'number' && _page > 0
      const nextPage = Number(_valid ? _page : page + 1)

      if (_valid) {
        setPage(nextPage)
        setStep(getStep(nextPage))
      } else {
        postStepAPI({ steps: nextPage })
          .then((res) => {
            // console.log('log11', res)
            if (String(res.message).includes('success')) {
              setPage(nextPage)
              setStep(getStep(nextPage))
              console.log(`log11, update next step: ${getStep(nextPage)}, next page: ${nextPage}`)
            } else {
              console.error('Error, out of step range.')
            }
          })
          .catch((e) => {
            console.log('log44', e)
          })
      }
    },
    [page, setStep, setPage]
  )

  const logOut = useCallback(() => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('code')
    sessionStorage.removeItem('is_pilot')
    navigate('/login')
  }, [navigate])

  const tryOpenApp = () => {
    // try to extract login token from query string token from SSO
    const urlParams = new URLSearchParams(window.location.search)
    const queryToken = urlParams.get('token')
    const refreshToken = urlParams.get('refresh_token')
    const position = urlParams.get('position')
    const fitbit_id = urlParams.get('fitbit_id')
    const invited = urlParams.get('invited')
    const phase = urlParams.get('phase')

    if (queryToken) {
      console.log('try open app with token: ', queryToken)
      window.location.href = `getwellnessbuddy://token?value=${encodeURIComponent(
        queryToken
      )}&refresh_token=${encodeURIComponent(refreshToken)}&position=${encodeURIComponent(
        position
      )}&fitbit_id=${encodeURIComponent(fitbit_id)}&invited=${encodeURIComponent(invited)}&phase=${encodeURIComponent(phase)}`
      // preserve query string in case need to use it later
      // navigate('/onboarding')
      return
    }
  }

  const isMobile = () => {
    return navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  }

  useEffect(() => {
    // try to extract login token from query string token from SSO
    const urlParams = new URLSearchParams(window.location.search)
    const queryToken = urlParams.get('token')
    const position = urlParams.get('position')
    if (queryToken) {
      sessionStorage.setItem('token', queryToken)
      sessionStorage.setItem('is_pilot', position === 'Pilot' ? '1' : '0') // flag for pilots
    }
  }, [])

  useEffect(() => {
    getStepAPI()
      .then((res) => {
        // console.log('log11', res)
        const _page = res.steps // API returns 'steps' which is the 'page' here
        if (_page) {
          const _step = getStep(_page)
          setPage(_page)
          setStep(_step)
          console.log(`log21, API get step: ${_step}, page: ${_page}`)
          // if (_step === 6) {
          //   tryOpenApp()
          // }
        }
      })
      .catch((e) => {
        console.log('log44', e)
        // handle not logged in
        navigate('/login')
      })
  }, [navigate])

  /**
   * Scroll to page top
   */
  useEffect(() => {
    if (!pageRef.current) return
    pageRef.current.scrollTop = 0
  }, [pageRef, page])

  return (
    <ConfigWrapper>
      {step && page && (
        <>
          <OnBoardCtx.Provider value={{ page, goNextPage, modal, logOut, pageExtraData, setPageExtraData }}>
            {contextHolder}
            <div className='bg_container'>
              <div className='card_container' ref={pageRef}>
                {/* steps */}
                <div className='card_steps_container'>
                  <div>
                    <img className='logo_light' src={LogoLight} alt='logo-light' />
                  </div>
                  <Steps
                    className='steps_pc'
                    direction='vertical'
                    current={step - 1}
                    items={steps}
                    responsive={false}
                  />
                  <Steps className='steps_mobile' current={step - 1} items={steps.map(() => ({}))} responsive={false} />
                </div>
                {/* step pages */}
                <div className='card_page_container'>
                  {step >= 3 && isMobile() && (
                    <Button block type='primary' ghost onClick={tryOpenApp} style={{ marginBottom: '24px' }}>
                      Open Wellness Buddy mobile app
                    </Button>
                  )}
                  {step === 1 && <StepOne />}
                  {step === 2 && <StepTwo />}
                  {step === 3 && <StepThree />}
                  {step === 4 && <StepFour />}
                  {step === 5 && <StepFive />}
                  {step === 6 && <StepSix />}
                </div>
                {/* footer */}
                <div className='card_footer'>
                  <div className='mobile_btn_full'>
                    <Button block type='primary' ghost onClick={logOut}>
                      Log Out
                    </Button>
                  </div>
                  <div>
                    <Text className='card_footer_text'>
                      © SIA-NUS Digital Aviation Corporate Laboratory. All Rights Reserved.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </OnBoardCtx.Provider>
        </>
      )}
    </ConfigWrapper>
  )
}

export default OnBoard
export { OnBoardCtx }
