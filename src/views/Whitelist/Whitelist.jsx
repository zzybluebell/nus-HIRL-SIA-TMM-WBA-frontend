import React, { useEffect, useState } from 'react'
import './Whitelist.scss'
import { Link } from 'react-router-dom'
import { whitelistApi, postWhitelistApi, phase2WhitelistApi , phase2WhitelistApiInvited, phase2WhitelistCancel } from 'src/api/index'
import Footer from 'src/views/Layout/Footer/Footer'
import { Input, Button, Tag, Upload, message, Space } from 'antd'
import { UploadOutlined, FileTextOutlined, CloseOutlined } from '@ant-design/icons'
import { baseURL } from '../../config'

export default function Whitelist() {
  const [whitelists, setWhitelists] = useState([])
  const [adminList, setAdminList] = useState('')
  const [userList, setUserList] = useState('') // This will now store existing users for internal logic
  const [userAddInput, setUserAddInput] = useState('') // New state for the input box
  const [readOnlyPhase2List, setReadOnlyPhase2List] = useState([])
  const [readOnlyPhase2Invited, setReadOnlyInvitedPhase2] = useState([])
  const [phase2UserList, setPhase2UserList] = useState('')
  const [isRosterUploading, setIsRosterUploading] = useState(false)

  useEffect(() => {
    getWhitelistData()
  }, [])

  const getWhitelistData = async () => {
    const res = await whitelistApi()
    setWhitelists(res)

    const resPhase2 = await phase2WhitelistApi()
    setPhase2UserList(resPhase2.join(','))
    setReadOnlyPhase2List(resPhase2)

    const resPhase2Invited = await phase2WhitelistApiInvited()
    setReadOnlyInvitedPhase2(resPhase2Invited)

    const adminEntry = res.find((entry) => entry.type === 'admin')
    const userEntry = res.find((entry) => entry.type === 'user')

    if (adminEntry) setAdminList(adminEntry.ids.join(','))
    if (userEntry) setUserList(userEntry.ids.join(','))
  }

  // Handle removing a user ID from the whitelist
  const handleRemoveUser = async (idToRemove) => {
    // Get current list directly from whitelists state to ensure accuracy
    const userEntry = whitelists.find((entry) => entry.type === 'user')
    const currentList = userEntry ? userEntry.ids : []
    
    const newList = currentList.filter(id => id !== idToRemove)
    
    // Call API with the new list (override)
    await postWhitelistApi({ type: 'user', ids: newList })
    message.success(`User ${idToRemove} removed successfully`)
    getWhitelistData()
  }

  const handleUpdate = async (type) => {
    let formattedList = []
    
    if (type === 'admin') {
      const updatedList = adminList.split(',')
      formattedList = updatedList.map((id) => id.trim()).filter((id) => id !== '')
    } else {
      // Logic for user update: Append new input to existing list from whitelists state
      const userEntry = whitelists.find((entry) => entry.type === 'user')
      const currentList = userEntry ? userEntry.ids : []
      
      const newIds = userAddInput.split(',')
      
      // Merge and remove duplicates/empty
      const combinedList = [...currentList, ...newIds]
      formattedList = combinedList.map((id) => id.trim()).filter((id) => id !== '')
      
      // Optional: unique filter
      formattedList = [...new Set(formattedList)]
    }

    await postWhitelistApi({ type, ids: formattedList })
    
    if (type === 'user') {
        message.success('User whitelist updated successfully')
        setUserAddInput('') // Clear input after success
    } else {
        message.success('Admin whitelist updated successfully')
    }
    
    getWhitelistData()
  }

  const handlePhase2Cancel = async (staffId) => {
    try {
      const response = await phase2WhitelistCancel({ staff_id: staffId })
      message.success('User removed from invitation list successfully')
      getWhitelistData() // Refresh the data
    } catch (error) {
      message.error('Failed to remove user from invitation list')
      console.error('Error canceling phase2 invitation:', error)
    }
  }

  const handlePhase2Update = async () => {
    
    // prepare csv
    const phase2List = phase2UserList.split(',');

    // prepare upload request
    const csvContent = ['staff_id', ...phase2List].map(id => `"${id}"`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;'});
    const formData = new FormData();
    formData.append('file', blob, 'file.csv');

    // upload and handle response
    const response = await fetch(`${baseURL}auth/web/upload_whitelist_phase_two`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token
      }
    });

    if (!response.ok) {
      message.error(`${response.message}`);
    } else {
      message.success('Staff ids updated successfully');
      // clear textfield
      getWhitelistData()
    }
  }

  const downloadUserCSV = () => {
    // create and download csv file from userList staff ids
    const link = document.createElement('a')
    let rows = []
    
    // insert fix header
    rows.push('staff_id')

    // insert each staff id from state (Use whitelists state for accuracy)
    const userEntry = whitelists.find((entry) => entry.type === 'user')
    const currentList = userEntry ? userEntry.ids : []
    
    rows.push(...currentList)

    const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    // create and click dynamic link to trigger download
    link.href = url
    link.download = 'sample_users.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const token = sessionStorage?.getItem('token') || ''

  const props = {
    accept: '.csv',
    name: 'file',
    action: baseURL + 'auth/web/upload_whitelist',
    headers: {
      authorization: token,
    },
    itemRender: (originNode, file, fileList) => {
      return null
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        getWhitelistData()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const interventionProps = {
    accept: '.csv',
    name: 'file',
    action: baseURL + 'auth/web/upload_whitelist_phase_two',
    headers: {
      authorization: token,
    },
    itemRender: (originNode, file, fileList) => {
      return null
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        getWhitelistData()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const rosterProps = {
    accept: '.csv',
    name: 'file',
    action: baseURL + 'auth/web/upload_roster_data',
    headers: {
      authorization: token,
    },
    itemRender: (originNode, file, fileList) => {
      return null
    },
    beforeUpload: (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          const rows = content.split(/\r\n|\n/).filter(row => row.trim() !== '')
          
          if (rows.length === 0) {
            message.error('File is empty')
            return reject('File is empty')
          }

          // Check first row column count
          // In this specific case, if the file is a roster file, the first row (header) might have a different column count structure (e.g. empty first cell)
          // But based on user input "col nums 是这样的", it seems like the header row (dates) might be shifted or aligned differently.
          // However, standard CSV parsers align by delimiter. 
          // If the first row is: "mask_id, 1-Jan, 2-Jan..." then it has N columns.
          // If the user means that visually the first cell is empty in Excel but in CSV it's ",1-Jan,..." then the first column is empty string.
          
          // NEW LOGIC: Support 2-row header (Row 0: DN/Group, Row 1: Dates)
          if (rows.length < 2) {
             message.error('File format error: Need at least 2 header rows (DN/Group and Dates)')
             return reject('File format error')
          }

          const rawSuperHeader = rows[0].split(',')
          const rawDateHeader = rows[1].split(',')
          const headerCount = rawDateHeader.length
          
          // Fill super header merged cells logic
          const filledSuperHeader = []
          let lastVal = ''
          for (let val of rawSuperHeader) {
              if (val && val.trim() !== '') {
                  lastVal = val.trim()
              }
              filledSuperHeader.push(lastVal)
          }

          // 1. Restriction: Check consistency of column counts
          // "不可以 在roster 中当第一行是30个cols , 但其他行数是29 cols"
          for (let i = 2; i < rows.length; i++) {
            const currentColumns = rows[i].split(',')
            
            // Allow a small tolerance for trailing empty columns which some CSV editors add, 
            // OR strictly enforce equality. Based on "不可以...30...29", strict is better.
            if (currentColumns.length !== headerCount) {
              message.error(`Row ${i + 1} has ${currentColumns.length} columns, but header has ${headerCount} columns. All rows must have the same number of columns.`)
              return reject('Column count mismatch')
            }
          }

          // 2. Restriction: Check for empty cells
          // "不可以有空的cells"
          // User said: "row 0 (maskid) 比如cols [0]" - implies header might have empty first cell if it's just dates?
          // BUT generally "mask_id" should be the header for the first col.
          // If the user's screenshot shows the first cell of the header row is empty or "mask_id", we should handle it.
          // Let's relax the check for the VERY FIRST cell (0,0) just in case it's empty in their template, 
          // BUT strict for everything else as requested "不可以有空的cells".
          
          for (let i = 2; i < rows.length; i++) {
            const currentColumns = rows[i].split(',')
            for (let j = 0; j < currentColumns.length; j++) {
               // Special handling if the very first cell (0,0) is allowed to be empty (common in some matrix formats), 
               // but user said "cols [0]" is maskid. So (0,0) should likely be "mask_id" or similar.
               // We will stick to strict "No empty cells" unless (0,0) is specifically discussed.
               // If the user's header row 0 cols 0 is "mask_id", it is not empty.
               
              if (!currentColumns[j] || currentColumns[j].trim() === '') {
                 // Enhanced error message for empty cells
                 const maskId = currentColumns[0] || 'Unknown MaskID'
                 const dateHeader = rawDateHeader[j] || `Col ${j + 1}`
                 const dnHeader = filledSuperHeader[j] || ''
                 
                 const displayHeader = dnHeader ? `${dateHeader} (${dnHeader})` : dateHeader

                 message.error(`Row ${i + 1}, Column ${j + 1} Error at [${maskId}, ${displayHeader}]: Empty cell found. Empty cells are not allowed.`)
                 return reject('Empty cell found')
              }
            }
          }

          // 3. Restriction: Data validation
          // "除了第一row : 日期，第一cols maskid, 其他的所有数据都只能是 ‘0000-2359’ 数据之间，和RD AL OFF 四种不同的data fillin"
          // Skip header (i=0) and check from i=1
          for (let i = 2; i < rows.length; i++) {
            const currentColumns = rows[i].split(',')
            // Skip first column (Mask ID) (j=0) and check from j=1
            for (let j = 1; j < currentColumns.length; j++) {
              const cellData = currentColumns[j].trim()
              
              // Allowed fixed values
              const allowedValues = ['RD', 'AL', 'OFF']
              
              // Regex for time range format 0000-2359
              const timeRangeRegex = /^([01][0-9]|2[0-3])[0-5][0-9]-([01][0-9]|2[0-3])[0-5][0-9]$/
              
              if (!allowedValues.includes(cellData) && !timeRangeRegex.test(cellData)) {
                 // Enhanced error message for better debugging
                 // Get Mask ID from column 0 (assuming it exists based on previous checks)
                 const maskId = currentColumns[0] || 'Unknown MaskID'
                 // Get Date from header row (assuming header exists)
                 const dateHeader = rawDateHeader[j] || `Col ${j + 1}`
                 const dnHeader = filledSuperHeader[j] || ''
                 
                 const displayHeader = dnHeader ? `${dateHeader} (${dnHeader})` : dateHeader

                 message.error(`Row ${i + 1}, Column ${j + 1} Error at [${maskId}, ${displayHeader}]: Invalid data "${cellData}". Allowed: '0000-2359', 'RD', 'AL', 'OFF'.`)
                 return reject('Invalid data format')
              }
            }
          }

          resolve(file)
        }
        reader.readAsText(file)
      })
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        if (!isRosterUploading) {
            setIsRosterUploading(true)
        }
      }
      if (info.file.status === 'done') {
        setIsRosterUploading(false)
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        setIsRosterUploading(false)
        message.error(`${info.file.name} file upload failed. Please check the file format & structure.`)
      }
    },
  }

  return (
    <div className='whitelist-page overflow-y-scroll'>
      <div className='whitelist-page-heard'>
        <Link className='dashboard-page-heard-title' to='/layout/dashboard'>
          Dashboard
        </Link>
        <div className='dashboard-page-heard-title-active'> / </div>
        <div className='dashboard-page-heard-title-active'>Whitelist Data</div>
      </div>
      <div className='whitelist-page-conetn'>
        
        {/* Section 1: Current Whitelists */}
        <div className='whitelist-card'>
          <div className='whitelist-page-conetn-title'>Current Whitelists</div>
          <div className='whitelist-display'>
            {whitelists.map((entry) => (
              <div key={entry.type}>
                <h3>{entry.type}:</h3>
                {entry.type === 'user' ? (
                  // Render User Tags with close icon
                  entry.ids.map((id) => (
                    <Tag 
                        color='blue' 
                        key={id}
                        closable
                        closeIcon={<CloseOutlined />}
                        onClose={(e) => {
                            e.preventDefault()
                            handleRemoveUser(id)
                        }}
                    >
                        {id}
                    </Tag>
                  ))
                ) : (
                  // Render Admin Tags (Read-only as before)
                  entry.ids.map((id) => (
                    <Tag color='blue' key={id}>
                        {id}
                    </Tag>
                  ))
                )}
              </div>
            ))}
            <div>
              <h3>Confirmed Users in Intervention Phase:</h3>
              {
                readOnlyPhase2List.map(id => (
                  <Tag color='blue' key={id}>
                    {id}
                  </Tag>
                ))
              }
            </div>
            <div>
              <h3>Invited Users in Intervention Phase:</h3>
              {
                readOnlyPhase2Invited.map(id => (
                  <Tag 
                    key={id} 
                    color='blue' 
                    closable
                    closeIcon={<CloseOutlined />}
                    onClose={(e) => {
                      e.preventDefault()
                      handlePhase2Cancel(id)
                    }}
                  >
                    {id}
                  </Tag>
                ))
              }
            </div>
          </div>
        </div>

        {/* Section 2: Update Admin Whitelist */}
        <div className='whitelist-card'>
          <div className='whitelist-page-conetn-title'>Update Admin Whitelist</div>
          <Input.TextArea value={adminList} onChange={(e) => setAdminList(e.target.value)} rows={2} />
          <Button
            type='primary'
            onClick={() => handleUpdate('admin')}
            style={{ marginTop: '10px' }}
            className='edit-button'>
            Update Admin Whitelist
          </Button>
        </div>

        {/* Section 3: Update User Whitelist */}
        <div className='whitelist-card'>
          <div className='whitelist-page-conetn-title'>Update User Whitelist</div>
          <div>
            <div className='whitelist-page-text'>Add new users via csv</div>
            <Space>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload csv file</Button>
              </Upload>
              <Button icon={<FileTextOutlined />} onClick={() => downloadUserCSV()}>
                Download csv file template
              </Button>
            </Space>
          </div>
          <div className='whitelist-page-text'>Update manually</div>
          <Input.TextArea 
            value={userAddInput} 
            onChange={(e) => setUserAddInput(e.target.value)} 
            rows={2} 
            placeholder="Enter new Mask IDs to add (comma separated, e.g. 003, 004)" 
          />
          <Button
            type='primary'
            onClick={() => handleUpdate('user')}
            style={{ marginTop: '10px' }}
            className='edit-button'>
            Add to User Whitelist
          </Button>
        </div>

        {/* Section 4: Update Intervention Phase User Whitelist */}
        <div className='whitelist-card'>
          <div className='whitelist-page-conetn-title'>Update Intervention Phase User Whitelist</div>
          <div>
            <div className='whitelist-page-text'>Add new users to intervention phase via csv</div>
            <Space>
              <Upload {...interventionProps}>
                <Button icon={<UploadOutlined />}>Upload csv file</Button>
              </Upload>
              <Button icon={<FileTextOutlined />} onClick={() => downloadUserCSV()}>
                Download csv file template
              </Button>
            </Space>
          </div>
          <div className='whitelist-page-text'>Update manually</div>
          <Input.TextArea value={phase2UserList} onChange={(e) => setPhase2UserList(e.target.value)} rows={2} />
          <Button
            type='primary'
            onClick={() => handlePhase2Update('user')}
            style={{ marginTop: '10px' }}
            className='edit-button'>
            Add Users to Intervention Phase Whitelist
          </Button>
        </div>

        {/* Section 5: Update Roster Data */}
        <div className='whitelist-card'>
          <div className='whitelist-page-conetn-title'>Update Roster Data</div>
          <div>
            <div className='whitelist-page-text'>Upload roster data via csv</div>
            <Space>
              <Upload {...rosterProps}>
                <Button icon={<UploadOutlined />} loading={isRosterUploading}>Upload csv file</Button>
              </Upload>
            </Space>
          </div>
        </div>

      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
