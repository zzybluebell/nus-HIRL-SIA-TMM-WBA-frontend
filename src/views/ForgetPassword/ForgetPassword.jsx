import React, { useState } from 'react'
import './ForgetPassword.scss'
import ForgetIcon from "src/assets/images/others/pw-forgot.svg";
import { Button, Form, Input, Col, Row, message, Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { changePasswordApi, forgetPasswordApi, loginApi } from 'src/api/index'
import { LoadingOutlined } from '@ant-design/icons';

export default function ForgetPassword() {
    let navigate = useNavigate()
    const [isShow, setIsShow] = useState(false) // 切换到重置密码表单
    const [emailValue, setEmailValue] = useState('') // 用户输入的 Email
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false) // 成功弹窗
    const [loading, setLoading] = useState(false); // 全局 loading 状态

    // 1. 发送 Email 并获取验证码 (Request Code)
    const handleRequestCode = async () => {
        if (!emailValue) {
            message.error("Please enter your email address.");
            return;
        }
        setLoading(true);
        try {
            const res = await forgetPasswordApi({ email: emailValue });
            if (res) {
                message.success('Verification code sent to your email.');
                setIsShow(true); // 切换到重置密码界面
            }
        } catch (error) {
            console.error('Failed to send code:', error);
            // message.error('Failed to send verification code.');
        } finally {
            setLoading(false);
        }
    };

    // 2. 提交新密码 (Reset Password)
    const onFinish = async (values) => {
        console.log('Reset Password values:', values);
        setLoading(true);
        
        // 步骤 2.1: 先使用 email 和 code (作为密码) 进行登录获取 Token
        try {
            const loginData = {
                username: emailValue.trim(),
                password: values.code.trim() // 使用验证码作为密码进行登录
            };
            
            const loginRes = await loginApi(loginData);
            
            if (loginRes && loginRes.user_token) {
                // 登录成功，保存 Token
                sessionStorage.setItem('token', loginRes.user_token);
                
                // 步骤 2.2: 使用获取到的 Token 调用 changePasswordApi
                // changePasswordApi 需要 old_password (这里是 code) 和 new_password
                const changePasswordData = {
                    old_password: values.code.trim(),
                    new_password: values.password.trim()
                };

                const changeRes = await changePasswordApi(changePasswordData);
                
                if (changeRes) {
                    setIsSuccessModalOpen(true);
                    // 清除 Token，强制用户用新密码重新登录
                    sessionStorage.removeItem('token');
                }
            }
        } catch (error) {
            console.error('Reset password flow failed:', error);
            message.error('Failed to reset password. Please check your verification code.');
        } finally {
            setLoading(false);
        }
    };

    const BackToLoginIn = () => {
        navigate('/login')
    }

    const onChangeEmail = (e) => {
        let value = e.target.value.trim()
        setEmailValue(value)
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
      <div className='forget-password-page-bg-image'>
        <div className='forget-password-full-page'>
          <Row justify={'center'}>
            <Col xs={20} sm={20} md={20} lg={20} xl={8}>
              <div className='forget-password-page-content'>
                <Spin indicator={antIcon} spinning={loading}>
                  <div>
                    <img className='forget-password-img-fluid' src={ForgetIcon} alt='图标' />
                    <div className='forget-password-page-content-h2'>Forget Password?</div>
                    <div className='forget-password-page-content-h5'>
                      <div> Please enter your email</div>
                      <div> We will send you a verification code to help you reset your password.</div>
                    </div>
                  </div>
                  <div className='forget-password-page-content-form'>
                    {isShow ? (
                      <Form
                        name='basic'
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete='off'>
                        <Form.Item
                          name='code'
                          rules={[
                            { required: true, message: 'Please input the verification code sent to your email!' },
                          ]}>
                          <Input placeholder='Verification Code' disabled={loading} />
                        </Form.Item>

                        <Form.Item
                          name='password'
                          rules={[{ required: true, message: 'Please input your new password!' }]}>
                          <Input.Password placeholder='New Password' disabled={loading} />
                        </Form.Item>

                        <Form.Item
                          name='passwordTwo'
                          dependencies={['password']}
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your new password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'))
                              },
                            }),
                          ]}>
                          <Input.Password placeholder='Confirm New Password' disabled={loading} />
                        </Form.Item>

                        <Form.Item>
                          <Button
                            className='forget-password-button'
                            block
                            type='primary'
                            htmlType='submit'
                            loading={loading}>
                            Change Password
                          </Button>
                        </Form.Item>
                      </Form>
                    ) : (
                      <div>
                        <div>
                          {' '}
                          <Input
                            style={{ width: '100%' }}
                            placeholder='Enter Email Address'
                            onChange={onChangeEmail}
                            value={emailValue}
                            disabled={loading}
                          />
                        </div>
                        <div style={{ marginBottom: '0.5rem' }} />
                        <div style={{ marginBottom: '0.5rem' }}>
                          <Button
                            className='forget-password-button'
                            block
                            type='primary'
                            onClick={handleRequestCode}
                            loading={loading}>
                            Reset Password
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='forget-password-page-content-foot'>
                    <div className='text-muted'>
                      <div
                        className='text-muted-text'
                        onClick={!loading ? BackToLoginIn : undefined}
                        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
                        Back to Login in
                      </div>
                    </div>
                  </div>
                </Spin>
              </div>
            </Col>
          </Row>
        </div>

        <Modal
          title='Success'
          open={isSuccessModalOpen}
          footer={[
            <Button key='login' type='primary' onClick={BackToLoginIn}>
              Back to Login
            </Button>,
          ]}
          closable={false}
          maskClosable={false}>
          <p>Your password has been reset successfully.</p>
          <p>Please log in with your new password.</p>
        </Modal>
      </div>
    )
}
