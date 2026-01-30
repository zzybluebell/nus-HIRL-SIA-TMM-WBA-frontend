/*
 * 使用此组件必传属性
 * list: 要过虑的数据  type:arr[]
 * getNewList: 返回过滤后的数据方法
 */

import React from 'react'
import './Search.scss'
import { Input } from 'antd'

export default function Search(props) {
  const { list = [], getNewList } = props

  // 在list数据中筛选input框中的值
  const onChange = (e) => {
    let str = e.target.value.trim()
    const newList = []
    list.forEach((element) => {
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const ine = element[key] + ''
          if (!ine) continue

          if (ine?.indexOf(str?.toUpperCase()) > -1) {
            newList.push(element)
          }
          if (ine?.indexOf(str?.toLowerCase()) > -1) {
            newList.push(element)
          }
        }
      }
    })
    const ooo = [...new Set(newList)]
    getNewList(ooo)
  }

  return (
    <div className='search-page'>
      <div className='search-page-span'>Search :</div>
      <div>
        <Input allowClear onChange={onChange} />
      </div>
    </div>
  )
}
