import React from 'react'
import './ChangePassword.scss'
import { Link } from "react-router-dom";
import { changePasswordApi } from "../../api/index"
import { Button, Input, Form } from 'antd';
import Footer from "src/views/Layout/Footer/Footer";


export default function ChangePassword() {
    // let navigate = useNavigate()

    const onFinish = async (values) => {
        var oldpwd = values.oldpassword.trim()
        var newpwd = values.password.trim()
        var reppwd = values.confirm_password.trim()
        const newData = {
            new_password: newpwd,
            old_password: oldpwd
        }
        if (oldpwd !== "" && newpwd !== "" && reppwd !== "" && newpwd === reppwd) {
            const res = await changePasswordApi(newData)
            console.log(res);
        }

    }

    return (
        <div className='change-password-page overflow-scroll'>
            <div className='change-password-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Change Password</div>

            </div>
            <div className='change-password-page-conetn'>
                <div className='conten-body'>
                    <div className='change-password-page-conetn-herad'>
                        <div className='change-password-page-conetn-title'>Change Password</div>
                    </div>
                    <div className='change-password-page-table-conten'>
                        <div className='change-password-page-table-item'>
                            <Form
                                name="basic"
                                wrapperCol={{ span: 24 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    // label="Email"
                                    name="oldpassword"
                                    rules={[{ required: true, message: 'Enter Current Password' }]}
                                >
                                    <Input placeholder='oldpassword' />
                                </Form.Item>

                                <Form.Item
                                    // label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Enter New Password' }]}
                                >
                                    <Input.Password placeholder='Password' />
                                </Form.Item>
                                <Form.Item
                                    // label="Password"
                                    name="confirm_password"
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
                                    <Input.Password placeholder='Enter New Password Again' />
                                </Form.Item>

                                <div>
                                    <Button className='Submit-button' type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
