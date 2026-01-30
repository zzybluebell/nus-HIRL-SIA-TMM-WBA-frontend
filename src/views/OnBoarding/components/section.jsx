import '../index.scss'
import * as React from 'react'
import { useContext } from 'react'
import { Button, Divider, Typography } from 'antd'
import { OnBoardCtx } from '../index'

const { Title, Text } = Typography

// Define section top, section title
//
const SectionTop = ({ title, description }) => {
  return (
    <div className='section_top_container'>
      <div style={{ width: '100%' }}>
        <Title level={3} style={{ color: '#002569', margin: 0 }}>
          {title ? title : 'Title'}
        </Title>
      </div>
      <div>
        <Text>{description ? description : 'Description'}</Text>
      </div>
    </div>
  )
}

// Define section item,
//
const SectionItem = ({ children }) => {
  return <div className='card_page_section_container'>{children}</div>
}

// Define section bottom, actions
//
const SectionBottom = ({ nextTitle, nextAction, extra, disabled = false }) => {
  const { goNextPage } = useContext(OnBoardCtx)

  return (
    <div className='section_bottom_container'>
      <div className='mobile_btn_full'>
        <Button
          block
          type='primary'
          onClick={nextAction ? nextAction : goNextPage}
          disabled={disabled}
          style={{ flexShrink: 1 }}>
          {nextTitle ? nextTitle : 'Next'}
        </Button>
      </div>
      {extra ? <div className='mobile_btn_full'>{extra}</div> : null}
    </div>
  )
}

// Define section divider
//
const SectionDivider = () => {
  return <Divider style={{ margin: 0 }} />
}

export { SectionBottom, SectionDivider, SectionItem, SectionTop }
