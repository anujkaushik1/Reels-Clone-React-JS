import React from 'react'
import UploadFile from './UploadFile'

function Feed() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div className='comp' style={{ width: '50%' }}>
        <h1>Welcome to feed</h1>
      </div>
      <UploadFile />
    </div>

  )
}

export default Feed