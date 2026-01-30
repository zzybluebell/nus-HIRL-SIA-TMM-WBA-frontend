import '../index.scss'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'antd'
import { Document, Page, pdfjs } from 'react-pdf' // ref: https://www.npmjs.com/package/react-pdf
import { BigPlayButton, Player } from 'video-react' // ref: https://video-react.js.org/
import { DownloadOutlined } from '@ant-design/icons'
import { downloadFile } from '../../../utils/download'

/**
 * Setup pdfjs worker
 */
pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'
// ref: https://github.com/wojtekmaj/react-pdf/issues/782#issuecomment-1407556622

/**
 * Video Modal
 */
const VideoModal = ({ width = 375 - 32, title, videoSrc, open, ...rest }) => {
  const _width = window.screen.width - 32 <= width ? window.screen.width - 48 - 32 : width - 48

  let playerRef = useRef(null)

  useEffect(() => {
    if (playerRef.current) {
      if (!open) {
        playerRef.current.pause() // pause video when modal closed
      } else {
        // playerRef.current.play() // resume video when reopen modal
      }
    }
  }, [open])

  return (
    <Modal {...rest} open={open} title={title ? title : 'Video'} footer={null} centered width={`${width}px`}>
      <div style={{ width: `${_width}px`, backgroundColor: '#fff' }}>
        <Player ref={(player) => (playerRef.current = player)} width={_width}>
          <source src={videoSrc} type='video/mp4' />
          <BigPlayButton position='center' />
        </Player>
      </div>
    </Modal>
  )
}

/**
 * PDF Modal
 */
const PDFModal = ({ width = 768 - 32, title, pdfSrc, pdfNameStr, ...rest }) => {
  const [numPages, setNumPages] = useState(null)
  const _width = window.screen.width <= 768 ? window.screen.width - 48 - 32 : width - 48 - 16

  return (
    <Modal
      {...rest}
      title={title ? title : 'PDF'}
      footer={
        <div className='flex_reverse'>
          <div className='mobile_btn_full'>
            <Button
              block
              type='primary'
              ghost
              icon={<DownloadOutlined />}
              onClick={() => {
                downloadFile(pdfSrc, pdfNameStr)
              }}>
              Download
            </Button>
          </div>
        </div>
      }
      centered
      width={`${width}px`}>
      <div className='pdf_modal_container'>
        <div style={{ height: 424, overflow: 'auto' }}>
          <Document
            file={pdfSrc}
            loading={''}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages)
            }}>
            {/* Show all pages at once, scroll to view */}
            {numPages &&
              Array.from(new Array(numPages), (item, index) => (
                <Page
                  key={`page_${index}`}
                  pageNumber={index + 1}
                  width={_width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  loading={''}
                />
              ))}
          </Document>
        </div>
      </div>
    </Modal>
  )
}

export { PDFModal, VideoModal }
