import React, { useEffect, useState } from 'react'
import './NotifyUsers.scss'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Link } from "react-router-dom";
import { staffIdTableApi } from 'src/api/index'
import Footer from "src/views/Layout/Footer/Footer";
import { Button, Select, Col, Input, Row, message } from 'antd';
import { i18nChangeLanguage } from '@wangeditor/editor'

// 切换语言 - 'en' 或者 'zh-CN'
i18nChangeLanguage('en')


export default function NotifyUsers() {
    const [messageApi, contextHolder] = message.useMessage();
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [inputList, setInputList] = useState([]) // Participant ID选择框中的数据
    const [participantID, setParticipantID] = useState('') // Participant ID
    const [subject, setSubject] = useState('') // Subject
    const [html, setHtml] = useState('') // 编辑器内容

    useEffect(() => {
        getTableData()
    }, [])

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    //  获取Participant ID选择框中的数据
    const getTableData = async () => {
        const newArr = []
        const res = await staffIdTableApi(null)
        const ogdd = res?.result;
        (ogdd || [])?.map((item) => {
            const obj = {
                value: item,
                label: item
            }
            return newArr.push(obj)
        })
        setInputList(newArr)
    }

    const handleChange = (value) => {
        setParticipantID(value)
    };

    const onChangeInput = (e) => {
        setSubject(e.target.value)
    }

    // 工具栏配置
    // const toolbarConfig = { }      

    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        onCreated(editor) { setEditor(editor) } // 记录下 editor 实例，重要！
    }

    // 发送操作 请求
    const getSend = () => {
        if (!participantID.length && !subject) {
            messageApi.open({
                type: 'warning',
                content: '请填写完信息',
            });
        }
        console.log(participantID, subject, html);
    }

    return (
        <div className='notify-users-page overflow-scroll'>
            {contextHolder}
            <div className='notify-users-page-heard'>
                <Link className="dashboard-page-heard-title" to="/layout/dashboard" >Dashboard</Link>
                <div className='dashboard-page-heard-title-active'> / </div>
                <div className="dashboard-page-heard-title-active">Notify Users</div>
            </div>
            <div className='notify-users-page-conetn'>
                <div className='conten-body'>
                    <div className='notify-users-page-conetn-herad'>
                        <div className='notify-users-page-conetn-title'>Notify Users</div>
                    </div>
                    <div className='notify-users-page-from-conten'>
                        <div className='notify-users-page-from-item'>
                            <Row justify="space-between" align="middle">
                                <Col flex="none" xs={24} sm={24} md={4} lg={4} xl={4}>
                                    <div >Participant ID</div>
                                </Col>
                                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                    <div className='notify-users-page-from-item-lable' >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: "100%" }}
                                            onChange={handleChange}
                                            options={inputList}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='notify-users-page-from-item'>
                            <Row justify="space-between" align="middle">
                                <Col flex="none" xs={24} sm={24} md={4} lg={4} xl={4}>
                                    <div >Subject</div>
                                </Col>
                                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                    <div className='notify-users-page-from-item-lable' ><Input allowClear onChange={onChangeInput} /></div>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <div style={{ border: '1px solid #ccc', zIndex: 999 }}>
                                <Toolbar
                                    editor={editor}
                                    // defaultConfig={toolbarConfig}
                                    mode="default"
                                    style={{ borderBottom: '1px solid #ccc' }}
                                />
                                <Editor
                                    defaultConfig={editorConfig}
                                    value={html}
                                    onCreated={setEditor}
                                    onChange={editor => setHtml(editor.getHtml())}
                                    mode="default"
                                    style={{ height: '5rem' }}
                                />
                            </div>
                        </div>
                        <div>
                            <Button className='send-button' type="primary" onClick={() => getSend()}>Send</Button>
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
