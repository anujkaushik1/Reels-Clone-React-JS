import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';

function UploadFile() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div>

      {
        error !== '' ? <Alert severity="error">This is the biggest error</Alert> :
          <>
            <input type="file" accept='video/*' id='upload-input' style={{ display: 'none' }} />
            <label htmlFor="upload-input">

              <Button variant='outlined' color='secondary' component='span' disabled = {loading}>  {/* yeh button span ki prperties le ayya */}
                Upload Video
              </Button>
            </label>

            {
              loading && <LinearProgress color="secondary" style={{marginTop: '3%'}}/>
            }
          </>


      }
    </div>
  )
}

export default UploadFile