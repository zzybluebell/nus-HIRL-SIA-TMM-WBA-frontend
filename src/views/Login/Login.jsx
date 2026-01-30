import './Login.scss'
import React, { useState } from 'react'
import { Button, Col, Form, Input, Modal, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import LogoLinear from 'src/assets/images/logo-light.svg'
import { loginApi } from 'src/api/index'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { isLocal, isNUS } from '../../config'
import Footer from '../Layout/Footer/Footer'

export default function Login() {
  let navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false) // 确认登录弹窗展示
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false) // 登录失败弹窗展示
  const [userRole, setUserRole] = useState('')

  const handleNavigate = (role) => {
    if (role && (role === 'RoleEnum.user' || role.includes('user'))) {
        navigate('/onboarding')
    } else {
        navigate('/layout/dashboard')
    }
  }

  const onFinish = async (values) => {
    // window.location.href = ssoURI
    console.log('登录', values);
    const newData = {
        username: values.email.trim(),
        password: values.password.trim()
    }
    try {
        const res = await loginApi(newData)
        if (res) {
            sessionStorage.setItem('token', res.user_token)
            setUserRole(res.model)
            setIsModalOpen(true);
            setTimeout(
                () => { handleNavigate(res.model) }
                , 3000)
        }
    } catch (error) {
        setIsModalLoginOpen(true)
    }
  }

  const forGetPassword = () => {
    console.log('忘记密码')
    navigate('/forgetPassword')
  }

  const handleOk = () => {
    setIsModalOpen(false)
    handleNavigate(userRole)
  }

  const handleLoginOk = () => {
    setIsModalLoginOpen(false)
  }

  return (
    <div className='login-page-bg-image'>
      <div className='login-full-page'>
        <div></div>
        <Row justify={'center'}>
          <Col xs={24} sm={20} md={20} lg={20} xl={8}>
            <div className='login-page-content'>
              <div>
                <img className='login-img-fluid' src={LogoLinear} alt='logo' />
                <div className='login-page-content-h2'>Welcome</div>
                <div className='login-page-content-h5'>Sign in to your account to continue</div>
              </div>
              <div className='login-page-content-form'>
                <Form
                  name='basic'
                  wrapperCol={{ span: 24 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  autoComplete='off'>
                  <Form.Item
                      // label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                      <Input placeholder='Email' />
                  </Form.Item>

                  <Form.Item
                      // label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                      <Input.Password placeholder='Password' />
                  </Form.Item>

                  <Form.Item style={{ margin: 0 }}>
                    <div className='float-end'>
                      <div onClick={forGetPassword} className='float-end-text'>
                        Forget Password
                      </div>
                    </div>
                    <Button
                      className='login-button'
                      block
                      type='primary'
                      htmlType='submit'
                      style={{ margin: '27px 0 43px 0' }}>
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className='login-page-content-foot'>
                {(isNUS || isLocal) && (
                  <div className='text-muted'>
                    <div
                      className='text-muted-text'
                      onClick={() => {
                        navigate('/register')
                      }}>
                      Register
                    </div>
                  </div>
                )}
                {/* <div className="text-muted">
                                    <div className="text-muted-text" onClick={() => { navigate('/register') }}>Don't have an acccount? Register</div>
                                </div> */}
                {/* <div className='text-muted'>
                  <div
                    className='text-muted-text'
                    onClick={() => {
                      navigate('/')
                    }}>
                    Want to know more about us? Go Back
                  </div>
                </div> */}
                <Footer />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Modal open={isModalOpen} centered footer={false} closable={false}>
        <div className='page-modal-conetn'>
          <div>
            <CheckCircleOutlined style={{ fontSize: '1.5rem', color: '#a5dc86', margin: '0.5rem  0' }} />
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Login Successful</div>
          <div className='page-modal-conetn-footer'>
            <Button type='primary' className='button' onClick={handleOk}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={isModalLoginOpen} centered footer={false} closable={false}>
        <div className='page-modal-conetn'>
          <div>
            <CloseCircleOutlined style={{ fontSize: '1.5rem', color: 'red', margin: '0.5rem  0' }} />
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold' }}>Login Error</div>
          <p style={{ marginBottom: '0.2rem' }}>Incorrect username or password</p>
          <div className='page-modal-conetn-footer'>
            <Button type='primary' className='button' onClick={handleLoginOk}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
