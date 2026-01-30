import * as React from 'react'
import { ConfigProvider } from 'antd'

// Config antd theme for onboarding pages
const ConfigWrapper = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: '#ffffff',
          colorBgContainer: '#ffffff',
          colorBgContainerDisabled: '#2222220a',
          colorBgElevated: '#ffffff',
          colorBgLayout: '#FAFAFA',
          colorBorder: '#22222226',
          colorBorderSecondary: '#2222220f',
          colorError: '#ff4d4f',
          colorIcon: '#22222273',
          colorIconHover: '#222222e0',
          colorInfo: '#002569',
          colorInfoActive: '#002569',
          colorInfoBase: '#002569',
          colorInfoBg: '#E5E9F0',
          colorInfoBgHover: '#7789AD',
          colorInfoBorder: '#002569',
          colorInfoBorderHover: '#003494',
          colorInfoHover: '#003494',
          colorInfoText: '#002569',
          colorInfoTextActive: '#002569',
          colorInfoTextHover: '#003494',
          colorPrimary: '#002569',
          colorPrimaryActive: '#002569',
          colorPrimaryBase: '#002569',
          colorPrimaryBg: '#E5E9F0',
          colorPrimaryBgHover: '#7789AD',
          colorPrimaryBorder: '#002569',
          colorPrimaryBorderHover: '#003494',
          colorPrimaryHover: '#003494',
          colorPrimaryText: '#002569',
          colorPrimaryTextActive: '#002569',
          colorPrimaryTextHover: '#003494',
          colorSplit: '#2222220f',
          colorSuccess: '#52c41a',
          colorText: '#222222e0',
          colorTextBase: '#222222',
          colorTextDescription: '#22222273',
          colorTextDisabled: '#22222240',
          colorTextHeading: '#222222e0',
          colorTextLightSolid: '#ffffff',
          colorTextPlaceholder: '#22222240',
          colorTextTertiary: '#22222273',
          colorWarning: '#FF9F00',
          controlItemBgActive: '#E5E9F0',
          controlItemBgActiveHover: '#7789AD',
          controlItemBgHover: '#2222220a',
          fontFamily:
            '"Proxima Nova",-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"', //
          fontSize: 14,
        },
      }}>
      {children}
    </ConfigProvider>
  )
}

export default ConfigWrapper
