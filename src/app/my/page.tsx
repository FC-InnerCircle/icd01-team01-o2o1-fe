import React from 'react'
import UserInfo from './_components/UserInfo'
import MyPageMenu from './_components/MyPageMenu'

const MyPage = () => {
  return (
    <div className="px-6 py-12">
      <UserInfo />
      <br />
      <MyPageMenu />
    </div>
  )
}

export default MyPage
