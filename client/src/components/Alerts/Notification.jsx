import { Alert } from '@mui/material';
import { useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';

function AlertNotification() {
  const { alerts } = useContext(AlertContext);

  return (
    <div id="alert-message" className='fixed inline-flex flex-col z-[1205] bottom-2 right-2 gap-2'>
      {alerts.map((alert, i) => {
        return <Alert
          className="z-[1205] max-w-[300px]"
          variant="filled"
          severity={alert.type} key={i} >
          {alert.message}
        </Alert>
      })}
    </div>
  )
}

export default AlertNotification
