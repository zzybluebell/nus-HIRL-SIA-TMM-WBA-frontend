import React from 'react'
import './Unauthorized.scss'
import LogoLinear from "src/assets/images/logo-linear.svg";
import { Col, Row } from 'antd';

export default function Unauthorized() {
    return (
        <div className="login-page-bg-image">
            <div className="login-full-page">
                <div >
                    <img className="login-img-fluid" src={LogoLinear} alt='icon' />
                </div>
                <Row justify={'center'}>
                    <Col xs={20} sm={20} md={20} lg={20} xl={8} >
                        <div className="login-page-content">
                            <div>
                                <div className="login-page-content-h2">Unauthorized</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
