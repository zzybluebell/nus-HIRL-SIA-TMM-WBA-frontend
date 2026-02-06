import React, { useState } from 'react'
import './Register.scss'
import ForgetIcon from "src/assets/images/others/acc-create.svg";
import { Button, Form, Input, Col, Row, message, Select, Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerApi, confirmEmailApi, loginApi } from 'src/api/index'
import { LoadingOutlined } from '@ant-design/icons';

export default function Register() {
    let navigate = useNavigate()
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [department, setDepartment] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const ageOptions = [];
    for (let i = 20; i < 70; i += 5) {
        ageOptions.push({ label: `${i} - ${i + 4}`, value: `${i}-${i + 4}` });
    }

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const departmentOptions = ['AOD', 'SINHUB', 'TMM', 'ENG', 'CCS', 'CCC'].map(item => ({ label: item, value: item }));
    
    const sectionOptionsMap = {
        'AOD': [
            'Premium Services Manager (PSM)',
            'Premium Service Supervisor (PSS)',
            'Senior Passenger Relations Officer (SPRO)',
            'Passenger Relations Officer (PRO)'
        ],
        'SINHUB': [
            'Manager Hub Control (MHC)',
            'SIN Hub Manager (SHM)'
        ],
        'TMM': [
            'Manager Operations Control (MOC)',
            'Flight Controller (FC)',
            'Flight Dispatch (DISP)',
            'Flight Follower (FF)',
            'Flight Support (FS)',
            'Crew Scheduling (CS)'
        ],
        'ENG': [
            'Line Maintenance (LM)'
        ],
        'CCS': [
            'Customer Contact Services (CC)'
        ],
        'CCC': [
            'Cabin Crew Control Centre'
        ]
    };

    const currentSectionOptions = department ? (sectionOptionsMap[department] || []).map(item => ({ label: item, value: item })) : [];

    // Register submission
    const onFinish = async (values) => {
        console.log('Register values:', values);
        setLoading(true); // Start loading
        try {
            const res = await registerApi({
                email: values.email,
                // code: values.captcha,
                mask_id: values.mask_id,
                gender: values.gender,
                department: values.department,
                section: values.section,
                age: values.age,
                password: values.password
            });

            // Check if response is HTML (indicating a redirect happened, likely due to error)
            if (typeof res === 'string' && (res.includes('<!DOCTYPE html>') || res.includes('<html'))) {
                const error = new Error('Network Error');
                error.code = 'ERR_NETWORK';
                throw error;
            }

            if (res) {
                // message.success('Registration successful! Please verify your email.');
                setRegisteredEmail(values.email);
                
                // Call Login API to get token
                try {
                    const loginRes = await loginApi({
                        username: values.email,
                        password: values.password
                    });
                    
                    if (loginRes && loginRes.user_token) {
                        sessionStorage.setItem('token', loginRes.user_token);
                        setUserRole(loginRes.model); // Store role for later check
                        setIsModalOpen(true);
                        message.success('Registration successful! Please verify your email.');
                    } else {
                        message.error('Registration successful but auto-login failed. Please try logging in manually.');
                        navigate('/login');
                    }
                } catch (loginError) {
                    console.error('Auto-login failed:', loginError);
                    message.error('Registration successful but auto-login failed. Please try logging in manually.');
                    navigate('/login');
                }
            }
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                message.error('Please enter a valid Mask ID assigned to you (sent to your personal registered email for this study).');
            } else {
                message.error(
                  'Registration failed. Please enter a valid Mask ID assigned to you (sent to your personal registered email for this study).'
                )
            }
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleVerifyEmail = async () => {
        setLoading(true); // Start loading for verification
        try {
            // Confirm Email API - token is attached automatically by request interceptor
            const res = await confirmEmailApi({ email: registeredEmail });
            if (res) {
                 message.success('Email verified successfully!');
                 setIsModalOpen(false);
                 
                 // Check Role and Navigate
                 // Assuming RoleEnum.user is the string 'RoleEnum.user' or similar based on backend response
                 // If the response is just 'user' or 'RoleEnum.user', we check string inclusion or equality
                 if (userRole && (userRole.includes('user') || userRole === 'RoleEnum.user')) {
                     navigate('/onboarding'); // Navigate to onboarding for participants
                 } else {
                     navigate('/layout/dashboard'); // Fallback or other roles
                 }
            }
        } catch (error) {
            console.error('Email verification failed:', error);
            // Optional: Show error message if verification isn't complete yet
            message.warning('Email not verified yet. Please check your inbox and click the link.');
        } finally {
            setLoading(false); // End loading
        }
    };

    const BackToLoginIn = () => {
        navigate('/login')
    }

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div className="register-page-bg-image">
            <div className="register-full-page">
                <Row justify={'center'}>
                    <Col xs={20} sm={20} md={20} lg={20} xl={8} >
                        <div className="register-page-content">
                            <Spin indicator={antIcon} spinning={loading}>
                                <div>
                                    <img className="register-img-fluid" src={ForgetIcon} alt='icon' />
                                    <div className="register-page-content-h2">Create Account</div>
                                    <div className="register-page-content-h5">
                                        <div> Please Create Your Wellnessbuddy Acccount</div>
                                    </div>
                                </div>
                                <div className="register-page-content-form">
                                    <Form
                                        form={form}
                                        name="register"
                                        wrapperCol={{ span: 24 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        autoComplete="off"
                                    >
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                { required: true, message: 'Please input your email!' },
                                                { type: 'email', message: 'The input is not valid E-mail!' }
                                            ]}
                                        >
                                            <Input placeholder='Email Address' disabled={loading} />
                                        </Form.Item>

                                        <Form.Item
                                            name="mask_id"
                                            rules={[{ required: true, message: 'Please input your Mask ID!' }]}
                                        >
                                            <Input placeholder='Mask ID' disabled={loading} />
                                        </Form.Item>

                                        <Form.Item
                                            name="gender"
                                            rules={[{ required: true, message: 'Please select your Gender!' }]}
                                        >
                                            <Select placeholder="Gender" options={genderOptions} style={{ textAlign: 'left' }} disabled={loading} />
                                        </Form.Item>

                                        <Form.Item
                                            name="department"
                                            rules={[{ required: true, message: 'Please select your Department!' }]}
                                        >
                                            <Select 
                                                placeholder="Select Department" 
                                                options={departmentOptions} 
                                                style={{ textAlign: 'left' }} 
                                                onChange={(value) => {
                                                    setDepartment(value);
                                                    form.setFieldsValue({ section: undefined });
                                                }}
                                                disabled={loading}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="section"
                                            rules={[{ required: true, message: 'Please select your Section!' }]}
                                        >
                                            <Select 
                                                placeholder="Select Section" 
                                                options={currentSectionOptions} 
                                                style={{ textAlign: 'left' }} 
                                                disabled={!department || loading}
                                            />
                                        </Form.Item>
                                            
                                        <Form.Item
                                            name="age"
                                            rules={[{ required: true, message: 'Please select your Age!' }]}
                                        >
                                            <Select placeholder="Select Age Group" options={ageOptions} style={{ textAlign: 'left' }} disabled={loading} />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password placeholder='Password' disabled={loading} />
                                        </Form.Item>

                                        <Form.Item
                                            name="passwordTwo"
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password placeholder='Confirrm Password' disabled={loading} />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button className='register-button' block type="primary" htmlType="submit" loading={loading}>
                                                Create Account
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className='register-page-content-foot'>
                                    <div className="text-muted">
                                        <div className="text-muted-text" onClick={!loading ? BackToLoginIn : undefined} style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>Already have an account? Log In</div>
                                    </div>
                                </div>
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </div>

            <Modal
                title="Email Verification"
                open={isModalOpen}
                footer={[
                    <Button key="verify" type="primary" onClick={handleVerifyEmail} loading={loading}>
                        I have verified my email
                    </Button>,
                ]}
                closable={false}
                maskClosable={false}
            >
                <p>A verification email has been sent to <strong>{registeredEmail}</strong>.</p>
                <p>Please check your inbox and click the verification link. After verifying, click the button below to continue.</p>
            </Modal>
        </div>
    )
}
                     