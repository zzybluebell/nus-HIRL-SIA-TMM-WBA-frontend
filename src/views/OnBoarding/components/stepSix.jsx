import '../index.scss'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Button, Typography } from 'antd'
import dayjs from 'dayjs'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { getUserLastTimeSlotsAPI, postFitbitSSO, getFitbitIDAPI } from '../../../api'
import { fitbitClientID, fitbitRedirectURI } from '../../../config'
import { SectionDivider, SectionItem, SectionTop } from './section'

const { Title, Text } = Typography

const getTimeStr = (time) => {
  const date = time.split(' ')[0]
  return dayjs(date, 'YYYY-MM-DD').format('D MMM YYYY')
}

export const initFitbitSSO = () => {
  const redirectUri = encodeURIComponent(fitbitRedirectURI)
  const fitbitUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${fitbitClientID}&redirect_uri=${redirectUri}&scope=activity%20heartrate%20location%20oxygen_saturation%20respiratory_rate%20settings%20sleep%20temperature&expires_in=604800`
  window.location.href = fitbitUrl
}

const StepSixPageOne = () => {
  const [time, setTime] = useState(['', ''])
  const [fitbitID, setFitbitID] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  // API
  useEffect(() => {
    getUserLastTimeSlotsAPI()
      .then((res) => {
        console.log('log11', res)
        setTime([getTimeStr(res.participation_start_time), getTimeStr(res.participation_end_time)])
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }, [])

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

      postFitbitSSO({ code: queryCode })
        .then((res) => {
          console.log('log11, res', res)
          removeQueryParam()
        })
        .catch((e) => {
          console.log('log44', e)
        })
    }
  }, [removeQueryParam])

  // fitbit ID check
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const fitbitID = urlParams.get('fitbit_id')
    if (fitbitID) {
      setFitbitID(fitbitID)
    }
    if (!fitbitID || fitbitID === "") {
      refreshID();
    }
  }, [])

  const refreshID = () => {
    getFitbitIDAPI()
      .then((res) => {
        // console.log('log11, ', res)
        if (res.data) {
          console.log('log21, API fitbit ID', res.data)
          setFitbitID(String(res.data))
        }
      })
      .catch((e) => {
        console.log('log44', e)
      })
  }

  return (
    time.length && (
      <>
        <SectionTop title={'Onboarding Concluded'} description={'Your onboarding is now complete'} />
        {!fitbitID && (
          <>
            <SectionDivider />
            <SectionItem>
              <div>
                <Title level={5} className='section_item_title'>
                  Your Fitbit token has expired
                </Title>
              </div>
              <div>
                <Text>Please click on the 'Reauthorise Fitbit' button below to renew your authorisation.</Text>
              </div>
              <div className='flex'>
                <div className='mobile_btn_full'>
                  <Button block type='primary' ghost onClick={initFitbitSSO}>
                    Reauthorise Fitbit
                  </Button>
                </div>
              </div>
            </SectionItem>
          </>
        )}
        <SectionDivider />
        <SectionItem>
          <div>
            <Title level={5} className='section_item_title'>
              Thank you for your participation
            </Title>
          </div>
          <div>
            <Text>
              {`Your participation in this study will start on `}
              <Text style={{ fontWeight: 700 }}>{time[0] || '-'}</Text>
              {` and end on `}
              <Text style={{ fontWeight: 700 }}>{time[1] || '-'}</Text>
              {`.`}
            </Text>
          </div>
          <div>
            <Text>You may start wearing the device and complete the required tasks.</Text>
          </div>
          <div>
            <Text>
              We strongly encourage completing each task within its specified time frame to the best of your ability.
            </Text>
          </div>
          <div>
            <Text>You may be required to reauthorise your Fitbit account if you are inactive for several continuous days.</Text>
          </div>
          {/* <div>
            <Text>Participants who need to reinstall the Wellness Buddy watch app may click the link below:</Text>
          </div>
          <Link to='https://gallery.fitbit.com/details/5a832fec-bd5a-473e-b7dc-cea0e23ae574' target='_blank'>
            <Text strong underline color='#002569'>
              Watch app installation link
            </Text>
          </Link>
          <div>
            <Text>{`Alternative watch app installation `}</Text>
            <Link to='https://gallery.fitbit.com/details/5a832fec-bd5a-473e-b7dc-cea0e23ae574/openapp?key=' target='_blank'>
              <Text strong underline color='#002569'>
                link.
              </Text>
            </Link>
          </div>
          <div>
            <Text>Fitbit ID :  {fitbitID}</Text>
          </div> */}
        </SectionItem>
      </>
    )
  )
}

const StepSix = () => {
  return <StepSixPageOne />
}

export default StepSix
