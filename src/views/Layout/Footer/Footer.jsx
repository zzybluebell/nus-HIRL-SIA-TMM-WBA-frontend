import './Footer.scss'
import React from 'react'
import { Typography } from 'antd'
// import packageInfo from '../../../../package.json'

const { Text } = Typography
// const { version } = packageInfo

export default function Footer() {
  return (
    <div className='card_footer'>
      <Text className='card_footer_text' type='secondary' >© SIA-NUS Digital Aviation Corporate Laboratory.</Text>
      <br />
      <Text className='card_footer_text' type='secondary'>All Rights Reserved.</Text>
    </div>
  )
}
