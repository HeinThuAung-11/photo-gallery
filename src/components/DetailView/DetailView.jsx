import React from 'react'

const DetailView = ({ photoDetailInfo, photoLoading }) => {
  return (
    <div>
      <hr />
      <div className='columns-1 lg:columns-2'>
        <div className='w-full'>
          {photoLoading ?
            <>Loading...</>
            :
            <img src={photoDetailInfo?.src?.large} alt="photo_detail" />
          }
        </div>
        <div className='w-full'>Hello <hr /> </div>
      </div>
    </div>
  )
}

export default DetailView