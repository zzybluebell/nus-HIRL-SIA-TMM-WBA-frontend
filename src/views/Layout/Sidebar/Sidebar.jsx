import React, { useEffect, useState } from 'react'
import './Sidebar.scss'
import LogoLinear from 'src/assets/images/logo-linear.svg'
import { useNavigate } from 'react-router-dom'
import withRouter from 'src/utils/withRouter'
import {
  CloseOutlined,
  CodepenOutlined,
  TeamOutlined,
  FlagOutlined,
  StockOutlined,
  CoffeeOutlined,
  ShoppingOutlined,
  TabletOutlined,
  HistoryOutlined,
  CalendarOutlined,
  BarcodeOutlined,
  SmileOutlined,
  LockOutlined,
} from '@ant-design/icons'

function Sidebar(props) {
  let navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('dashboard')
  const { lateral } = props // 在宽屏模式下菜单栏是否缩略
  const [innerWidth, setInnerWidth] = useState('') // 窗口宽度

  const newStr = props.location.pathname.split('/').pop()

  useEffect(() => {
    setActiveKey(newStr)
    /* 如果你的副作用没有使用任何依赖，只是单纯的做没有赋值或者调用接口的操作，可以使用空数组，但是如果你的副作用直接或者间接使用了外部的变量，那么你就需要给useEffect的第二个参数传入依赖值，这样可以减少错误的发生，保证数据每次更新时都能获取到 */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStr])

  useEffect(() => {
    const handleWindowResize = () => {
      setInnerWidth(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const getWindowSize = () => {
    const { innerWidth } = window
    return innerWidth
  }

  // 菜单触发缩略
  const getLateral = () => {
    // 区分屏幕宽度的
    if (+innerWidth > 992) {
      props.trigger()
    } else {
      props.triggerMin()
    }
  }

  // 菜单跳转
  const togatePage = (e) => {
    setActiveKey(e)
    const src = '/layout/' + e
    navigate(src)

    if (innerWidth < 992) {
      props.triggerMin()
    }
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        {lateral ? (
          <div className='sidebar-close' onClick={() => getLateral()}>
            <CloseOutlined style={{ fontSize: '0.4rem' }} />
          </div>
        ) : (
          <>
            <div onClick={() => togatePage('dashboard')} className='sidebar-brand'>
              <img className='img-lg' src={LogoLinear} alt='图标' />
            </div>
            <div className='sidebar-toggler not-active' onClick={() => getLateral()}>
              <span />
              <span />
              <span />
            </div>
          </>
        )}
      </div>
      <div className='sidebar-body'>
        <ul className='nav'>
          {/* <li className='nav-item nav-category'>{lateral ? <span className='span-point' /> : 'Main'}</li> */}
          <li className='nav-item'>
            <div
              onClick={() => togatePage('dashboard')}
              className={`nav-link ${activeKey === 'dashboard' ? 'active' : ''}`}>
              <i className='link-icon'>
                <CodepenOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Dashboard</span>}
            </div>
          </li>
          <li className='nav-item nav-category'>{lateral ? <span className='span-point' /> : 'Data - Health'}</li>
          <li className='nav-item'>
            <div onClick={() => togatePage('user')} className={`nav-link ${activeKey === 'user' ? 'active' : ''}`}>
              <i className='link-icon'>
                <TeamOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>User</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div onClick={() => togatePage('sleep')} className={`nav-link ${activeKey === 'sleep' ? 'active' : ''}`}>
              <i className='link-icon'>
                <HistoryOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Sleep</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('exercise')}
              className={`nav-link ${activeKey === 'exercise' ? 'active' : ''}`}>
              <i className='link-icon'>
                <FlagOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Exercise</span>}
            </div>
          </li>

          <li className='nav-item'>
            <div
              onClick={() => togatePage('healthMetrics')}
              className={`nav-link ${activeKey === 'healthMetrics' ? 'active' : ''}`}>
              <i className='link-icon'>
                <StockOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Health Metrics</span>}
            </div>
          </li>

          <li className='nav-item nav-category'>{lateral ? <span className='span-point' /> : 'Data - Test'}</li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('fatigue')}
              className={`nav-link ${activeKey === 'fatigue' ? 'active' : ''}`}>
              <i className='link-icon'>
                <CoffeeOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Fatigue</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('workload')}
              className={`nav-link ${activeKey === 'workload' ? 'active' : ''}`}>
              <i className='link-icon'>
                <ShoppingOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Workload</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('wellbeing')}
              className={`nav-link ${activeKey === 'wellbeing' ? 'active' : ''}`}>
              <i className='link-icon'>
                <SmileOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Wellbeing</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div onClick={() => togatePage('pvt')} className={`nav-link ${activeKey === 'pvt' ? 'active' : ''}`}>
              <i className='link-icon'>
                <TabletOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>PVT</span>}
            </div>
          </li>
          <li className='nav-item nav-category'>{lateral ? <span className='span-point' /> : 'Utilities'}</li>
          {/* <li className='nav-item'>
            <div
              onClick={() => togatePage('notifyUsers')}
              className={`nav-link ${activeKey === 'notifyUsers' ? 'active' : ''}`}>
              <i className='link-icon'>
                <MailOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Notify Users</span>}
            </div>
          </li> */}
          <li className='nav-item'>
            <div
              onClick={() => togatePage('onBoardingSession')}
              className={`nav-link ${activeKey === 'onBoardingSession' ? 'active' : ''}`}>
              <i className='link-icon'>
                <CalendarOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>On-Boarding Session</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('whitelist')}
              className={`nav-link ${activeKey === 'whitelist' ? 'active' : ''}`}>
              <i className='link-icon'>
                <LockOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Whitelist</span>}
            </div>
          </li>
          <li className='nav-item'>
            <div
              onClick={() => togatePage('collection')}
              className={`nav-link ${activeKey === 'collection' ? 'active' : ''}`}>
              <i className='link-icon'>
                <BarcodeOutlined style={{ fontSize: '0.3rem' }} />
              </i>
              {lateral ? '' : <span className='link-title'>Collection</span>}
            </div>
          </li>
          {/* <li className="nav-item nav-category">{lateral ? <span className='span-point' /> : 'Reports'}</li>
                    <li className="nav-item">
                        <div onClick={() => togatePage("schedule")}
                            className={`nav-link ${activeKey === 'schedule' ? 'active' : ''}`}
                        >
                            <i className="link-icon"> <CalendarOutlined style={{ fontSize: '0.3rem' }} /></i>
                            {lateral ? '' : <span className="link-title">Schedule</span>}
                        </div>
                    </li> */}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Sidebar)
